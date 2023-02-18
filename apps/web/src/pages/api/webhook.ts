import type { NextApiRequest, NextApiResponse } from "next";
import got from "got";
import { IssueCommentCreatedEvent, IssuesEvent, WorkflowRunEvent, WorkflowJobEvent } from "@octokit/webhooks-types";

import { db } from "../../firebase-server";
import { Colors } from "api/constants";

// events to allow from github
const ALLOWED_EVENTS = ["ping", "workflow_run", "workflow_job", "issues", "issue_comment"];
const DISCORD_ID = "378293909610037252";

async function sendMessageToDiscord(url: string, payload: any): Promise<any> {
  // send the mssage to discord
  await got(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  }).json();
}

function createMessageForIssue(event: IssuesEvent): any {
  const description = event.issue.body;
  const issueUrl = event.issue.html_url;
  const issueTitle = event.issue.title;

  const repoName = event.repository.full_name;
  const avatarUrl = event.sender.avatar_url;
  const author = event.sender.login;

  const payload = {
    content: "",
    embeds: [
      {
        description: description?.substring(0, 100),
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

  if (event.action === "opened") {
    payload.content = `<@${DISCORD_ID}>`;
    payload.embeds[0].fields[0].value = `Issue created by ${author}`;
    payload.embeds[0].color = Colors.Green;

    return payload;
  }

  if (event.action === "edited") {
    payload.embeds[0].fields[0].value = `Issue updated by ${author}`;
    payload.embeds[0].color = Colors.Green;

    return payload;
  }

  if (event.action === "closed") {
    payload.embeds[0].fields[0].value = `Issue closed by ${author}`;
    payload.embeds[0].color = Colors.Blue;

    return payload;
  }
}

function createMessageForIssueComment(event: IssueCommentCreatedEvent): any {
  const description = event.comment.body;
  const issueUrl = event.issue.html_url;
  const issueTitle = event.issue.title;

  const repoName = event.repository.full_name;
  const avatarUrl = event.sender.avatar_url;

  const author = event.sender.login;

  if (event.action === "created") {
    return {
      content: `<@${DISCORD_ID}>`,
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

function createMessageForWorkflowRun(event: WorkflowRunEvent): any {
  // the status if was good or bad
  const conclusion = event.workflow_run.conclusion;
  const jobName = event.workflow_run.name;

  const commitMessage = event.workflow_run.head_commit.message;
  const commitAuthor = event.workflow_run.head_commit.author.name;

  const repoName = event.repository.name;
  const branchName = event.workflow_run.head_branch;
  const jobUrl = event.workflow_run.html_url;
  const avatarUrl = event.workflow_run.actor.avatar_url;

  const payload = {
    content: "",
    embeds: [
      {
        description: "",
        url: event.workflow_run.html_url,
        color: 0,
        fields: [
          {
            name: `${repoName}/${branchName}`,
            value: `${commitMessage} - ${commitAuthor}`,
          },
        ],
        author: {
          icon_url: avatarUrl,
          name: "",
          url: jobUrl,
        },
      },
    ],
    username: "Github",
  };

  if (event.action === "requested" && conclusion === null) {
    payload.embeds[0].author.name = `🟠 ${jobName}`;
    payload.embeds[0].description = "Run was started";
    payload.embeds[0].color = Colors.Orange;
    return payload;
  }

  if (event.action === "completed" && conclusion === "failure") {
    payload.content = `<@${DISCORD_ID}>`;
    payload.embeds[0].author.name = `🔴 ${jobName}`;
    payload.embeds[0].description = "Run has failed";
    payload.embeds[0].color = Colors.Red;
    return payload;
  }

  if (event.action === "completed" && conclusion === "success") {
    payload.embeds[0].author.name = `🟢 ${jobName}`;
    payload.embeds[0].description = "Run completed successfully";
    payload.embeds[0].color = Colors.Green;
    return payload;
  }

  if (event.action === "completed" && conclusion === "cancelled") {
    payload.embeds[0].author.name = `⚪ ${jobName}`;
    payload.embeds[0].description = "Run was cancelled";
    payload.embeds[0].color = Colors.Gray;
    return payload;
  }
}

function createMessageForWorkflowJob(event: WorkflowJobEvent): any {
  // the status if was good or bad
  const conclusion = event.workflow_job.conclusion;
  const jobName = event.workflow_job.name;

  const jobUrl = event.workflow_job.html_url;
  const avatarUrl = event.sender.avatar_url;

  const payload = {
    content: "",
    embeds: [
      {
        description: "Job has started",
        url: event.workflow_job.html_url,
        color: 15439161,
        author: {
          icon_url: avatarUrl,
          name: "",
          url: jobUrl,
        },
      },
    ],
    username: "Github",
  };

  if (event.action === "in_progress" && conclusion === null) {
    payload.embeds[0].author.name = `🟠 ${jobName}`;
    payload.embeds[0].description = "Job was started";
    payload.embeds[0].color = Colors.Orange;
    return payload;
  }

  if (event.action === "completed" && conclusion === "failure") {
    payload.embeds[0].author.name = `🔴 ${jobName}`;
    payload.embeds[0].description = "Job has failed";
    payload.embeds[0].color = Colors.Red;
    payload.content = "<@378293909610037252>";

    return payload;
  }

  if (event.action === "completed" && conclusion === "success") {
    payload.embeds[0].author.name = `🟢 ${jobName}`;
    payload.embeds[0].description = "Job completed successfully";
    payload.embeds[0].color = Colors.Green;

    return payload;
  }
}

export default async function handleRoute(req: NextApiRequest, res: NextApiResponse<any>) {
  const eventType = (req.headers["x-github-event"] as string) || "unknown";

  // a stub of shared things
  const genericEvent = req.body as { action: string; repository: { name: string }; sender: { login: string } };

  if (!ALLOWED_EVENTS.includes(eventType)) {
    return res.status(420).json({ status: `event not registered - ${eventType}:${genericEvent.action}` });
  }

  // don't allow bots they are spammy
  if (genericEvent.sender.login === "dependabot[bot]") {
    return res.status(200).json({ status: "No bot events" });
  }

  // debug log
  console.log(`Receiving event from github ${eventType}:${genericEvent.action}`);

  // read data from firebase
  const webhookRefDoc = await db.ref("webhooks").get();

  // the doc from the database
  const configuredWebhooks: { [key: string]: { url: string } } = webhookRefDoc.val();
  const repo = genericEvent.repository.name.toLowerCase();

  if (configuredWebhooks[repo] === undefined) {
    return res.status(200).json({ status: "this repo is not registered for webhooks" });
  }

  // pull out the webhook url from the db
  const url = configuredWebhooks[repo].url;

  try {
    // we are getting a build status
    if (eventType === "workflow_run") {
      await sendMessageToDiscord(url, createMessageForWorkflowRun(req.body));
    } else if (eventType === "workflow_job") {
      await sendMessageToDiscord(url, createMessageForWorkflowJob(req.body));
    } else if (eventType === "issues") {
      await sendMessageToDiscord(url, createMessageForIssue(req.body));
    } else if (eventType === "issue_comment") {
      await sendMessageToDiscord(url, createMessageForIssueComment(req.body));
    }

    return res.status(200).json({ status: "ok" });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ status: `error handling webhook for ${eventType}:${genericEvent.action}` });
  }
}
