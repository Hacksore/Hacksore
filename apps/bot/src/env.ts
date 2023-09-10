import { z } from "zod";

const envVariables = z.object({
  /**
   * The github access token
   */
  GITHUB_ACCESS_TOKEN: z.string().nonempty(),
  /**
   * The Discord bot token
   */
  DISCORD_TOKEN: z.string().nonempty(),
  /**
   * The json service account key for firebase admin as a base64 string
   */
  FIREBASE_SA_BASE64: z.string().nonempty(),
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
