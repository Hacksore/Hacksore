import { Client, GatewayIntentBits, VoiceState } from "discord.js";
import admin from "firebase-admin";
import "dotenv/config";

import { readFile } from "fs/promises";
const serviceAccountStringData = await readFile(new URL("../service_account.json", import.meta.url), "utf8");
const serviceAccount = JSON.parse(serviceAccountStringData);

admin.initializeApp({
  // @ts-ignore
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://biofun.firebaseio.com",
});

export const db = admin.database();

const DISCORD_MY_ID = "378293909610037252";
const DISCORD_SERVER_ID = "975086424049213560";

const { DISCORD_TOKEN } = process.env;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

const isUpdateAllowed = (id: string | undefined, guildId: string | undefined) => {
  return id === DISCORD_MY_ID && guildId === DISCORD_SERVER_ID;
};

client.on("ready", async () => {
  console.log("logged in");
});

client.on("presenceUpdate", async (_, newPres) => {
  if (!isUpdateAllowed(newPres.user?.id, newPres.guild?.id)) {
    return;
  }

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

  db.ref("userdata").set(data);
});

client.on("voiceStateUpdate", async (_, newVoiceState: VoiceState) => {
  if (!isUpdateAllowed(newVoiceState?.id, newVoiceState.guild?.id)) {
    return;
  }

  const userdataDoc = await db.ref("userdata").get();
  // check for streaming state
  db.ref("userdata").set({
    ...userdataDoc.val(),
    streaming: newVoiceState.streaming,
  });
});

// TODO: this doesn't work for avatars for some reason but works for nicknames
client.on("guildMemberUpdate", async (_, newMember) => {
  if (!isUpdateAllowed(newMember?.id, newMember.guild?.id)) {
    return;
  }

  const userdataDoc = await db.ref("userdata").get();

  // update anything that changed
  db.ref("userdata").set({
    ...userdataDoc.val(),
    avatarHash: newMember.avatar,
  });
});

client.login(DISCORD_TOKEN);
