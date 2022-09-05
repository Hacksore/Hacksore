FROM node:16-alpine

WORKDIR /app

COPY . .

RUN yarn && yarn build:dist

CMD node dist/index.js
