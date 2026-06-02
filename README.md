> [!WARNING]
> im the hdr guy

<img width="800" height="450" alt="flashbang-meme" src="https://github.com/user-attachments/assets/36086687-bed3-459a-a22c-186ddedf231a" />

## Newsletter subscribe (Forem + Resend)

- `POST /api/newsletter/subscribe`
  - Adds an email to a Resend audience.
  - Used by the homepage subscribe form.
- `GET /api/newsletter/poll`
  - Polls Forem (`/api/articles/me/published?per_page=1`) for the latest post.
  - Sends a newsletter email to all audience contacts using an idempotency key (`newsletter-{articleId}`) to avoid duplicate sends when polled repeatedly.
  - Optionally secured with `NEWSLETTER_CRON_SECRET` via an `authorization` bearer token.

### Required environment

- `DEVTO_TOKEN`
- `RESEND_API_KEY`
- `RESEND_AUDIENCE_ID`
- `NEWSLETTER_FROM_EMAIL` (optional, defaults to `newsletter@hacksore.com`)
- `NEWSLETTER_CRON_SECRET` (optional but recommended for poll endpoint)

### Suggested scheduler

- Configure a Vercel Cron (or external scheduler) to call `/api/newsletter/poll` every 15-30 minutes.
