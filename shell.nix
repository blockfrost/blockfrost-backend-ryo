{}:
let
  # Pin the deployment package-set to a specific version of nixpkgs
  pkgs = import
    (builtins.fetchTarball {
      url = "https://github.com/NixOS/nixpkgs/archive/2f9fd351ec37f5d479556cd48be4ca340da59b8f.tar.gz";
      sha256 = "0w3ysrhbqhgr1qnh0r9miyqd7yf7vsd4wcd21dffwjlb99lynla8";
    })
    { };

in
with pkgs;

stdenv.mkDerivation {
  name = "blockfrost-backend";
  buildInputs = [
    nodejs-16_x
    (yarn.override { nodejs = nodejs-16_x; })
  ];
  shellHook = ''
    export PATH="$PATH:$(pwd)/node_modules/.bin"
    yarn
  '';
}
