#!/bin/sh

set -e

rm -rf docs

emacs -Q --script build-site.el

mkdir -p docs
touch docs/.nojekyll
