#!/bin/sh

# do prebuild only on local machine, skip in CD
if [ -z "$CI" ]; then
  cd personal-site && npm run build
fi