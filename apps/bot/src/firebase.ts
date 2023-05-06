import admin from "firebase-admin";
import { Database } from "firebase-admin/database";
import "./env.js";

const serviceAccountStringData = Buffer.from(process.env.FIREBASE_SA_BASE64, "base64").toString("utf8");
const serviceAccount = JSON.parse(serviceAccountStringData);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // TODO: can we make this a const somehow?
  databaseURL: "https://biofun.firebaseio.com",
});

export const db: Database = admin.database();
