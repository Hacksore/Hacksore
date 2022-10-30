import type { NextApiRequest, NextApiResponse } from "next";
import got from "got";
import { GithubWorkflowRun } from "../../types/github/workflow-run";
import { GithubIssue } from "../../types/github/issue";
import { GithubIssueComment } from "../../types/github/issue-comment";
import { db } from "../../firebase";
import { GithubWorkflowJob } from "../../types/github/workflow-job";
import { CONFIG_FILES } from "next/dist/shared/lib/constants";

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

  const payload = {
    content: "",
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

  if (event.action === "created") {
    payload.content = "<@378293909610037252>";
    payload.embeds[0].fields[0].value = `Issue created by ${author}`;
    payload.embeds[0].color = 3764971;

    return payload;
  }

  if (event.action === "edited") {
    payload.content = "<@378293909610037252>";
    payload.embeds[0].fields[0].value = `Issue updated by ${author}`;
    payload.embeds[0].color = 3764971;

    return payload;
  }

  if (event.action === "closed") {
    payload.content = "<@378293909610037252>";
    payload.embeds[0].fields[0].value = `Issue closed by ${author}`;
    payload.embeds[0].color = 3764971;

    return payload;
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

function createMessageForWorkflowRun(event: GithubWorkflowRun): any {
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
    payload.embeds[0].color = 15439161;
    return payload;
  }

  if (event.action === "completed" && conclusion === "failure") {
    payload.embeds[0].author.name = `🔴 ${jobName}`;
    payload.embeds[0].description = "Run has failed";
    payload.content = "<@378293909610037252>";
    payload.embeds[0].color = 13264986;
    return payload;
  }

  if (event.action === "completed" && conclusion === "success") {
    payload.embeds[0].author.name = `🟢 ${jobName}`;
    payload.embeds[0].description = "Run completed successfully";
    payload.embeds[0].color = 6280543;
    return CONFIG_FILES;
  }
}

function createMessageForWorkflowJob(event: GithubWorkflowJob): any {
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
    payload.embeds[0].color = 15439161;
    return payload;
  }

  if (event.action === "completed" && conclusion === "failure") {
    payload.embeds[0].author.name = `🔴 ${jobName}`;
    payload.embeds[0].description = "Job has failed";
    payload.embeds[0].color = 13264986;
    payload.content = "<@378293909610037252>";

    return payload;
  }

  if (event.action === "completed" && conclusion === "success") {
    payload.embeds[0].author.name = `🟢 ${jobName}`;
    payload.embeds[0].description = "Job completed successfully";
    payload.embeds[0].color = 6280543;

    return payload;
  }
}

export default async function handleRoute(req: NextApiRequest, res: NextApiResponse<any>) {
  const eventType: any = req.headers["x-github-event"] || "unknown";

  if (!ALLOWED_EVENTS.includes(eventType)) {
    return res.status(420).json({ status: "event not registered" });
  }

  // a stub of shared things
  const genericEvent = req.body as { action: string; repository: { name: string } };

  // debug log
  console.log(`Receiving event from github ${eventType}:${genericEvent.action}`);

  // read data from firebase
  const webhookRefDoc = await db.ref("webhooks").get();

  // the doc from the database
  const configuredWebhooks: { [key: string]: { url: string } } = webhookRefDoc.val();

  const url = configuredWebhooks[genericEvent.repository.name.toLowerCase()].url;

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
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: "error handling webhook" });
  }
}
