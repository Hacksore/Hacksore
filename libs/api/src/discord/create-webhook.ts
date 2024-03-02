import { DISCORD_API_BASE } from "../constants.js";

const { DISCORD_TOKEN } = process.env;

interface CreateWebHookOption {
  /**
   * The owner of the repo, either an org or username
   */
  channelId: string;
}

export interface CreateWebhookFailed {
  success: false;
  error: Error | string;
}

export interface CreateWebhookSucceeded {
  success: true;
  url: string;
}

export type CreateWebhookResult = CreateWebhookFailed | CreateWebhookSucceeded;

/**
 * Will create a webhook on the provided channel
 * @param {CreateWebhookResult} param - The methods options {@link CreateWebhookResult}
 * @docs https://discord.com/developers/docs/resources/webhook
 */
export async function createDiscordWebhook({ channelId }: CreateWebHookOption): Promise<CreateWebhookResult> {
  try {
    const response = await fetch(`${DISCORD_API_BASE}/api/v10/channels/${channelId}/webhooks`, {
      method: "POST",
      body: JSON.stringify({
        name: "github",
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${DISCORD_TOKEN}`,
      },
    }).then(res => res.json());

    return {
      success: true,
      url: `https://discord.com/api/webhooks/${response.id}/${response.token}`,
    };
  } catch (err) {
    return {
      success: false,
      error: "Failed to create discord webhook",
    };
  }
}
