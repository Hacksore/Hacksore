export interface CreateWebhookFailed {
  success: false;
  error: Error | string;
}

export interface CreateWebhookSucceeded {
  success: true;
}

export type CreateWebhookResult = CreateWebhookFailed | CreateWebhookSucceeded;