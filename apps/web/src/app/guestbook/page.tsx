import type { Metadata } from "next";
import { GuestBook as ClientGuestBook } from "./guestbook.client";

const META_INFO = {
  title: "Guestbook",
  description: "My guestbook powered by giscus",
};

export const metadata: Metadata = {
  title: META_INFO.title,
  description: META_INFO.description,
  openGraph: {
    title: META_INFO.title,
    description: META_INFO.description,
    images: ["/img/guestbook.png"],
    type: "website",
  },
  twitter: {
    title: META_INFO.title,
    description: META_INFO.description,
    images: ["/img/guestbook.png"],
    card: "summary_large_image",
  },
};

export default function GuestBook() {
  return (
    <div>
      <ClientGuestBook />
    </div>
  );
}
