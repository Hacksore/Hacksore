"use client";
import { SiX } from "@icons-pack/react-simple-icons";
import Link from "next/link";
import { Button } from "../dumb/button";

const SOCIALS = [
  {
    title: "Github",
    url: "https://github.com/hacksore",
    icon: () => <img alt="discord" src="/img/discord.svg" width={24} height={24} />,
  },
  {
    title: "Linkedin",
    url: "https://www.linkedin.com/in/seanboult",
    icon: () => <img alt="discord" src="/img/discord.svg" width={24} height={24} />,
  },
  {
    title: "X / Twitter",
    url: "https://x.com/hacksore",
    icon: () => <SiX size={20} />,
  },
  {
    title: "Discord - Hacksore",
    url: "https://discord.gg/rg9sUQ4gvb",
    // eslint-disable-next-line @next/next/no-img-element
    icon: () => <img alt="discord" src="/img/discord.svg" width={24} height={24} />,
  },
  {
    title: "Email",
    url: "mailto:sean@boult.me",
    icon: () => <img alt="discord" src="/img/discord.svg" width={24} height={24} />,
  },
  {
    title: "Meeting",
    url: "https://cal.com/hacksore",
    icon: () => <img alt="discord" src="/img/discord.svg" width={24} height={24} />,
  },
  {
    title: "Blog",
    url: "https://dev.to/hacksore",
    icon: () => <img alt="discord" src="/img/discord.svg" width={24} height={24} />,
  },
];

export const Social = () => {
  return (
    <div className="flex items-center justify-center">
      {SOCIALS.map(item => (
        <a href={item.url} rel="noreferrer" target="_blank" aria-label={item.title} className="link">
          <item.icon className="icon" />
        </a>
      ))}
      <Link style={{ textDecoration: "none" }} href="/guestbook">
        <Button sx={{ textTransform: "lowercase" }} className="link" color="secondary" variant="contained">
          ✍️
        </Button>
      </Link>
      <Link style={{ textDecoration: "none" }} href="/uses">
        <Button sx={{ textTransform: "lowercase" }} className="link" color="secondary" variant="contained">
          💊
        </Button>
      </Link>
      <Link style={{ textDecoration: "none" }} href="/keyboard">
        <Button sx={{ textTransform: "lowercase" }} className="link" color="secondary" variant="contained">
          ⌨️
        </Button>
      </Link>
    </div>
  );
};
