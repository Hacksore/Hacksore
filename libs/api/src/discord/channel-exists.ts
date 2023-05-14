import got from "got";
import { DISCORD_API_BASE } from "../constants.js";

// FIXME: this uses a env var and should be using the env typesaftey shiz
const { DISCORD_TOKEN } = process.env;

interface CreateChannelOptions {
  /**
   * The guildId of the discord server
   */
  guildId: string;
  /**
   * The name of the channel to create
   */
  name: string;
}

/**
 * Will test if a channel with that name exists in the server
 * @param {CreateChannelOptions} param - The repo to create {@link CreateChannelOptions}
 */
export async function discordChannelExists({ guildId, name }: CreateChannelOptions): Promise<boolean> {
  const response = await got(`${DISCORD_API_BASE}/api/v10/guilds/${guildId}/channels`, {
    method: "GET",
    throwHttpErrors: false,
    headers: {
      Authorization: `Bot ${DISCORD_TOKEN}`,
    },
  });

  if (response.statusCode === 200) {
    const channels = JSON.parse(response.body);
    const foundChannelWithName = channels.find((item: any) => item.name === name);
    return foundChannelWithName ?? false;
  }

  return false;
}
