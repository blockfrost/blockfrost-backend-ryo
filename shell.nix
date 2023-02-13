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
