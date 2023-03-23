import admin from "firebase-admin";

const { FIREBASE_SA_BASE64 } = process.env;

if (!FIREBASE_SA_BASE64) {
  throw new Error("You must provide a FIREBASE_SA_BASE64 variable");
}

const serviceAccountBuffer = Buffer.from(FIREBASE_SA_BASE64, "base64");
const serviceAccountStringData = serviceAccountBuffer.toString("utf8");
const serviceAccount: admin.ServiceAccount = JSON.parse(serviceAccountStringData);

if (!admin.apps.length) {
  try {
    console.log("firebase server initializeApp...");
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    });

    console.log("initialized firebase server app!");
  } catch (error: any) {
    console.log(error);
  }
}

export const db = admin.database();
