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

  if (event.action === "in_progress" && conclusion === null) {
    return {
      content: null,
      embeds: [
        {
          description: `[**${jobName}**]\n⏳ Build has started`,
          url: event.workflow_run.html_url,
          color: 13743427,
          fields: [
            {
              name: "Commit",
              value: event.workflow_run.head_commit.message
            },
          ],
          author: {
            name: `Build ${event.workflow_run.id}`,
            url: event.workflow_run.html_url,
          },
        },
      ],
      username: "Github",
    };
  }

  if (event.action === "completed" && conclusion === "failure") {
    return {
      content: "<@378293909610037252> please take a look",
      embeds: [
        {
          description: `[**${jobName}**]\n🚨 Build has failed`,
          url: event.workflow_run.html_url,
          color: 14695998,
          fields: [
            {
              name: "Commit",
              value: event.workflow_run.head_commit.message
            },
          ],
          author: {
            name: `Build ${event.workflow_run.id}`,
            url: event.workflow_run.html_url,
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
          description: `[**${jobName}**]\n✅ Build has completed without issues 🥳`,
          url: event.workflow_run.html_url,
          color: 6280543,
          fields: [
            {
              name: "Commit",
              value: event.workflow_run.head_commit.message
            },
          ],
          author: {
            name: `Build ${event.workflow_run.id}`,
            url: event.workflow_run.html_url,
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
