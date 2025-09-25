{ pkgs ? let
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
let
  nodejs = pkgs.nodejs_18;
in
pkgs.stdenv.mkDerivation {
  name = "blockfrost-backend";
  buildInputs = [
    nodejs
    (pkgs.yarn.override { inherit nodejs; })
  ];
  shellHook = ''
    export PATH="$PATH:$(pwd)/node_modules/.bin"
    yarn
  '';
}
