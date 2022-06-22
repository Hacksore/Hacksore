import functions from "firebase-functions";
import express from "express";
import admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();
const expressApp = express();

expressApp.get("/presence", async (_, res) => {
  const doc = await db.collection("bio").doc("profile").get();
  const data = doc.data();
  res.send(data);
});

const app = functions.https.onRequest(expressApp);
export { app };
