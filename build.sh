#!/bin/sh

rm -rf docs

emacs -Q --script build-site.el

touch docs/.nojekyll