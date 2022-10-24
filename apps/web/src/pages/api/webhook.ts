import type { NextApiRequest, NextApiResponse } from "next";
import got from "got";
import { IWorkflowRun } from "../../types/github/workflowRun";

const { WEBHOOK_REPO_REACT_SKINVIEW3D = "{}", WEBHOOK_REPO_HACKSORE = "{}", WEBHOOK_REPO_TEST = "{}" } = process.env;

const WEBHOOK_MAP: Record<string, string> = {
  "react-skinview3d": WEBHOOK_REPO_REACT_SKINVIEW3D,
  hacksore: WEBHOOK_REPO_HACKSORE,
  test: WEBHOOK_REPO_TEST,
};

const ALLOWED_EVENTS = ["workflow_run"];

async function sendMessageToDiscord(url: string, payload: any): Promise<any> {
  // replay to discord
  await got(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  }).json();
}

function createMessageFromEvent(event: IWorkflowRun): any {
  // the status if was good or bad
  const conclusion = event.workflow_run.conclusion;
  const jobName = event.workflow_run.name;

  const commitMessage = event.workflow_run.head_commit.message;
  const commitAuthor = event.workflow_run.head_commit.author.name;

  const repoName = event.repository.name;
  const branchName = event.workflow_run.head_branch;
  const jobUrl = event.workflow_run.html_url;
  const avatarUrl = event.workflow_run.actor.avatar_url;

  if (event.action === "in_progress" && conclusion === null) {
    return {
      content: null,
      embeds: [
        {
          description: "Build has started",
          url: event.workflow_run.html_url,
          color: 13743427,
          fields: [
            {
              name: `${repoName}/${branchName}`,
              value: `${commitMessage} - ${commitAuthor}`,
            },
          ],
          author: {
            icon_url: avatarUrl,
            name: `🟠 ${jobName}`,
            url: jobUrl,
          },
        },
      ],
      username: "Github",
    };
  }

  if (event.action === "completed" && conclusion === "failure") {
    return {
      content: "<@378293909610037252>",
      embeds: [
        {
          description: "Build has failed",
          url: event.workflow_run.html_url,
          color: 13743427,
          fields: [
            {
              name: `${repoName}/${branchName}`,
              value: `${commitMessage} - ${commitAuthor}`,
            },
          ],
          author: {
            icon_url: avatarUrl,
            name: `🔴 ${jobName}`,
            url: jobUrl,
          },
        },
      ],
      username: "Github",
    };
  }

  if (event.action === "completed" && conclusion === "success") {
    return {
      content: null,
      embeds: [
        {
          description: "Build completed successfully",
          url: event.workflow_run.html_url,
          color: 13743427,
          fields: [
            {
              name: `${repoName}/${branchName}`,
              value: `${commitMessage} - ${commitAuthor}`,
            },
          ],
          author: {
            icon_url: avatarUrl,
            name: `🟢 ${jobName}`,
            url: jobUrl,
          },
        },
      ],
      username: "Github",
    };
  }
}

export default async function handleRoute(req: NextApiRequest, res: NextApiResponse<any>) {
  const eventType: any = req.headers["x-github-event"] || "unknown";

  if (!ALLOWED_EVENTS.includes(eventType)) {
    return res.status(420).json({ status: "event not registered" });
  }

  // we are getting a build status
  if (eventType === "workflow_run") {
    const event = req.body as IWorkflowRun;

    // set webhook to discord
    const url = WEBHOOK_MAP[event.repository.name.toLowerCase()];

    try {
      await sendMessageToDiscord(url, createMessageFromEvent(event));
    } catch (err: any) {
      console.log(err.message);
    }

    return res.status(200).json({ status: "ok" });
  }

  // this can never happen
  return res.status(500).json({ status: "hmmm" });
}
