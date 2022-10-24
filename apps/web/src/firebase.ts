import admin from "firebase-admin";

const { FIREBASE_SA_BASE64 = "", NODE_ENV = "development" } = process.env;

const serviceAccountBuffer = Buffer.from(FIREBASE_SA_BASE64, "base64");
const serviceAccountStringData = serviceAccountBuffer.toString("utf8");
const serviceAccount = JSON.parse(serviceAccountStringData);

try {

  // make sure to disable emulator in prod if somehow the env gets set  
  if (NODE_ENV === "production") {
    delete process.env["FIREBASE_DATABASE_EMULATOR_HOST"];
  }

  console.log("initializing firebase app on server", serviceAccount);
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
