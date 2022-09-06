FROM node:16-alpine

WORKDIR /app

COPY . .

RUN yarn install --immutable --immutable-cache --check-cache -w apps/bot && npx turbo run build --filter=apps/bot

CMD node apps/bot/dist/index.js
