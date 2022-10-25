import admin from "firebase-admin";

const { FIREBASE_SA_BASE64 = "" } = process.env;

const serviceAccountBuffer = Buffer.from(FIREBASE_SA_BASE64, "base64");
const serviceAccountStringData = serviceAccountBuffer.toString("utf8");
const serviceAccount = JSON.parse(serviceAccountStringData);

try {

  admin.initializeApp({
    // @ts-ignore
    credential: admin.credential.cert(serviceAccount),
    // TODO: constant?
    databaseURL: "https://biofun.firebaseio.com",
  });
} catch (error: any) {
  /*
   * We skip the "already exists" message which is
   * not an actual error when we're hot-reloading.
   */
  if (!/already exists/u.test(error.message)) {
    console.error("Firebase admin initialization error", error.stack);
  }
}

export const db = admin.database();
