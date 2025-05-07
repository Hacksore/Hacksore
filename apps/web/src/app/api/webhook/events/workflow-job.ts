import { Colors } from "@boult/api";
import type { WorkflowJobEvent } from "@octokit/webhooks-types";

export function createMessageForWorkflowJob(event: WorkflowJobEvent): any {
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
