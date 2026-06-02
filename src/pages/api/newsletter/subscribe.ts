import type { APIRoute } from "astro";
import { isEmail, subscribeToAudience } from "../../../utils/newsletter";

export const POST: APIRoute = async ({ request }) => {
  let email = "";

  try {
    const payload = (await request.json()) as { email?: string };
    email = payload.email?.trim().toLowerCase() ?? "";
  } catch {
    return Response.json({ error: "Invalid request payload." }, { status: 400 });
  }

  if (!isEmail(email)) {
    return Response.json({ error: "A valid email is required." }, { status: 400 });
  }

  try {
    const result = await subscribeToAudience(email);
    return Response.json(
      {
        ok: true,
        alreadySubscribed: result.alreadySubscribed,
      },
      { status: result.alreadySubscribed ? 200 : 201 },
    );
  } catch (error) {
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Unable to subscribe.",
      },
      { status: 500 },
    );
  }
};
