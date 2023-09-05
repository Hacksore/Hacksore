"use client";
import { SiX, SiLinkedin, SiGithub, SiDiscord } from "@icons-pack/react-simple-icons";
import { Button } from "../components//button";
import { Email } from "./icons/email";
import { Calendar } from "./icons/calendar";
import { Blog } from "./icons/blog";

const SOCIALS = [
  {
    title: "Github",
    url: "https://github.com/hacksore",
    icon: () => <SiGithub />,
  },
  {
    title: "Linkedin",
    url: "https://www.linkedin.com/in/seanboult",
    icon: () => <SiLinkedin />,
  },
  {
    title: "X / Twitter",
    url: "https://x.com/hacksore",
    icon: () => <SiX />,
  },
  {
    title: "Discord - Hacksore",
    url: "https://discord.gg/rg9sUQ4gvb",
    icon: () => <SiDiscord />,
  },
  {
    title: "Email",
    url: "mailto:sean@boult.me",
    icon: Email,
  },
  {
    title: "Meeting",
    url: "https://cal.com/hacksore",
    icon: Calendar,
  },
  {
    title: "Blog",
    url: "https://dev.to/hacksore",
    icon: Blog,
  },
];

export const Social = () => {
  return (
    <div className="flex my-4 sm:gap-2 gap-1 items-center justify-center">
      {SOCIALS.map(item => (
        <a key={item.title} href={item.url} rel="noreferrer" target="_blank" aria-label={item.title} className="link">
          <Button>
            <item.icon />
          </Button>
        </a>
      ))}
    </div>
  );
};
