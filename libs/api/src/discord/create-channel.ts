import { DISCORD_API_BASE } from "../constants.js";

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

export interface CreateChannelFailed {
  success: false;
  error: Error | string;
}

export interface CreateChannelSucceeded {
  success: true;
  channelId: string;
}

export type CreateChannelResult = CreateChannelFailed | CreateChannelSucceeded;

/**
 * Will create a discord channel
 * @param {CreateChannelResult} param - The repo to create {@link CreateChannelResult}
 */
export async function createDiscordChannel({ guildId, name }: CreateChannelOptions): Promise<CreateChannelResult> {
  try {
    const response = await fetch(`${DISCORD_API_BASE}/api/v10/guilds/${guildId}/channels`, {
      method: "POST",
      body: JSON.stringify({
        name,
        permission_overwrites: [],
        parent_id: "1033776850964578324",
        type: 0,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${DISCORD_TOKEN}`,
      },
    }).then(res => res.json());

    // TODO: are there discord types somewhere?

    return {
      success: true,
      channelId: response.id,
    };
  } catch (err) {
    return {
      success: false,
      error: "Failed to create hook",
    };
  }
}

