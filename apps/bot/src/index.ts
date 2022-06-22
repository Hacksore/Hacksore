import { Client, Intents, VoiceState } from "discord.js";
import admin from "firebase-admin";
import * as functions from "firebase-functions";

import { readFile } from "fs/promises";
const serviceAccountStringData = await readFile(new URL("../service_account.json", import.meta.url), "utf8")
const serviceAccount = JSON.parse(serviceAccountStringData);

admin.initializeApp({
  // @ts-ignore
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://biofun.firebaseio.com",
});

export const db = admin.database();
export const config = functions.config();

const { DISCORD_TOKEN } = process.env;

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_PRESENCES],
});

client.on("ready", async () => {
  console.log("logged in");
});

client.on("presenceUpdate", async (_, newPres) => {
  
  const data = {
    status: newPres?.status,
    avatarHash: newPres?.user?.avatar,
    userId: newPres?.user?.id,
    activities: newPres.activities.map(item => ({
      name: item?.name,
      details: item?.details,
      type: item?.type,
      state: item?.state,
    })),
  };

  console.log("got status update", data);
  db.ref("userdata").set(data);
});

client.on("voiceStateUpdate", async (_, newVoiceState: VoiceState) => {
  const userdata = await db.ref("userdata").get();

  console.log("got streaming update", newVoiceState.streaming);

  // check for streaming state
  db.ref("userdata").set({
    ...userdata,
    streaming: newVoiceState.streaming
  });

});

client.login(DISCORD_TOKEN);
