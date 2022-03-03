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
        pkgs = import nixpkgs {
          inherit system;
          config.allowUnfreePredicate = pkg: builtins.elem (nixpkgs.lib.getName pkg) [
            "mongodb"
          ];
        };
      in
        {
          devShell = pkgs.mkShell {
            buildInputs = with pkgs; [
              nodejs-16_x
              mongodb-4_2
            ];

            shellHook = ''
            echo "Dev shell for ${name}"
            echo ""
            '';
          };
        }
    );
}
