{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
        myEmacs = pkgs.emacs28WithPackages (epkgs: [
          epkgs.org
          epkgs.htmlize
        ]);
        buildInputs = [ myEmacs ];
        site = pkgs.stdenv.mkDerivation {
          name = "site";

          src = ./.;

          installPhase = ''
            ${myEmacs}/bin/emacs -Q --script ./build-site.el

            # Avoid Jekyll styling on platforms like GitHub
            touch dist/.nojekyll

            mkdir $out
            cp -R dist/* $out
          '';
        };
        serve = pkgs.writeShellScriptBin "serve" ''
          if test -n "$1"; then
            SITE_DIR=$1
          else
            SITE_DIR="${site}"
          fi

          cd $SITE_DIR && ${pkgs.python3}/bin/python3 -m http.server
        '';
      in
        {
          packages.site = site;
          defaultPackage = self.packages.${system}.site;

          apps.serve = {
            type = "app";
            program = "${serve}/bin/serve";
          };
          defaultApp = self.apps.${system}.serve;

          devShell = pkgs.mkShell {
            buildInputs = buildInputs ++ [ serve ];
          };
        });
}
