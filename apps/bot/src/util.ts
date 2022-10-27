import { DISCORD_MY_ID, DISCORD_SERVER_ID } from "./constants.js";

export const isUpdateAllowed = (id: string | undefined, guildId: string | undefined) => {
  return id === DISCORD_MY_ID && guildId === DISCORD_SERVER_ID;
};
