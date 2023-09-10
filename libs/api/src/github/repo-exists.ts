import { GITHUB_API_BASE } from "../constants.js";

import type { Endpoints } from "@octokit/types";
type RepoInformation = Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"];

// TODO: this should have the ability to use the env util?
const { GITHUB_ACCESS_TOKEN } = process.env;

interface RepoExistsOptions {
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
 * @param {RepoExistsOptions} param - The repo to create {@link RepoExistsOptions}
 */
export async function githubRepoExists({ repo, owner }: RepoExistsOptions): Promise<boolean> {
  console.log("Checking if github repo exists");
  try {
    const response = (await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
      },
    }).then(res => res.json())) as RepoInformation;
    console.log("Found repo:", response.url);
    return true;
  } catch (err: any) {
    console.log(err);
    return false;
  }
}
