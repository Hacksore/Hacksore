import got from "got";
import { GITHUB_API_BASE } from "../constants.js";

import type { Endpoints } from "@octokit/types";
type CreateWebhookResponseData = Endpoints["POST /repos/{owner}/{repo}/hooks"]["response"]["data"];

const { GITHUB_ACCESS_TOKEN } = process.env;

export interface CreateWebhookFailed {
  success: false;
  error: Error | string;
}

export interface CreateWebhookSucceeded {
  success: true;
}

export type CreateWebhookResult = CreateWebhookFailed | CreateWebhookSucceeded;

interface CreateWebhookOption {
  /**
   * The repo name in which to create the webhook
   */
  repo: string;
  /**
   * The owner of the repo, either an org or username
   */
  owner: string;
  /**
   * The callback url of the webhook
   */
  url: string;
}

/**
 * Create a webhook on the provided owner/repo with the given url
 * @param {CreateWebhookOption} param - The repo to create {@link CreateWebhookOption}
 * @docs https://docs.github.com/en/rest/webhooks/repos#create-a-repository-webhook
 */
export async function createGithubWebhook({ owner, repo, url }: CreateWebhookOption): Promise<CreateWebhookResult> {
  try {
    // pass in generic WebhookEvent type to get the correct response type on body
    const result = await got<CreateWebhookResponseData>(`${GITHUB_API_BASE}/repos/${owner}/${repo}/hooks`, {
      method: "POST",
      body: JSON.stringify({
        name: "web",
        active: true,
        events: ["push", "pull_request", "workflow_run", "issues", "issue_comment"],
        config: {
          url,
          content_type: "json",
          insecure_ssl: "0",
        },
      }),
      headers: {
        Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
      },
    });

    console.log(result.body);

    return {
      success: true,
    };
  } catch (err: any) {
    console.error(err);
    return {
      success: false,
      error: err.message,
    };
  }
}
