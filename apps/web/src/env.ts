import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    /**
     * This is a base64 encoded string of a service account JSON file.
     */
    FIREBASE_SA_BASE64: z.string().nonempty(),
  },
  client: {
    NEXT_PUBLIC_FIREBASE_API_KEY: z.string().nonempty(),
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().nonempty(),
    NEXT_PUBLIC_FIREBASE_APP_ID: z.string().nonempty(),
    NEXT_PUBLIC_FIREBASE_DATABASE_URL: z.string().url().nonempty(),
  },
  runtimeEnv: {
    FIREBASE_SA_BASE64: process.env.FIREBASE_SA_BASE64,
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    NEXT_PUBLIC_FIREBASE_DATABASE_URL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  },
});
