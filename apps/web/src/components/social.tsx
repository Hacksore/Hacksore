"use client";
import { SiX, SiLinkedin, SiGithub, SiDiscord } from "@icons-pack/react-simple-icons";
import { Button } from "../components//button";
import { Email } from "./icons/email";
import { Calendar } from "./icons/calendar";
import { Blog } from "./icons/blog";
import { FaBook } from "react-icons/fa";
import Link from "next/link";

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
    url: "https://discord.gg/47DTJUTK6m",
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
    <div className="flex flex-col items-center justify-center">
      <div className="flex my-4 mb-6 sm:gap-2 gap-1 items-center justify-center">
        {SOCIALS.map((item) => (
          <a key={item.title} href={item.url} rel="noreferrer" target="_blank" aria-label={item.title} className="link">
            <Button ariaLabel={item.title}>
              <item.icon />
            </Button>
          </a>
        ))}
      </div>

      <div className="w-[220px] mb-4">
        <Link href="/guestbook">
          <div className="justify-center text-sm m-2 backdrop-blur-[8px] md:text-base group border hover:no-underline border-zinc-400/50 rounded-full p-2 px-3 sm:p-1 sm:px-2 mx-auto flex gap-2 items-center text-zinc-50 font-thin duration-300 hover:border-primary">
            <FaBook />
            <span className="semi-bold">Sign My Guestbook</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="duration-300 group-hover:translate-x-0.5 lucide lucide-chevron-right"
            >
              <title>Chevron Right</title>
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );
};
