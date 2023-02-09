{
  description = "Blockfrost API backend";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs = { self, nixpkgs }:
    let
      lib = nixpkgs.lib;
      supportedSystems = [ "x86_64-linux" "x86_64-darwin" ];
      forAllSystems = f: lib.genAttrs supportedSystems (system: f system);
      legacyPkgs = nixpkgs.legacyPackages;
      default = lib.genAttrs supportedSystems (system: import ./default.nix {
        inherit system;
        pkgs = legacyPkgs.${system};
      });
    in
    {
      packages = forAllSystems (system: {
        inherit (default.${system}) blockfrost-backend-ryo;
        dockerImage = legacyPkgs.${system}.dockerTools.buildImage {
          name = "blockfrost";
          config = {
            Cmd = [ "${self.packages.${system}.blockfrost-backend-ryo}/bin/blockfrost-backend-ryo" ];
          };
        };
        default = self.packages.${system}.blockfrost-backend-ryo;
      });
      checks = forAllSystems (system: {
        inherit (self.packages.${system}) blockfrost-backend-ryo dockerImage;
      });
      apps = forAllSystems (system: {
        blockfrost-backend-ryo = {
          type = "app";
          program = "${self.packages.${system}.blockfrost-backend-ryo}/bin/blockfrost-backend-ryo";
        };
        default = self.apps.${system}.blockfrost-backend-ryo;
      });
      overlays.default = self: super: {
        inherit (self.packages.${super.system}) blockfrost-backend;
      };
    };
}
