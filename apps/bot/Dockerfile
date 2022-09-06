FROM node:16-alpine

WORKDIR /app

COPY ./apps/bot .

RUN yarn && yarn build:dist

CMD node dist/index.js
