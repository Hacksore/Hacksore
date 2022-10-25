import type { NextApiRequest, NextApiResponse } from "next";

import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { db } from "../../firebase";
import { githubRepoExists, createGithubWebhook } from "api/github";
import { createDiscordChannel, discordChannelExists } from "api/discord";

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
    console.log(req.body);
    const { name } = req.body;

    // hard code for now
    const guildId = "975086424049213560";

    /*
    Steps to add a new repo 
    1. ✅ check if a repo exists with that name
    2. ✅ check we dont have that channel in discord created already
    1. ✅ create discord channel with the repo as channel name
    2. ✅ create a webhook on github for the repo
    3. create a webhook for the discord channel
    4. add the discord webhook to the firebase db
    5. profit????
    */

    // create channel
    const repoExists = await githubRepoExists({
      owner: "hacksore",
      repo: name,
    });

    if (!repoExists) {
      return res.status(400).json({ error: "The repo doesnt exists" });
    }

    // create channel
    const channelExists = await discordChannelExists({
      guildId,
      name,
    });

    if (channelExists) {
      return res.status(400).json({ error: "The discord channel already exists in the server" });
    }

    // create channel
    const discordCreateChannelResult = await createDiscordChannel({
      guildId,
      name,
    });

    if (!discordCreateChannelResult.success) {
      console.log(discordCreateChannelResult.error);
      return res.status(500).json({ error: "Something went wrong creating the discord channel" });
    }

    // get the channel id
    const discordChannelId = discordCreateChannelResult.channelId;

    const result = await createGithubWebhook({
      owner: "Hacksore",
      repo: name,
      // TODO: allow local somehow for testing
      url: "https://boult.me/api/webhook",
    });

    if (!result.success) {
      return res.status(500).json({ error: "Could not create discord webhook" });
    }

    return res.status(200).json({ ok: 1 });
  }

  return res.status(200).json({ error: "hmm" });
}
