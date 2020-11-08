#!/bin/bash

if [ ! -z CI ]; then
  cd personal-site && npm run build
fi