{ system ? builtins.currentSystem
, pkgs ? import
    (builtins.fetchTarball {
      url = "https://github.com/NixOS/nixpkgs/archive/00e376e3f3c22d991052dfeaf154c42b09deeb29.tar.gz";
      sha256 = "0sj2lhx5yfphgamdpf0by237c44699yrqw3whs3frjydpvaiplnp";
    })
    { }
}:
with pkgs;
with import (pkgs.path + "/nixos/lib/testing-python.nix") { inherit system; };
let
  packageJSON = builtins.fromJSON (builtins.readFile ./package.json);

  # Use this if you want to override config/default.ts
  /*
    blockfrost-backend-test-config = pkgs.writeText "default.ts" ''
    export default {
      server: {
        port: 3000,
        debug: true,
      },
      dbSync: {
        host: 'cdbsync-testnet.mydomain.com',
        user: 'cexplorer',
        database: 'cdbsync',
      },
        network: 'mainnet',
        tokenRegistryUrl: 'https://tokens.cardano.org',
    }
    '';
  */

in
rec {

  blockfrost-backend =
    with pkgs.lib;
    let
      src = cleanSource ./.;
      project = pkgs.callPackage ./yarn-project.nix { nodejs = pkgs.nodejs-16_x; } { inherit src; };
    in
    project.overrideAttrs (oldAttrs: rec {
      name = "blockfrost-backend";
      version = packageJSON.version;

      buildInputs = [
        nodejs-16_x
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
           --interpreter=${pkgs.nodejs-16_x}/bin/node --node-args="--max-http-header-size=32768" \
           --max-memory-restart 1500M \
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

  blockfrost-backend-test-mainnet = makeTest rec {

    machine = {
      # We have to increase memsize, otherwise we will get error:
      # "Kernel panic - not syncing: Out of memory: compulsory panic_on_oom"
      virtualisation.memorySize = 4096;
      # Backend service
      systemd.services.blockfrost-backend-mainnet = {
        wantedBy = [ "multi-user.target" ];
        script = "${blockfrost-backend}/bin/blockfrost-backend";
        environment = {
          # Use config file from repository
          NODE_CONFIG_RUNTIME_JSON = "${blockfrost-backend}/libexec/source/config/mainnet.ts";
          /*
            # Use this if you want to override config/default.ts
            NODE_CONFIG_RUNTIME_JSON = "${blockfrost-backend-test-config}";
          */
        };
      };

    };

    testScript = ''
      start_all()
      machine.wait_for_unit("blockfrost-backend-mainnet.service")
      machine.wait_for_open_port(3000)
      machine.succeed(
          "${pkgs.yarn}/bin/yarn set version berry && cd ${blockfrost-backend}/libexec/source && ${pkgs.yarn}/bin/yarn test-integration:mainnet"
      )
    '';
  };

}
