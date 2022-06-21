const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
const config = functions.config();
admin.initializeApp();

const db = admin.firestore();

const DISCORD_GUILD_ID = "975086424049213560";
const DISCORD_USER_ID = "378293909610037252";

const { Client, Intents } = require("discord.js");
const { GUILDS, GUILD_MEMBERS, GUILD_MESSAGES, GUILD_PRESENCES } = Intents.FLAGS;
const client = new Client({
  intents: [GUILDS, GUILD_MEMBERS, GUILD_PRESENCES, GUILD_MESSAGES],
});

const app = express();

(async () => {
  const collectionRef = db.collection("bio");
  const profile = await collectionRef.doc("profile").get();
  if (!profile.exists) {
    await collectionRef.doc("profile").set({
      status: "idle",
      avatarHash: "",
      activities: [],
      userId: "",
    });
  }
})();

app.get("/presence", async (_, res) => {
  const doc = await db.collection("bio").doc("profile").get();
  const data = doc.data();
  res.send(data);
});

const presenceMontitor = async () => {
  const collectionRef = db.collection("bio");
  const existingProfile = await collectionRef.doc("profile").get();

  client.on("ready", async () => {
    let data = {};
    console.log("discord ready...")
    try {
      const g = client.guilds.cache.get(DISCORD_GUILD_ID);
      const presence = g.presences.cache.get(DISCORD_USER_ID);
      const profile = g.members.cache.get(DISCORD_USER_ID);

      data = {
        status: presence.status,
        avatarHash: profile.user.avatar,
        userId: profile.user.id,
        activities: presence.activities.map(item => ({
          name: item.name,
          details: item.details,
          type: item.type,
          state: item.state,
        })),
      };

      console.log("presence update", data);

    } catch (err) {
      console.error("Discord err", err);
      data = {
        ...existingProfile.data(),
        status: "unknown",
        activities: [],
      };
    }

    // update profile data
    await collectionRef.doc("profile").set(data);

    process.exit(0);

  });

  client.on("error", err => {
    console.log("discord error", err);
    process.exit(1);
  });

  console.log("logging into discord...");
  client.login(config.discord.token);
};

exports.presence = functions.pubsub.schedule("every 1 minutes").onRun(() => presenceMontitor());

exports.app = functions.https.onRequest(app);
