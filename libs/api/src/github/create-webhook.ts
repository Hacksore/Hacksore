import got from "got";
import { GITHUB_API_BASE } from "../constants.js";
import { CreateWebhookResult } from "../types.js";

// TODO: what should i do with ENV vars that are attempted to be use in share packages? 
const { GITHUB_ACCESS_TOKEN } = process.env;

interface CreateWebHookOption {
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
 * Will create a webhook on the provided repo with the given url
 * @param {CreateWebHookOption} param - The repo to create {@link CreateWebHookOption}
 * @docs https://docs.github.com/en/rest/webhooks/repos#create-a-repository-webhook
 */
export async function createGithubWebhook({ repo, owner, url }: CreateWebHookOption): Promise<CreateWebhookResult> {
  const response = await got(`${GITHUB_API_BASE}/repos/${owner}/${repo}/hooks`, {
    method: "POST",
    throwHttpErrors: false,
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

  if (response.statusCode === 201) {
    return {
      success: true,
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
