FROM node:16-alpine

WORKDIR /app

COPY . .

RUN npm install && npm run build:dist

CMD node dist/index.js
