import type { NextApiRequest, NextApiResponse } from "next";
import got from "got";

const { WEBHOOK_REPO_REACT_SKINVIEW3D = "{}", WEBHOOK_REPO_HACKSORE = "{}" } = process.env;

const WEBHOOK_MAP: Record<string, string> = {
  "react-skinview3d": WEBHOOK_REPO_REACT_SKINVIEW3D,
  hacksore: WEBHOOK_REPO_HACKSORE
};

const ALLOWED_EVENTS = ["workflow_run"];

const MESSAGE_MAP: Record<"queued" | "completed" | "failed" | "in_progress", string> = {
  queued: "⏱ Build has been queued",
  in_progress: "🛠 Build has moved to in progress",
  completed: "✅ Build has completed successfully",
  failed: "🚨 Build has failed - <@1033776947731386449> please take a look",
};

export default async function handleRoute(req: NextApiRequest, res: NextApiResponse<any>) {
  const eventType: any = req.headers["x-github-event"] || "unknown";
  const { action, repository }: { action: "queued" | "completed" | "failed" | "in_progress"; repository: any } =
    req.body;

  console.log("Getting event", eventType, action, repository);

  let body = {};

  if (!ALLOWED_EVENTS.includes(eventType)) {
    return res.status(420).json({ status: "event not registered" });
  }

  // we are getting a build status
  if (eventType === "workflow_run") {
    body = {
      content: MESSAGE_MAP[action],
    };
  }

  // set webhook to discord
  const url = WEBHOOK_MAP[repository.name];

  // replay to discord
  await got(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  }).json();

  res.status(200).json({ status: "ok" });
}
