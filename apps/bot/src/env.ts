import { z } from "zod";

const envVariables = z.object({
  DISCORD_TOKEN: z.string(),
  FIREBASE_SA_BASE64: z.string(),
});

// parse the environment variables
envVariables.parse(process.env);

// TODO: fix this?
declare global {
  // eslint-disable-next-line no-unused-vars
  namespace NodeJS {
    // eslint-disable-next-line no-unused-vars
    interface ProcessEnv extends z.infer<typeof envVariables> { }
  }
}
