import type { NextApiRequest, NextApiResponse } from "next";
import got from "got";
import { GithubWorkflowRun } from "../../types/github/workflowRun";
import { GithubIssue } from "../../types/github/issue";
import { GithubIssueComment } from "../../types/github/issueComment";
import { db } from "../../firebase";

// events to allow from github
const ALLOWED_EVENTS = ["workflow_run", "workflow_job", "issues", "issue_comment"];

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

function createMessageForIssue(event: GithubIssue): any {
  const description = event.issue.body;
  const issueUrl = event.issue.html_url;
  const issueTitle = event.issue.title;

  const repoName = event.repository.full_name;
  const avatarUrl = event.sender.avatar_url;

  const author = event.sender.login;

  if (event.action === "created") {
    return {
      content: "<@378293909610037252>",
      embeds: [
        {
          description: description.substring(0, 100),
          url: issueUrl,
          color: 3764971,
          fields: [
            {
              name: repoName,
              value: `Issue created by ${author}`,
            },
          ],
          author: {
            icon_url: avatarUrl,
            name: issueTitle,
            url: issueUrl,
          },
        },
      ],
      username: "Github",
    };
  }

  if (event.action === "edited") {
    return {
      content: "<@378293909610037252>",
      embeds: [
        {
          description: description.substring(0, 100),
          url: issueUrl,
          color: 3764971,
          fields: [
            {
              name: repoName,
              value: `Issue updated by ${author}`,
            },
          ],
          author: {
            icon_url: avatarUrl,
            name: issueTitle,
            url: issueUrl,
          },
        },
      ],
      username: "Github",
    };
  }

  if (event.action === "closed") {
    return {
      content: null,
      embeds: [
        {
          description: description.substring(0, 100),
          url: issueUrl,
          color: 3764971,
          fields: [
            {
              name: repoName,
              value: `Issue closed by ${author}`,
            },
          ],
          author: {
            icon_url: avatarUrl,
            name: issueTitle,
            url: issueUrl,
          },
        },
      ],
      username: "Github",
    };
  }
}

function createMessageForIssueComment(event: GithubIssueComment): any {
  const description = event.comment.body;
  const issueUrl = event.issue.html_url;
  const issueTitle = event.issue.title;

  const repoName = event.repository.full_name;
  const avatarUrl = event.sender.avatar_url;

  const author = event.sender.login;

  if (event.action === "created") {
    return {
      content: "<@378293909610037252>",
      embeds: [
        {
          description: description.substring(0, 100),
          url: issueUrl,
          color: 3764971,
          fields: [
            {
              name: repoName,
              value: `Issue comment added by ${author}`,
            },
          ],
          author: {
            icon_url: avatarUrl,
            name: issueTitle,
            url: issueUrl,
          },
        },
      ],
      username: "Github",
    };
  }
}

function createMessageForWorkflow(event: GithubWorkflowRun): any {
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
          description: "Job has started",
          url: event.workflow_run.html_url,
          color: 15439161,
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
          description: "Job has failed",
          url: event.workflow_run.html_url,
          color: 13264986,
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
          description: "Job completed successfully",
          url: event.workflow_run.html_url,
          color: 6280543,
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

  // a stub of shared things
  const genericEvent = req.body as { action: string, repository: { name: string }};

  // debug log
  console.log(`Receiving event from github ${eventType}:${genericEvent.action}`);

  // read data from firebase
  const webhookRefDoc = await db.ref("webhooks").get();

  // the doc from the database
  const configuredWebhooks: { [key: string]: { url: string } } = webhookRefDoc.val();

  // debug log
  console.log(configuredWebhooks);

  const url = configuredWebhooks[genericEvent.repository.name.toLowerCase()].url;

  // we are getting a build status
  if (eventType === "workflow_run") {
    const event = req.body as GithubWorkflowRun;

    try {
      await sendMessageToDiscord(url, createMessageForWorkflow(event));
    } catch (err: any) {
      console.log(err.message);
    }

    return res.status(200).json({ status: "ok" });
  }

  // we are getting an issue
  if (eventType === "issues") {
    const event = req.body as GithubIssue;

    try {
      await sendMessageToDiscord(url, createMessageForIssue(event));
    } catch (err: any) {
      console.log(err.message);
    }

    return res.status(200).json({ status: "ok" });
  }

  // we are getting an issue comment
  if (eventType === "issue_comment") {
    const event = req.body as GithubIssueComment;

    try {
      await sendMessageToDiscord(url, createMessageForIssueComment(event));
    } catch (err: any) {
      console.log(err.message);
    }

    return res.status(200).json({ status: "ok" });
  }

  // this can never happen
  return res.status(500).json({ status: "hmmm" });
}
