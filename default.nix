{ nixpkgs ? let
    lockfile = builtins.fromJSON (builtins.readFile ./flake.lock);
    nixpkgs = lockfile.nodes.nixpkgs.locked;
  in
   (builtins.fetchTarball {
          url = "https://github.com/NixOS/nixpkgs/archive/${nixpkgs.rev}.tar.gz";
      sha256 = nixpkgs.narHash;
    }),
pkgs ? import nixpkgs {}
, blockfrost-tests ?
    (builtins.fetchGit {
      url = "ssh://git@github.com/blockfrost/blockfrost-tests.git";
      rev = "d3f2ab53e14798045424e13cce03e7dca6ab4217";
      allRefs = true;
    })
, system ? builtins.currentSystem
}:
let
  nodejs = pkgs.nodejs_18;
  nodePackages = nodejs.pkgs;
  testing = import (pkgs.path + "/nixos/lib/testing-python.nix") { inherit system; };
  packageJSON = builtins.fromJSON (builtins.readFile ./package.json);

  blockfrost-backend-ryo =
    let
      src = pkgs.lib.cleanSource ./.;
      project = pkgs.callPackage ./yarn-project.nix
        { inherit nodejs; }
        { inherit src; };
    in
    project.overrideAttrs (oldAttrs: rec {
      name = "blockfrost-backend-ryo";
      version = packageJSON.version;

      buildInputs = [
        nodejs
        pkgs.python3 # due to node-gyp
        (pkgs.yarn.override { inherit nodejs; })
      ];

      buildPhase = ''
        yarn build

        mkdir -p $out/bin
        cat <<EOF > $out/bin/${name}
        #!${pkgs.runtimeShell}
        echo "Starting ${name}...";
        ${nodePackages.pm2}/bin/pm2 delete all; \
           ${nodePackages.pm2}/bin/pm2 start \
           $out/libexec/source/dist/server.js \
           --interpreter=${pkgs.nodejs}/bin/node --node-args="\''${BLOCKFROST_NODE_ARGS:-"--max-http-header-size=32768"}" \
           --max-memory-restart \''${BLOCKFROST_MAX_MEMORY_RESTART:-"1500M"} \
           -i max --time --no-daemon
        EOF
        chmod +x $out/bin/${name}
      '';

      dontStrip = true;

    });

in
{
  inherit blockfrost-backend-ryo;
  blockfrost-backend-ryo-test-mainnet = testing.makeTest rec {

    name = "blockfrost-backend-ryo-test-mainnet";

    nodes.machine = {
      imports = [ ./nixos-module.nix ];
      # We have to increase memsize, otherwise we will get error:
      # "Kernel panic - not syncing: Out of memory: compulsory panic_on_oom"
      virtualisation.memorySize = 8192;

      services.blockfrost = {
        enable = true;
        package = blockfrost-backend-ryo;
        settings = {
          dbSync = {
            host = builtins.getEnv "DBSYNC_HOST_MAINNET";
            user = "csyncdb";
            database = "csyncdb";
          };
          tokenRegistryUrl = builtins.getEnv "TOKEN_REGISTRY_URL_MAINNET";
        };
      };
    };

    testScript = ''
      start_all()
      machine.wait_for_unit("blockfrost-backend-ryo.service")
      machine.wait_for_open_port(3000)
      machine.succeed("cp -r ${blockfrost-tests} /tmp/tests")
      machine.succeed(
          "cd /tmp/tests && NIX_PATH=nixpkgs=${nixpkgs} nix-shell --run 'SERVER_URL=http://localhost:3000/ SERVICE_NAME=ryo yarn test:mainnet --run' >&2"
      )
    '';
  };

  blockfrost-backend-ryo-test-preview = testing.makeTest rec {

    name = "blockfrost-backend-ryo-test-preview";

    nodes.machine = {
      imports = [ ./nixos-module.nix ];
      # We have to increase memsize, otherwise we will get error:
      # "Kernel panic - not syncing: Out of memory: compulsory panic_on_oom"
      virtualisation.memorySize = 8192;

      services.blockfrost = {
        enable = true;
        package = blockfrost-backend-ryo;
        settings = {
          dbSync = {
            host = builtins.getEnv "DBSYNC_HOST_PREVIEW";
            user = "csyncdb";
            database = "csyncdb";
          };
          network = "preview";
          tokenRegistryUrl = builtins.getEnv "TOKEN_REGISTRY_URL_TESTNETS";
        };
      };
    };

    testScript = ''
      start_all()
      machine.wait_for_unit("blockfrost-backend-ryo.service")
      machine.wait_for_open_port(3000)
      machine.succeed("cp -r ${blockfrost-tests} /tmp/tests")
      machine.succeed(
          "cd /tmp/tests && NIX_PATH=nixpkgs=${nixpkgs} nix-shell --run 'SERVER_URL=http://localhost:3000/ SERVICE_NAME=ryo yarn test:preview --run' >&2"
      )
    '';
  };

  blockfrost-backend-ryo-test-preprod = testing.makeTest rec {

    name = "blockfrost-backend-ryo-test-preprod";

    nodes.machine = {
      imports = [ ./nixos-module.nix ];
      # We have to increase memsize, otherwise we will get error:
      # "Kernel panic - not syncing: Out of memory: compulsory panic_on_oom"
      virtualisation.memorySize = 8192;

      services.blockfrost = {
        enable = true;
        package = blockfrost-backend-ryo;
        settings = {
          dbSync = {
            host = builtins.getEnv "DBSYNC_HOST_PREPROD";
            user = "csyncdb";
            database = "csyncdb";
          };
          network = "preprod";
          tokenRegistryUrl = builtins.getEnv "TOKEN_REGISTRY_URL_TESTNETS";
        };
      };
    };

    testScript = ''
      start_all()
      machine.wait_for_unit("blockfrost-backend-ryo.service")
      machine.wait_for_open_port(3000)
      machine.succeed("cp -r ${blockfrost-tests} /tmp/tests")
      machine.succeed(
          "cd /tmp/tests && NIX_PATH=nixpkgs=${nixpkgs} nix-shell --run 'SERVER_URL=http://localhost:3000/ SERVICE_NAME=ryo yarn test:preprod --run' >&2"
      )
    '';
  };

}
