FROM node:16-alpine

# add dep for turbo 
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY . .

# hack for network timeout...
RUN yarn install --immutable --immutable-cache --check-cache --network-timeout 1000000 -w apps/bot && npx turbo run build --filter=apps/bot

CMD node apps/bot/dist/index.js
