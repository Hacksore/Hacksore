FROM node:16-alpine

# add dep for turbo 
RUN apk add --no-cache libc6-compat

WORKDIR /app

RUN ls -hal

COPY . .

# RUN npx turbo prune --scope="bot" --docker

# hack for network timeout...
RUN yarn install -w apps/bot && npx turbo run build --filter=apps/bot

CMD node /app/dist/index.js
