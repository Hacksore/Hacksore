#!/bin/bash
# used for testing the docker image

docker buildx build --file ./apps/bot/Dockerfile -t t/presence-bot:latest .

echo "Starting container..."
docker run --env-file "apps/bot/.env" t/presence-bot:latest  