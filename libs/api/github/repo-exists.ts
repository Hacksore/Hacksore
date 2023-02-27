import got from "got";
import { GITHUB_API_BASE } from "../constants";

const { GITHUB_ACCESS_TOKEN } = process.env;

interface RepoExists {
  /**
   * The repo name in which to create the webhook
   */
  repo: string;
  /**
   * The owner of the repo, either an org or username
   */
  owner: string;
}

/**
 * Will check if a repo exists
 * @param {RepoExists} param - The repo to create {@link RepoExists}
 */
export async function githubRepoExists({ repo, owner }: RepoExists): Promise<boolean> {
  const response = await got(`${GITHUB_API_BASE}/repos/${owner}/${repo}`, {
    method: "GET",
    throwHttpErrors: false,
    headers: {
      Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
    },
  });

  if (response.statusCode === 200) {
    return true;
  }

  return false;
}
