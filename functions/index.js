const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
const config = functions.config();
admin.initializeApp();

const db = admin.firestore();

const { Client, Intents } = require("discord.js");
const { GUILDS, GUILD_MEMBERS, GUILD_MESSAGES, GUILD_PRESENCES } =
  Intents.FLAGS;
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
    });
  }
})();

app.get("/presence", async (req, res) => {
  presenceMontitor();
  const doc = await db.collection("bio").doc("profile").get();
  const data = doc.data();
  res.send(data);
});

const presenceMontitor = () => {
  client.on("ready", async () => {
    let data = {};
    try {
      const g = client.guilds.cache.get("975086424049213560");
      const presence = g.presences.cache.get("378293909610037252");
      const profile = g.members.cache.get("378293909610037252");

      data = {
        status: presence.status,
        avatarUrl: `https://cdn.discordapp.com/avatars/${profile.user.id}/${profile.user.avatar}.png`,
      };
          
    } catch (err) {
      console.log(err);
      data = {
        status: "offline",
      };
    }

    const collectionRef = db.collection("bio");
    await collectionRef.doc("profile").set(data);


    proccess.exit(0);
  });

  client.login(config.discord.token);
};

exports.presence = functions.pubsub
  .schedule("every 1 minutes")
  .onRun(() => presenceMontitor());

  exports.app = functions.https.onRequest(app);
