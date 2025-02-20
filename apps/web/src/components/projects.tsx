"use client";

import { SiRust, SiReact, SiNodedotjs, SiFirebase, SiElectron } from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";
import { IProjectInfo } from "../types/project";
import { Button } from "../components/button";

const TypescriptIcon = () => {
  return <img src="/img/typescript.svg" className="w-4 h-4" />;
};

const languageToIcons: Record<string, { icon: any; color: string }> = {
  typescript: { icon: TypescriptIcon, color: "#3178C6" },
  nodejs: { icon: SiNodedotjs, color: "#5FA04E" },
  nextjs: { icon: TbBrandNextjs, color: "#fff" },
  electron: { icon: SiElectron, color: "#8CEAF9" },
  react: { icon: SiReact, color: "#8CEAF9" },
  rust: { icon: SiRust, color: "#fff" },
  firebase: { icon: SiFirebase, color: "#FFCB2B" },
};

type ProjectInfo = IProjectInfo & { tech?: string[] };

const PROJECTS: ProjectInfo[] = [
  {
    name: "overlayed",
    desc: "Voice chat overlay for Discord",
    repoUrl: "https://github.com/hacksore/overlayed",
    websiteUrl: "https://overlayed.dev",
    tech: ["typescript", "rust", "react"],
  },
  {
    name: "bluelinky",
    desc: "An unofficial nodejs API wrapper for Hyundai bluelink",
    repoUrl: "https://github.com/Hacksore/bluelinky",
    websiteUrl: "https://bluelinky.readme.io",
    status: "alive",
    tech: ["nodejs", "typescript"],
  },
  {
    name: "skinview3d",
    desc: "Three.js powered Minecraft skin viewer",
    repoUrl: "https://github.com/bs-community/skinview3d",
    websiteUrl: "https://bs-community.github.io/skinview3d/",
    status: "alive",
    tech: ["typescript"],
  },
  {
    name: "vercel.lol",
    desc: "vercel meme",
    repoUrl: "https://github.com/Hacksore/vercel.lol",
    websiteUrl: "https://vercel.lol",
    tech: ["nextjs", "typescript", "react"],
  },
  {
    name: "react-skinview3d",
    desc: "React component for rendering Minecraft skins",
    repoUrl: "https://github.com/hacksore/react-skinview3d",
    websiteUrl: "https://hacksore.github.io/react-skinview3d/?path=/story/all-stories--basic",
    status: "alive",
    tech: ["typescript", "react"],
  },
  {
    name: "Hacksore",
    desc: "The site you are currently viewing",
    repoUrl: "https://github.com/hacksore/hacksore",
    websiteUrl: "https://boult.me",
    status: "alive",
    tech: ["typescript", "react", "firebase", "nextjs"],
  },
  {
    name: "opx",
    desc: "Enhance 1Password secret expansion with the opx CLI",
    repoUrl: "https://github.com/Hacksore/onepassword-secret-util",
    websiteUrl: "https://tryopx.com",
    tech: ["rust"],
  },
  {
    name: "buildtray",
    desc: "Build notifications for Github",
    websiteUrl: "https://buildtray.com",
    repoUrl: "https://github.com/Hacksore/buildtray",
    tech: ["nodejs", "firebase", "react", "typescript"],
  },
];

const renderIconsFromLanguage = (langs: string[]) =>
  langs.map((lang: string) => {
    const Element = languageToIcons[lang].icon;
    return <Element key={lang} className="tech-icon" style={{ color: languageToIcons[lang].color }} />;
  });

const ProjectCard = ({ project }: { project: ProjectInfo }) => {
  return (
    <div className="flex flex-col p-2 w-full rounded-lg h-[200px] bg-card-bg border border-card-border">
      <div className="flex flex-col flex-1">
        <div className="text-lg p-2 pt-1 font-bold">{project.name}</div>
        <div className="p-2">{project.desc}</div>
      </div>

      <div className="flex pb-1 justify-between">
        <div className="flex ml-2 gap-2 items-center">{project?.tech && renderIconsFromLanguage(project.tech)}</div>
        <div className="flex gap-2">
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noreferrer">
              <Button className="text-sm h-8" ariaLabel="Repo">
                Repo
              </Button>
            </a>
          )}
          {project.websiteUrl && (
            <a href={project.websiteUrl} target="_blank" rel="noreferrer">
              <Button className="text-sm h-8" ariaLabel="Website">
                Website
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export const Projects = () => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {PROJECTS.map((project: ProjectInfo) => (
        <div key={project.name}>
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
};
