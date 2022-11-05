import got from "got";
import { DISCORD_API_BASE } from "../constants";

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
 * Will create a webhook on the provided repo with the given url
 * @param {CreateChannelResult} param - The repo to create {@link CreateChannelResult}
 * @docs https://docs.github.com/en/rest/webhooks/repos#create-a-repository-webhook
 */
export async function createDiscordChannel({ guildId, name }: CreateChannelOptions): Promise<CreateChannelResult> {
  const response = await got(`${DISCORD_API_BASE}/api/v10/guilds/${guildId}/channels`, {
    method: "POST",
    throwHttpErrors: false,
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
  });

  const body: any = JSON.parse(response.body);

  if (response.statusCode === 201) {
    return {
      success: true,
      channelId: body.id
    };
  }

  try {
    const json = JSON.parse(response.body);
    return {
      success: false,
      error: json.message,
    };
  } catch (err) {
    return {
      success: false,
      error: "Failed to create hook",
    };
  }
}
