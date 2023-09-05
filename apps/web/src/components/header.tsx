"use client";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="flex justify-between">
      <div>
        <Link href="/">Home</Link>
      </div>
      <div className="pb-4 flex gap-1.5 sm:gap-4">
        <Link style={{ textDecoration: "none" }} href="/uses">
          Uses
        </Link>
        <Link style={{ textDecoration: "none" }} href="/guestbook">
          Guestbook
        </Link>
        <Link style={{ textDecoration: "none" }} href="/keyboard">
          Keyboard
        </Link>
      </div>
    </div>
  );
};
