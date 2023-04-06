import { FirebaseOptions, initializeApp } from "firebase/app";
import { getDatabase } from "@firebase/database";
import { connectDatabaseEmulator } from "firebase/database";

// keep ts happy
declare global {
  // eslint-disable-next-line no-unused-vars
  var EMULATORS_STARTED: boolean;
}

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

if (typeof window !== "undefined" && ["127.0.0.1", "localhost"].includes(location.hostname)) {
  // Point to the RTDB emulator running on localhost.
  connectDatabaseEmulator(db, "127.0.0.1", 9000);
}

export { db, app };
