import { z } from "zod";

const envVariables = z.object({
  /**
   * The github access token
   */
  GITHUB_ACCESS_TOKEN: z.string().min(1),
  /**
   * The Discord bot token
   */
  DISCORD_TOKEN: z.string().min(1),
  /**
   * The json service account key for firebase admin as a base64 string
   */
  FIREBASE_SA_BASE64: z.string().min(1),
});

// parse the environment variables
try {
  envVariables.parse(process.env);
} catch (error) {
  // if there is an error, log it and exit
  console.error(error);
  process.exit(1);
}

// keep ts happy
declare global {
  // eslint-disable-next-line
  namespace NodeJS {
    // eslint-disable-next-line
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
