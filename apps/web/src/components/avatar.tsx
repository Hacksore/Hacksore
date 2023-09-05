"use client";
import Image from "next/image";

export const STATE_COLORS = {
  online: "border-discord-online",
  offline: "border-discord-offline",
  invisible: "border-discord-offline",
  idle: "border-discord-idle",
  dnd: "border-discord-dnd",
};

export const Avatar = ({ url, status }: { url: string; status: string }) => {
  return (
    <div>
      <Image
        className={`border-4 ${STATE_COLORS[status]} rounded-full`}
        alt="avatar"
        src={url}
        width={96}
        height={96}
      />
    </div>
  );
};
