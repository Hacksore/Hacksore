import { FirebaseOptions, initializeApp } from "firebase/app";
import { getDatabase } from "@firebase/database";
import { connectDatabaseEmulator } from "firebase/database";

const EMULATORS_STARTED = "EMULATORS_STARTED";

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

// this is called on the client not the server
if (typeof window !== "undefined") {
  console.log("Connecting to firebase on the client...")
}

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// setup emulator only in dev mode
if (process.env.NODE_ENV !== "production") {
  if (!global[EMULATORS_STARTED]) {
    global[EMULATORS_STARTED] = true;
    console.log("Connecting to firebase emulator");
    connectDatabaseEmulator(db, "localhost", 9000);
  }
}

export { db, app };
