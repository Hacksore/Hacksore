import { NextResponse } from "next/server";

import { db } from "../../../firebase-server";
import { createMessageForIssue } from "./events/new-issue";
import { createMessageForIssueComment } from "./events/new-comment";
import { createMessageForWorkflowRun } from "./events/workflow-run";
import { createMessageForWorkflowJob } from "./events/workflow-job";

// events to allow from github
const ALLOWED_EVENTS = ["ping", "workflow_run", "workflow_job", "issues", "issue_comment"];

async function sendMessageToDiscord(url: string, payload: any): Promise<any> {
  // send the message to discord
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(res => res.json());
}

export async function POST(req: Request) {
  const body = await req.json();

  const eventType = (req.headers.get("x-github-event") as string) || "unknown";

  // a stub of shared things
  const genericEvent = body as unknown as { action: string; repository: { name: string }; sender: { login: string } };

  if (!ALLOWED_EVENTS.includes(eventType)) {
    return NextResponse.json({ status: `event not registered - ${eventType}:${genericEvent.action}` });
  }

  // don't allow bots they are spammy
  if (genericEvent.sender.login === "dependabot[bot]") {
    return NextResponse.json({ status: "No bot events" });
  }

  // debug log
  console.log(`Receiving event from github ${eventType}:${genericEvent.action}`);

  // read data from firebase
  const webhookRefDoc = await db.ref("webhooks").get();

  // the doc from the database
  const configuredWebhooks: { [key: string]: { url: string } } = webhookRefDoc.val();
  const repo = genericEvent.repository.name.toLowerCase();

  if (configuredWebhooks[repo] === undefined) {
    return NextResponse.json({ status: "this repo is not registered for webhooks" });
  }

  // pull out the webhook url from the db
  const url = configuredWebhooks[repo].url;

  try {
    // we are getting a build status
    if (eventType === "workflow_run") {
      await sendMessageToDiscord(url, createMessageForWorkflowRun(body));
    } else if (eventType === "workflow_job") {
      await sendMessageToDiscord(url, createMessageForWorkflowJob(body));
    } else if (eventType === "issues") {
      await sendMessageToDiscord(url, createMessageForIssue(body));
    } else if (eventType === "issue_comment") {
      await sendMessageToDiscord(url, createMessageForIssueComment(body));
    }

    return NextResponse.json({ status: "ok" });
  } catch (err: any) {
    console.log(err.message);
    return NextResponse.json({ status: `error handling webhook for ${eventType}:${genericEvent.action}` });
  }
}
