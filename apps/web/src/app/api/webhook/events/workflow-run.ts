import { Colors } from "@boult/api";
import { WorkflowRunEvent } from "@octokit/webhooks-types";
import { DISCORD_ID } from "../constants";

export function createMessageForWorkflowRun(event: WorkflowRunEvent): any {
  // the status if was good or bad
  const conclusion = event.workflow_run.conclusion;
  const jobName = event.workflow_run.name;

  const commitMessage = event.workflow_run.head_commit.message;
  const commitAuthor = event.workflow_run.head_commit.author.name;

  const repoName = event.repository.name;
  const branchName = event.workflow_run.head_branch;
  const jobUrl = event.workflow_run.html_url;
  const timestamp = `<t:${new Date(event.workflow_run.created_at).getTime()}:R>`;
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
  }

  if (event.action === "completed" && conclusion === "failure") {
    payload.content = `<@${DISCORD_ID}>`;
    payload.embeds[0].author.name = `🔴 ${jobName}`;
    payload.embeds[0].description = "Run has failed";
    payload.embeds[0].color = Colors.Red;
  }

  if (event.action === "completed" && conclusion === "success") {
    payload.embeds[0].author.name = `🟢 ${jobName}`;
    payload.embeds[0].description = "Run completed successfully";
    payload.embeds[0].color = Colors.Green;
  }

  if (event.action === "completed" && conclusion === "cancelled") {
    payload.embeds[0].author.name = `⚪ ${jobName}`;
    payload.embeds[0].description = "Run was cancelled";
    payload.embeds[0].color = Colors.Gray;
  }

  // add the job url
  payload.embeds[0].description += `\n\n** [🔗 click here for the job details](${jobUrl})**\n\n`;
  payload.embeds[0].description += `⏱️ ${timestamp}`;

  return payload;
}
