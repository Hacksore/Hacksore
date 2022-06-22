import functions from "firebase-functions";
import express from "express";
import admin from "firebase-admin";

admin.initializeApp();

const db = admin.database();
const expressApp = express();

interface CustomType {
  avatarHash: string;
  activities: string;
}

expressApp.get("/presence", async (_, res) => {
  const doc = await db.ref("userdata").get();

  // TODO: find a wayu to type this properly
  // @ts-ignore
  const { avatarHash, activities: rawActivities = [], status, userId, streaming } = doc.val();
  const activities = Object.values(rawActivities).map(val => val);

  const data = {
    activities, 
    avatarHash,
    status,
    userId,
    streaming
  }
  
  res.send(data);
});

const app = functions.https.onRequest(expressApp);
export { app };
