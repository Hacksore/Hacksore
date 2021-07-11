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

app.get("/presence", async (req, res) => {
  const doc = await db.collection("bio").doc("profile").get();
  const data = doc.data();
  res.send(data);
});

const presenceMontitor = () => {
  client.on("ready", async () => {
    let data = {};
    try {
      const g = client.guilds.cache.get("652755205041029120");
      const presence = g.presences.cache.get("378293909610037252");

      data = {
        status: presence.status,
      };
    } catch (err) {
      console.log(err);
      data = {
        status: "offline",
      };
    }

    const collectionRef = db.collection("bio");
    await collectionRef.doc("profile").set(data);
    return true;
  });

  client.login(config.discord.token);
};

exports.presence = functions.pubsub
  .schedule("every 5 minutes")
  .onRun(() => presenceMontitor());

exports.app = functions.https.onRequest(app);
