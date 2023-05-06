import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  clientPrefix: "PUBLIC_",
  server: {
    DISCORD_TOKEN: z.string(),
  },
  client: {},
  runtimeEnv: process.env,
});
