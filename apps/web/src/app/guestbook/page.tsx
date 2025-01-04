import { Metadata } from "next";
import { GuestBook as ClientGuestBook } from "./guestbook.client";

export const metadata: Metadata = {
  title: "Guestbook",
  description: "My guestbook powered by giscus",
};

export default function GuestBook() {
  return (
    <div>
      <ClientGuestBook />
    </div>
  );
}
