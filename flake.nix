{
  description = "Blockfrost API backend";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs = { self, nixpkgs }:
    let
      lib = nixpkgs.lib;
      supportedSystems = [ "x86_64-linux" ]; # lib.systems.flakeExposed;
      forAllSystems = f: lib.genAttrs supportedSystems (system: f system);
      legacyPkgs = nixpkgs.legacyPackages;
      default = lib.genAttrs supportedSystems (system: import ./default.nix {
        inherit system;
        pkgs = legacyPkgs.${system};
      });
    in
    {
      packages = forAllSystems (system: {
        inherit (default.${system}) blockfrost-backend;
      });
      # FIXME checks are not building
      checks = forAllSystems (system: {
        inherit (default.${system})
          blockfrost-backend-test-preview
          blockfrost-backend-test-mainnet;
      });
      overlays.default = self: super: {
        inherit (self.packages.${super.system}) blockfrost-backend;
      };
    };
}
