import type { NextApiRequest, NextApiResponse } from "next";

import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { db } from "../../firebase-server";
import { githubRepoExists, createGithubWebhook } from "api/github";
import { createDiscordChannel, discordChannelExists, createDiscordWebhook } from "api/discord";
import got from "got";

const WEBHOOK_DOMAIN = "boult.me";

export default async function handleRoute(req: NextApiRequest, res: NextApiResponse<any>) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session?.user?.id !== "996134") {
    return res.status(401).json({
      error: "only Sean can do this bruv",
    });
  }

  if (req.method === "GET") {
    // read data from firebase
    const webhookRefDoc = await db.ref("webhooks").get();

    // the doc from the database
    const configuredWebhooks: { [key: string]: { url: string } } = webhookRefDoc.val();

    return res.status(200).json(configuredWebhooks);
  }

  if (req.method === "POST") {
    const { name } = req.body;

    // hard code for now
    const guildId = "975086424049213560";

    /*
    Steps to add a new repo 
    1. ✅ check if a repo exists with that name
    2. ✅ check we don't have that channel in discord created already
    1. ✅ create discord channel with the repo as channel name
    2. ✅ create a webhook on github for the repo
    3. ✅ create a webhook for the discord channel
    4. ✅ add the discord webhook to the firebase db
    5. ✅ send message with the new hook for best e2e
    5. profit????
    */

    // create channel
    console.log("Checking if repo exists")
    const repoExists = await githubRepoExists({
      owner: "hacksore",
      repo: name,
    });

    if (!repoExists) {
      return res.status(400).json({ error: "The repo doesn't exists" });
    }

    // create channel
    console.log("Checking if discord channel exists")
    const channelExists = await discordChannelExists({
      guildId,
      name,
    });

    if (channelExists) {
      return res.status(400).json({ error: "The discord channel already exists in the server" });
    }

    // create channel
    console.log("Creating discord channel")
    const discordCreateChannelResult = await createDiscordChannel({
      guildId,
      name,
    });

    if (!discordCreateChannelResult.success) {
      return res.status(500).json({ error: "Something went wrong creating the discord channel" });
    }

    // get the channel id
    const discordChannelId = discordCreateChannelResult.channelId;

    console.log("Creating github webhook");
    const createGithubWebhookResult = await createGithubWebhook({
      owner: "Hacksore",
      repo: name,
      // TODO: allow local somehow for testing
      url: `https://${WEBHOOK_DOMAIN}/api/webhook`,
    });

    if (!createGithubWebhookResult.success) {
      return res.status(500).json({ error: "Could not create github webhook" });
    }

    console.log("Creating discord webhook for the new channel", discordChannelId);
    const createDiscordWebhookResult = await createDiscordWebhook({
      channelId: discordChannelId,
    });

    if (!createDiscordWebhookResult.success) {
      return res.status(500).json({ error: "Could not create discord webhook" });
    }

    // create ref in database
    // const webhookRefDoc = await db.ref("webhooks").get();
    // const currentWebhooks = webhookRefDoc.val();

    db.ref("webhooks").child(name.toLowerCase()).set({
      url: createDiscordWebhookResult.url,
    });

    console.log("sending message that it was registered");
    await got(createDiscordWebhookResult.url, {
      method: "POST",
      body: JSON.stringify({
        content: "<@378293909610037252> repo registered for notifications",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.status(200).json({ status: "ok" });
  }

  return res.status(200).json({ error: "hmm" });
}
