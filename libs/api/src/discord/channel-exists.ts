import { DISCORD_API_BASE } from "../constants.js";

// TODO: move this to a shared file
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
  try {
    const response = await fetch(`${DISCORD_API_BASE}/api/v10/guilds/${guildId}/channels`, {
      method: "GET",
      headers: {
        Authorization: `Bot ${DISCORD_TOKEN}`,
      },
    }).then(res => res.json());

    const foundChannelWithName = response.find((item: any) => item.name === name);
    return foundChannelWithName ?? false;
  } catch (err) {
    return false;
  }
}
