import { FirebaseOptions, initializeApp } from "firebase/app";
import { getDatabase } from "@firebase/database";
import { connectDatabaseEmulator } from "firebase/database";

const EMULATORS_STARTED = "EMULATORS_STARTED";
const isDev = process.env.NODE_ENV === "development"

// keep ts happy
declare global {
  var EMULATORS_STARTED: boolean;
}

// dbURL
const databaseURL = isDev ? "http://localhost:9000?ns=biofun" : "https://biofun.firebaseio.com";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL
};

if (typeof window !== undefined) {
  initializeApp(firebaseConfig);
}

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function startEmulators() {
  if (!global[EMULATORS_STARTED]) {
    global[EMULATORS_STARTED] = true;

    console.log("isDev", isDev)
    console.log("databaseUrl", databaseURL)
    
    console.log("Connecting to firebase emulator");
    connectDatabaseEmulator(db, "localhost", 9000);
  }
}

// setup emulator
if (process.env.NODE_ENV === "development") {
  startEmulators();
}

export { db, app };