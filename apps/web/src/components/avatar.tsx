"use client";
import { PresenceStatus } from "@boult/types";
import Image from "next/image";

export const STATE_COLORS = {
  online: "bg-discord-online",
  offline: "bg-discord-offline",
  invisible: "bg-discord-offline",
  idle: "bg-discord-idle",
  dnd: "bg-discord-dnd",
} as const;

export const Avatar = ({ url, status }: { url: string; status: PresenceStatus }) => (
  <div className="relative">
    <Image className="rounded-full" alt="avatar" src={url} width={96} height={96} />
    <div className={`absolute bottom-0 w-5 h-5 right-0 border-4 border-black ${STATE_COLORS[status]} rounded-full`} />
  </div>
);
