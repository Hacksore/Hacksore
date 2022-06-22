#!/bin/sh

# do prebuild only on local machine, skip in CI
if [ -z "$CI" ]; then
  npx turbo run build --filter=web
fi