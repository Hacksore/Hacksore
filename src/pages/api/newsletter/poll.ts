import { NEWSLETTER_CRON_SECRET } from "astro:env/server";
import type { APIRoute } from "astro";
import { getLatestPublishedArticle, sendLatestPostToSubscribers } from "../../../utils/newsletter";

const bearerPrefix = "Bearer ";

export const GET: APIRoute = async ({ request }) => {
  if (NEWSLETTER_CRON_SECRET) {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.startsWith(bearerPrefix) ? authHeader.slice(bearerPrefix.length) : "";

    if (token !== NEWSLETTER_CRON_SECRET) {
      return Response.json({ error: "Unauthorized." }, { status: 401 });
    }
  }

  try {
    const latestArticle = await getLatestPublishedArticle();

    if (!latestArticle) {
      return Response.json({ ok: true, sent: false, reason: "No articles found." }, { status: 200 });
    }

    const result = await sendLatestPostToSubscribers(latestArticle);
    return Response.json(
      {
        ok: true,
        sent: result.sent,
        recipients: result.recipients,
        articleId: latestArticle.id,
      },
      { status: 200 },
    );
  } catch (error) {
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Unable to process newsletter poll.",
      },
      { status: 500 },
    );
  }
};
