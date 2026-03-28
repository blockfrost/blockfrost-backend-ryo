{
  nixpkgs ? let
    lockfile = builtins.fromJSON (builtins.readFile ./flake.lock);
    nixpkgs = lockfile.nodes.nixpkgs.locked;
  in (builtins.fetchTarball {
    url = "https://github.com/NixOS/nixpkgs/archive/${nixpkgs.rev}.tar.gz";
    sha256 = nixpkgs.narHash;
  }),
  pkgs ? import nixpkgs {},
  blockfrost-tests ? (builtins.fetchGit {
    url = "ssh://git@github.com/blockfrost/blockfrost-tests-internal.git";
    rev = "6e4b3a0440b068c9a711d4c398771a9185faed11";
    submodules = true;
    allRefs = true;
  }),
  system ? builtins.currentSystem,
}: let
  inherit (pkgs) lib;
  nodejs = pkgs.nodejs_24;
  nodePackages = nodejs.pkgs;
  testing = import (pkgs.path + "/nixos/lib/testing-python.nix") {inherit system;};
  packageJSON = builtins.fromJSON (builtins.readFile ./package.json);

  pm2-prom-module' = pkgs.fetchurl {
    url = "https://registry.npmjs.org/pm2-prom-module/-/pm2-prom-module-2.7.2.tgz";
    sha256 = "sha256-cFoYLuavuMoeZdMGWNHZggrUAHL6sUY6ANKblHrmSRE=";
  };

  pmx = pkgs.fetchurl {
    url = "https://registry.npmjs.org/pmx/-/pmx-0.5.0.tgz";
    sha256 = "sha256-nX/UCajkOsresfft+0pMda54cJnz54OsQ/q+6S7IbaA=";
  };

  pm2-deps = {
    "@opentelemetry/api"= { version = "1.7.0"; hash = "sha256-lZqeEPocOr0FlyV9Hf29YY/GiXT6PGhigZZiVkFI9j8="; tarName = "api"; };
    "@pm2/agent"        = { version = "2.0.4"; hash = "sha256-hgyUnG8zu4Yf/rU/AXJEO4f55qmB5s+3RbaBeikHnsI="; tarName = "agent"; };
    amp                 = { version = "0.3.1"; hash = "sha256-Rc1vsyFTj8yCDdvRqmPRJXytr2DVxeNCOSc+/sc+qoA="; };
    amp-message         = { version = "0.1.2"; hash = "sha256-hQIlUxEvta2Lxwwjx/c3RJyl+WIMUUJ631YPEWPO1l4="; };
    ansi-styles         = { version = "4.3.0"; hash = "sha256-LFOaRthatgMxg5l0NNLZpcos7vwStNuQIvVkeEzXmH8="; };
    async               = { version = "3.2.6"; hash = "sha256-a7Rc+6CM0u6jnrPObqqUETBw/hN+wL1KnxIr6aAlDm8="; };
    bintrees            = { version = "1.0.1"; hash = "sha256-2AbqS+fyyf3qrhLl2wHwP95BiCKoLhIt70DVsykztpY="; };
    chalk               = { version = "3.0.0"; hash = "sha256-HXXWjRKKVurr4la8y36qe9Lhumy+LIZp7dJjK16ocVs="; };
    cli-tableau         = { version = "2.0.1"; hash = "sha256-eM6GuVO4buQ+LwbTcrXGtLlJ6XI4pD8yLVBJR0q2zYc="; };
    commander           = { version = "2.15.1"; hash = "sha256-fdf5IQYmc11/MZXZAEcNaH4lXiFZRkFew7UY8T0qNFM="; };
    dayjs               = { version = "1.8.36"; hash = "sha256-3LnPubqlOkBwHLqCs9+oL5rlIw/PEZSUPakya87MtN4="; };
    debug               = { version = "4.4.3"; hash = "sha256-icGsnJRu6JBah1g3EUUo6X7q414DvjGQWEsiFq9D5Kc="; };
    escape-string-regexp= { version = "4.0.0"; hash = "sha256-S0ShTaaYejwFhcL/FrOABCVzL/NcrXEMZectf44zsRs="; };
    fclone              = { version = "1.0.11"; hash = "sha256-lmsI93H/SMBfyygJGxDeJLtxc21bJ/Mc+VkLfutikYc="; };
    has-flag            = { version = "4.0.0"; hash = "sha256-d6frFBHZJ7uKXKcGnb4WiIbWPIj0RvC4FQCizyPdtbE="; };
    json-stringify-safe = { version = "5.0.1"; hash = "sha256-t/u/ZcC/9tR/UWyYY4Ip3/DpgdDt//7Lz5cdf+Nhkoo="; };
    ms                  = { version = "2.1.3"; hash = "sha256-9mFuFeUw7VUvnaotPOcZY5R8a8fJjJtk/T5nP9AmIsY="; };
    pidusage            = { version = "4.0.1"; hash = "sha256-u2jNQ3FQov7XPyVL0QNVYzhqV7vg0f1dkXMeey5J4gg="; };
    pm2                 = { version = "5.4.2"; hash = "sha256-tGmAfEdVK7HVIeB6sE8dTyyaAJ04L3fmVN1luGuygBQ="; };
    pm2-axon            = { version = "4.0.1"; hash = "sha256-7vTPYtGXn/PlYXOlyYh7WkyCImio1I4zSqP2v78s/oU="; };
    pm2-axon-rpc        = { version = "0.7.1"; hash = "sha256-1LhIPIGpRnyRlX7UHr0xGOY73zay5SklCgbfHpiOVV0="; };
    pmx                 = { version = "0.5.0"; hash = "sha256-nX/UCajkOsresfft+0pMda54cJnz54OsQ/q+6S7IbaA="; };
    prom-client         = { version = "15.1.3"; hash = "sha256-xFxsoQsDPILfHZSRUgxs/rvTBHpLSu+xoe0LNDHCeLQ="; };
    safe-buffer         = { version = "5.2.1"; hash = "sha256-XRgYBFFsSmk6OEJyp70OQtF+DUswHM++QIZpzK/cs+g="; };
    semver              = { version = "7.6.2"; hash = "sha256-3vHmSQrAx4ELC4Ff5lQvMhPUTJWwaAWdysL4HiwiN6Q="; };
    supports-color      = { version = "8.1.1"; hash = "sha256-6mnZtYAeEJky+fErVJnAbeP96TYRmiHFlBsnWdQ2T7A="; };
    tdigest             = { version = "0.1.1"; hash = "sha256-LVfWh8Wid9PTuJJ/5OxjAixzCbeUMAlsceEHeXhimtA="; };
  };

  pm2-deps-tars = lib.mapAttrs (name: { version, hash ? lib.fakeHash, tarName ? name }: pkgs.fetchurl { url = "https://registry.npmjs.org/${name}/-/${tarName}-${version}.tgz"; sha256 = hash; }) pm2-deps;

  pm2-prom-module = pkgs.runCommand "pm2-prom-module-2.7.2.tar.gz" {} ''
    tar -xf ${pm2-prom-module'}
    mv package module
    mkdir module/node_modules
    ${lib.concatStringsSep "\n" (lib.mapAttrsToList (k: v: ''
      tar -xf ${v}
      mkdir -p $(dirname module/node_modules/${k})
      mv package module/node_modules/${k}
    '') pm2-deps-tars)}
    tar -czf $out module/
  '';

  excludeNixFiles = path: type: let
    baseName = baseNameOf (toString path);
  in
    !(lib.hasSuffix ".nix" baseName);

  blockfrost-backend-ryo = let
    src = lib.cleanSourceWith { filter = excludeNixFiles; src = (lib.cleanSource ./.); };
    project =
      pkgs.callPackage ./yarn-project.nix
      {inherit nodejs;}
      {inherit src;};
  in
    project.overrideAttrs (oldAttrs: rec {
      name = "blockfrost-backend-ryo";
      version = packageJSON.version;

      buildInputs = [
        nodejs
        pkgs.python3 # due to node-gyp
        (pkgs.yarn.override {inherit nodejs;})
      ];

      buildPhase = ''
        yarn build

        mkdir -p $out/bin
        cat <<EOF > $out/bin/${name}
        #!${pkgs.runtimeShell}
        export PATH=${nodePackages.pm2}/bin:${pkgs.nodejs}/bin:\$PATH

        echo "Starting ${name}...";
        pm2 delete all
        pm2 start $out/libexec/source/dist/server.js \
           --interpreter=${nodejs}/bin/node --node-args="\''${BLOCKFROST_NODE_ARGS:-"--max-http-header-size=32768"}" \
           --max-memory-restart \''${BLOCKFROST_MAX_MEMORY_RESTART:-"1500M"} \
           -i \''${BLOCKFROST_PM2_INSTANCE_COUNT:-"max"} --time --no-daemon
        EOF
        chmod +x $out/bin/${name}
      '';

      dontStrip = true;
    });

  blockfrost-backend-ryo-wrapper = pkgs.writeShellApplication {
    name = "blockfrost-backend-ryo";
    runtimeInputs = [ nodePackages.pm2 nodejs ];
    text = ''
      set -x
      echo "Starting blockfrost-backend-ryo...";
      pm2 delete all || true
      pm2 install ${pm2-prom-module}
      pm2 start ${blockfrost-backend-ryo}/libexec/source/dist/server.js \
         --interpreter=${nodejs}/bin/node --node-args="''${BLOCKFROST_NODE_ARGS:-"--max-http-header-size=32768"}" \
         --max-memory-restart "''${BLOCKFROST_MAX_MEMORY_RESTART:-"1500M"}" \
         -i "''${BLOCKFROST_PM2_INSTANCE_COUNT:-"max"}" --time --no-daemon
    '';
  };

  commonTestConfig = {
    # We have to increase memsize, otherwise we will get error:
    # "Kernel panic - not syncing: Out of memory: compulsory panic_on_oom"
    virtualisation.memorySize = 8192;
    virtualisation.diskSize = 2048;

    services.blockfrost = {
      enable = true;
      requires = [];
      package = blockfrost-backend-ryo;
      settings = {
        dbSync = {
          user = "csyncdb";
          database = "csyncdb";
        };
      };
    };
  };
  mkTestScript = network: projectId: ''
    start_all()
    machine.wait_for_unit("blockfrost-backend-ryo.service")
    machine.wait_for_open_port(3000)
    machine.succeed("cp -r ${blockfrost-tests} /tmp/tests")
    machine.succeed(
        "cd /tmp/tests && nix --extra-experimental-features 'nix-command flakes' develop -c bash -c 'yarn && SERVER_URL=http://localhost:3000/ PROJECT_ID=${projectId} BLOCKCHAIN_STATE_SETUP=1 SERVICE_NAME=ryo yarn test:${network} --run --reporter=dot' >&2"
    )
  '';
in {
  inherit blockfrost-backend-ryo blockfrost-backend-ryo-wrapper;
  blockfrost-backend-ryo-test-mainnet = testing.makeTest rec {
    name = "blockfrost-backend-ryo-test-mainnet";

    nodes.machine = {
      imports = [./nixos-module.nix commonTestConfig];

      services.blockfrost = {
        settings = {
          dbSync = {
            host = builtins.getEnv "DBSYNC_HOST_MAINNET";
          };
          tokenRegistryUrl = builtins.getEnv "TOKEN_REGISTRY_URL_MAINNET";
        };
      };
    };

    testScript = mkTestScript "mainnet" (builtins.getEnv "PROJECT_ID_MAINNET");
  };

  blockfrost-backend-ryo-test-preview = testing.makeTest rec {
    name = "blockfrost-backend-ryo-test-preview";

    nodes.machine = {
      imports = [./nixos-module.nix commonTestConfig];

      services.blockfrost = {
        settings = {
          dbSync = {
            host = builtins.getEnv "DBSYNC_HOST_PREVIEW";
          };
          network = "preview";
          tokenRegistryUrl = builtins.getEnv "TOKEN_REGISTRY_URL_TESTNETS";
        };
      };
    };
    testScript = mkTestScript "preview" (builtins.getEnv "PROJECT_ID_PREVIEW");
  };

  blockfrost-backend-ryo-test-preprod = testing.makeTest rec {
    name = "blockfrost-backend-ryo-test-preprod";

    nodes.machine = {
      imports = [./nixos-module.nix commonTestConfig];

      services.blockfrost = {
        settings = {
          dbSync = {
            host = builtins.getEnv "DBSYNC_HOST_PREPROD";
          };
          network = "preprod";
          tokenRegistryUrl = builtins.getEnv "TOKEN_REGISTRY_URL_TESTNETS";
        };
      };
    };

    testScript = mkTestScript "preprod" (builtins.getEnv "PROJECT_ID_PREPROD");
  };
}
