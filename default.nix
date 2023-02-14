{ system ? builtins.currentSystem
, pkgs ? let
    lockfile = builtins.fromJSON (builtins.readFile ./flake.lock);
    nixpkgs = lockfile.nodes.nixpkgs.locked;
  in
  import
    (builtins.fetchTarball {
      url = "https://github.com/NixOS/nixpkgs/archive/${nixpkgs.rev}.tar.gz";
      sha256 = nixpkgs.narHash;
    })
    { }
}:
with pkgs;
with import (pkgs.path + "/nixos/lib/testing-python.nix") { inherit system; };
let
  packageJSON = builtins.fromJSON (builtins.readFile ./package.json);

  # Use this if you want to override config/default.yaml
  /*
    blockfrost-backend-test-config = pkgs.writeText "default.yaml" ''
      server:
        port: 3000
        debug: true
      dbSync:
        host: "cdbsync-testnet.mydomain.com"
        user: "cexplorer"
        database: "cdbsync"
        network: "mainnet"
        tokenRegistryUrl: "https://tokens.cardano.org"
    '';
  */

in
rec {

  blockfrost-backend-ryo =
    with pkgs.lib;
    let
      src = cleanSource ./.;
      project = pkgs.callPackage ./yarn-project.nix { nodejs = pkgs.nodejs-16_x; } { inherit src; };
    in
    project.overrideAttrs (oldAttrs: rec {
      name = "blockfrost-backend-ryo";
      version = packageJSON.version;

      buildInputs = [
        nodejs-16_x
        python3 # due to node-gyp
        (yarn.override { nodejs = nodejs-16_x; })
      ];

      buildPhase = ''
        yarn build

        mkdir -p $out/bin
        cat <<EOF > $out/bin/${name}
        #!${runtimeShell}
        echo "Starting ${name}...";
        ${nodePackages.pm2}/bin/pm2 delete all; \
           ${nodePackages.pm2}/bin/pm2 start \
           $out/libexec/source/dist/server.js \
           --interpreter=${pkgs.nodejs-16_x}/bin/node --node-args="\''${BLOCKFROST_NODE_ARGS:-"--max-http-header-size=32768"}" \
           --max-memory-restart \''${BLOCKFROST_MAX_MEMORY_RESTART:-"1500M"} \
           -i max --time --no-daemon
        EOF
        chmod +x $out/bin/${name}
      '';

      dontStrip = true;

    });

  # https://github.com/cardano-foundation/cardano-token-registry
  mainnet-token-registry = pkgs.fetchFromGitHub {
    owner = "cardano-foundation";
    repo = "cardano-token-registry";
    rev = "56c1270af943ae0d86ed09d9945e105bef1a2998";
    sha256 = "0fh1qlfb7z2fymwaamgpihilr47zch284hv7l6mqvizrkr8zf1dw";
  };

  # https://github.com/input-output-hk/metadata-registry-testnet
  testnet-token-registry = pkgs.fetchFromGitHub {
    owner = "input-output-hk";
    repo = "metadata-registry-testnet";
    rev = "f1844e2f4ce8cc54103ef75357e4a034c52be181";
    sha256 = "1sa64g9w2dcw890d51c5xdqnav29dh7fzzvyhhwwigq7j5vinx3r";
  };

  blockfrost-backend-ryo-test-mainnet = makeTest rec {

    name = "blockfrost-backend-ryo-test-mainnet";

    name = "blockfrost-backend-ryo-test-mainnet";

    nodes.machine = {
      # We have to increase memsize, otherwise we will get error:
      # "Kernel panic - not syncing: Out of memory: compulsory panic_on_oom"
      virtualisation.memorySize = 4096;
      # Backend service
      systemd.services.blockfrost-backend-ryo = {
        wantedBy = [ "multi-user.target" ];
        script = "${blockfrost-backend-ryo}/bin/blockfrost-backend-ryo";
        environment = {
          # Use config file from repository
          NODE_CONFIG_RUNTIME_JSON = "${blockfrost-backend-ryo}/libexec/source/config/mainnet.yaml";
          /*
            # Use this if you want to override config/default.yaml
            NODE_CONFIG_RUNTIME_JSON = "${blockfrost-backend-test-config}";
          */
        };
      };

    };

    testScript = ''
      start_all()
      machine.wait_for_unit("blockfrost-backend-ryo.service")
      machine.wait_for_open_port(3000)
      machine.succeed("cp -r ${blockfrost-backend-ryo}/libexec/source /tmp")
      machine.succeed(
          "cd /tmp/source && ${pkgs.yarn}/bin/yarn set version berry && ${pkgs.yarn}/bin/yarn test-integration:mainnet"
      )
    '';
  };

  blockfrost-backend-ryo-test-preview = makeTest rec {

    name = "blockfrost-backend-ryo-test-preview";

    nodes.machine = {
      # We have to increase memsize, otherwise we will get error:
      # "Kernel panic - not syncing: Out of memory: compulsory panic_on_oom"
      virtualisation.memorySize = 4096;
      # Backend service
      systemd.services.blockfrost-backend-ryo = {
        wantedBy = [ "multi-user.target" ];
        script = "${blockfrost-backend-ryo}/bin/blockfrost-backend-ryo";
        environment = {
          # Use config file from repository
          NODE_CONFIG_RUNTIME_JSON = "${blockfrost-backend-ryo}/libexec/source/config/preview.yaml";
          /*
            # Use this if you want to override config/default.yaml
            NODE_CONFIG_RUNTIME_JSON = "${blockfrost-backend-test-config}";
          */
        };
      };

    };

    testScript = ''
      start_all()
      machine.wait_for_unit("blockfrost-backend-ryo.service")
      machine.wait_for_open_port(3000)
      machine.succeed("cp -r ${blockfrost-backend-ryo}/libexec/source /tmp")
      machine.succeed(
          "cd /tmp/source && ${pkgs.yarn}/bin/yarn set version berry && ${pkgs.yarn}/bin/yarn test-integration:preview"
      )
    '';
  };

  blockfrost-backend-ryo-test-preprod = makeTest rec {

    name = "blockfrost-backend-ryo-test-preprod";

    nodes.machine = {
      # We have to increase memsize, otherwise we will get error:
      # "Kernel panic - not syncing: Out of memory: compulsory panic_on_oom"
      virtualisation.memorySize = 4096;
      # Backend service
      systemd.services.blockfrost-backend-ryo = {
        wantedBy = [ "multi-user.target" ];
        script = "${blockfrost-backend-ryo}/bin/blockfrost-backend-ryo";
        environment = {
          # Use config file from repository
          NODE_CONFIG_RUNTIME_JSON = "${blockfrost-backend-ryo}/libexec/source/config/preprod.yaml";
          /*
            # Use this if you want to override config/default.yaml
            NODE_CONFIG_RUNTIME_JSON = "${blockfrost-backend-test-config}";
          */
        };
      };

    };

    testScript = ''
      start_all()
      machine.wait_for_unit("blockfrost-backend-ryo.service")
      machine.wait_for_open_port(3000)
      machine.succeed("cp -r ${blockfrost-backend-ryo}/libexec/source /tmp")
      machine.succeed(
          "cd /tmp/source && ${pkgs.yarn}/bin/yarn set version berry && ${pkgs.yarn}/bin/yarn test-integration:preprod"
      )
    '';
  };

}
