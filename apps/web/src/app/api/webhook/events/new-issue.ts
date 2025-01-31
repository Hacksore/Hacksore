import { IssuesEvent } from "@octokit/webhooks-types";
import { Colors } from "@boult/api";
import { DISCORD_ID } from "../constants";

export function createMessageForIssue(event: IssuesEvent): any {
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
    payload.content = author !== "Hacksore" ? `<@${DISCORD_ID}>` : "";
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
