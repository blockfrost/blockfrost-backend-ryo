{}:
let
  # Pin the deployment package-set to a specific version of nixpkgs
  pkgs = import
    (builtins.fetchTarball {
      url = "https://github.com/NixOS/nixpkgs/archive/00e376e3f3c22d991052dfeaf154c42b09deeb29.tar.gz";
      sha256 = "0sj2lhx5yfphgamdpf0by237c44699yrqw3whs3frjydpvaiplnp";
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
