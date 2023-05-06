import { FirebaseOptions, initializeApp } from "firebase/app";
import { getDatabase } from "@firebase/database";
import { connectDatabaseEmulator } from "firebase/database";

import { env } from "./env";

const firebaseConfig: FirebaseOptions = {
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  projectId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

if (typeof window !== "undefined" && ["127.0.0.1", "localhost"].includes(location.hostname)) {
  // Point to the RTDB emulator running on localhost.
  connectDatabaseEmulator(db, "127.0.0.1", 9000);
}

export { db, app };
