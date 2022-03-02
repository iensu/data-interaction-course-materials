{
  description = "Data Interaction course material configuration";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachSystem [
      "x86_64-darwin"
      "x86_64-linux"
    ] (system:
      let
        name = "data-interaction-course";
        pkgs = import nixpkgs { inherit system; };
      in
        {
          devShell = pkgs.mkShell {
            nativeBuildInputs = with pkgs; [ nodejs-16_x ];

            shellHook = ''
            echo "Dev shell for ${name}"
            echo ""
            '';
          };
        }
    );
}
