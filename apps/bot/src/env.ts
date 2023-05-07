import { z } from "zod";

const envVariables = z.object({
  DISCORD_TOKEN: z.string().nonempty(),
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

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> { }
  }
}
