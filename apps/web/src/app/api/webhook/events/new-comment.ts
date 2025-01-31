import { IssueCommentCreatedEvent } from "@octokit/webhooks-types";

export function createMessageForIssueComment(event: IssueCommentCreatedEvent): any {
  const description = event.comment.body;
  const issueUrl = event.issue.html_url;
  const issueTitle = event.issue.title;

  const repoName = event.repository.full_name;
  const avatarUrl = event.sender.avatar_url;

  const author = event.sender.login;

  if (event.action === "created") {
    return {
      content: "",
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
