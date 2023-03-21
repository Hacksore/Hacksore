import admin from "firebase-admin";

const { FIREBASE_SA_BASE64 = "" } = process.env;
const serviceAccountStringData = Buffer.from(FIREBASE_SA_BASE64, "base64").toString("utf8");
const serviceAccount = JSON.parse(serviceAccountStringData);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
});

export const db: any = admin.database();
