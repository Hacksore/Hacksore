import { z } from "zod";

const envVariables = z.object({
  DISCORD_TOKEN: z.string().nonempty(),
  FIREBASE_SA_BASE64: z.string().nonempty(),
});

// parse the environment variables
envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> { }
  }
}
