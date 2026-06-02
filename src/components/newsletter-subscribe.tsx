import { useState } from "react";

const statusStyles = {
  idle: "text-zinc-400",
  loading: "text-zinc-300",
  success: "text-emerald-400",
  error: "text-red-400",
} as const;

type Status = keyof typeof statusStyles;

export const NewsletterSubscribe = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("Get an email when I publish a new blog post.");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("Subscribing...");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const payload = (await response.json()) as {
        error?: string;
        alreadySubscribed?: boolean;
      };

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to subscribe right now.");
      }

      setStatus("success");
      setMessage(
        payload.alreadySubscribed
          ? "You are already subscribed."
          : "Subscribed! You'll hear from me on the next post.",
      );
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to subscribe right now.");
    }
  };

  return (
    <div className="mx-auto max-w-xl px-4 mt-10">
      <h2 className="text-center text-xl font-semibold mb-4">Subscribe to new posts</h2>
      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          placeholder="you@example.com"
          className="flex-1 rounded-lg border border-zinc-700 bg-[#20262D] px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="uppercase rounded-lg bg-[#20262D] px-5 py-3 text-white font-bold hover:bg-blue-600 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Sending..." : "Subscribe"}
        </button>
      </form>
      <p className={`mt-3 text-sm ${statusStyles[status]}`}>{message}</p>
    </div>
  );
};
