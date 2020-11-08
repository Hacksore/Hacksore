#!/bin/bash

if [ ! -z CI_BUILD ]; then
  cd personal-site && npm run build
fi