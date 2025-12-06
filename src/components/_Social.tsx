import { FaBook, FaCalendar } from "react-icons/fa";
import { SiDiscord, SiGithub, SiLinkedin, SiX } from "react-icons/si";
import { Button } from "./_Button";
import { Email } from "./icons/_Email";

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
    icon: FaCalendar,
  },
  {
    title: "Blog",
    url: "https://dev.to/hacksore",
    icon: FaBook,
  },
];

export const Social = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex my-4 mb-6 sm:gap-2 gap-1 items-center justify-center">
        {SOCIALS.map((item) => (
          <a
            key={item.title}
            href={item.url}
            rel="noreferrer"
            target="_blank"
            aria-label={item.title}
            className="link"
          >
            <Button ariaLabel={item.title}>
              <item.icon />
            </Button>
          </a>
        ))}
      </div>
    </div>
  );
};
