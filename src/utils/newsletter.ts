import { DEVTO_TOKEN, NEWSLETTER_FROM_EMAIL, RESEND_API_KEY, RESEND_AUDIENCE_ID } from "astro:env/server";
import { renderNewPostEmail } from "../components/emails/new-post-email";

const FOREM_URL = "https://dev.to/api/articles/me/published?per_page=1";
const RESEND_URL = "https://api.resend.com";

export type ForemArticle = {
  id: number;
  title: string;
  description: string;
  url: string;
  cover_image: string | null;
  published_at: string;
};

type ResendContact = {
  email: string;
};

export const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const subscribeToAudience = async (email: string) => {
  if (!RESEND_API_KEY || !RESEND_AUDIENCE_ID) {
    throw new Error("Newsletter provider is not configured.");
  }

  const response = await fetch(`${RESEND_URL}/audiences/${RESEND_AUDIENCE_ID}/contacts`, {
    method: "POST",
    headers: {
      Authorization: ["Bearer", RESEND_API_KEY].join(" "),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (response.ok) {
    return { alreadySubscribed: false };
  }

  if (response.status === 409) {
    return { alreadySubscribed: true };
  }

  const message = await safeResendMessage(response);
  throw new Error(message ?? "Unable to subscribe email.");
};

export const getLatestPublishedArticle = async () => {
  const response = await fetch(FOREM_URL, {
    headers: {
      "api-key": DEVTO_TOKEN,
    },
  });

  if (!response.ok) {
    throw new Error("Unable to fetch latest article from Forem.");
  }

  const posts = (await response.json()) as ForemArticle[];
  return posts[0] ?? null;
};

export const sendLatestPostToSubscribers = async (article: ForemArticle) => {
  if (!RESEND_API_KEY || !RESEND_AUDIENCE_ID) {
    throw new Error("Newsletter provider is not configured.");
  }

  const contacts = await listAudienceContacts();

  if (contacts.length === 0) {
    return { sent: false, recipients: 0 };
  }

  const response = await fetch(`${RESEND_URL}/emails`, {
    method: "POST",
    headers: {
      Authorization: ["Bearer", RESEND_API_KEY].join(" "),
      "Content-Type": "application/json",
      "Idempotency-Key": `newsletter-${article.id}`,
    },
    body: JSON.stringify({
      from: NEWSLETTER_FROM_EMAIL ?? "newsletter@hacksore.com",
      to: NEWSLETTER_FROM_EMAIL ?? "newsletter@hacksore.com",
      bcc: contacts.map((contact) => contact.email),
      subject: `New post: ${article.title}`,
      html: renderNewPostEmail(article),
    }),
  });

  if (!response.ok) {
    const message = await safeResendMessage(response);
    throw new Error(message ?? "Unable to send newsletter email.");
  }

  return {
    sent: true,
    recipients: contacts.length,
  };
};

const listAudienceContacts = async () => {
  const response = await fetch(`${RESEND_URL}/audiences/${RESEND_AUDIENCE_ID}/contacts`, {
    headers: {
      Authorization: ["Bearer", RESEND_API_KEY].join(" "),
    },
  });

  if (!response.ok) {
    const message = await safeResendMessage(response);
    throw new Error(message ?? "Unable to fetch newsletter subscribers.");
  }

  const payload = (await response.json()) as { data?: ResendContact[] };
  return payload.data ?? [];
};

const safeResendMessage = async (response: Response) => {
  try {
    const payload = (await response.json()) as {
      message?: string;
      error?: { message?: string };
    };
    return payload.error?.message ?? payload.message;
  } catch {
    return undefined;
  }
};
