# bot

Running the bot

```
docker run -d \
  --name presence \
  --env-file=.env \
  -v "$(pwd)"/service_account.json:/app/service_account.json \
  --restart=always \
  hacksore/presence-bot:latest
```

### testing the docker build locally
docker build --progress=plain -t hacksore/bot -f apps/bot/Dockerfile .  
