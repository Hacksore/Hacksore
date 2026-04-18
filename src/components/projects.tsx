import { SiAstro, SiElectron, SiFirebase, SiNodedotjs, SiReact, SiRust } from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";
import { Button } from "./button";

export type ProjectStatus = "alive" | "shambles";

/** `owner`: yours. `contributor`: you help maintain or contribute elsewhere. */
export type ProjectRelationship = "owner" | "contributor";

export interface ProjectInfo {
  name: string;
  desc: string;
  repoUrl?: string;
  websiteUrl?: string;
  tech?: string[];
  status?: ProjectStatus;
  relationship?: ProjectRelationship;
  /** When `"Maintainer"`, the project is listed before others. */
  contributorRole?: string;
}

const TypescriptIcon = () => {
  return <img src="/img/typescript.svg" className="w-4 h-4" alt="TypeScript" />;
};

type IconComponent = React.ComponentType<{ className?: string; style?: React.CSSProperties }>;

const languageToIcons: Record<string, { icon: IconComponent; color: string }> = {
  typescript: { icon: TypescriptIcon, color: "#3178C6" },
  nodejs: { icon: SiNodedotjs, color: "#5FA04E" },
  nextjs: { icon: TbBrandNextjs, color: "#fff" },
  astro: { icon: SiAstro, color: "#fff" },
  electron: { icon: SiElectron, color: "#8CEAF9" },
  react: { icon: SiReact, color: "#8CEAF9" },
  rust: { icon: SiRust, color: "#fff" },
  firebase: { icon: SiFirebase, color: "#FFCB2B" },
};

const PROJECTS: ProjectInfo[] = [
  {
    name: "dotfiles",
    desc: "my dotfiles and related tools",
    repoUrl: "https://github.com/hacksore/dotfiles",
    tech: ["typescript", "lua"],
  },
  {
    name: "overlayed",
    desc: "Voice chat overlay for Discord",
    repoUrl: "https://github.com/hacksore/overlayed",
    websiteUrl: "https://overlayed.dev",
    tech: ["typescript", "rust", "react"],
  },
  {
    name: "oghunt",
    desc: "Product Hunt with ZERO AI Slop Powered By AI",
    repoUrl: "https://github.com/hacksore/oghunt",
    websiteUrl: "https://oghunt.com",
    tech: ["typescript", "nextjs", "react"],
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
    relationship: "contributor",
    contributorRole: "Maintainer",
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
    tech: ["typescript", "react", "astro"],
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
  {
    name: "TypeHero",
    desc: "TypeScript type challenges and community",
    repoUrl: "https://github.com/typehero/typehero",
    websiteUrl: "https://typehero.dev",
    tech: ["typescript", "nextjs", "react"],
    relationship: "contributor",
    contributorRole: "Maintainer",
  },
];

const renderIconsFromLanguage = (langs: string[]) =>
  langs.map((lang: string) => {
    const Element = languageToIcons[lang].icon;
    return (
      <Element key={lang} className="tech-icon" style={{ color: languageToIcons[lang].color }} />
    );
  });

const ProjectCard = ({ project }: { project: ProjectInfo }) => {
  return (
    <div className="flex flex-col p-2 w-full rounded-lg h-[200px] bg-[#0D1118] border border-[#31363E]">
      <div className="flex flex-col flex-1 min-h-0">
        <div className="px-2 pt-1">
          <div className="text-lg font-bold leading-tight">{project.name}</div>
        </div>
        <div className="p-2 pt-1 text-sm text-gray-300">{project.desc}</div>
      </div>

      <div className="flex pb-1 justify-between">
        <div className="flex ml-2 gap-2 items-center">
          {project?.tech && renderIconsFromLanguage(project.tech)}
        </div>
        <div className="flex gap-2">
          {project.repoUrl && (
            <Button
              className="text-sm h-8"
              ariaLabel="Repo"
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
            >
              Repo
            </Button>
          )}
          {project.websiteUrl && (
            <Button
              className="text-sm h-8"
              ariaLabel="Website"
              href={project.websiteUrl}
              target="_blank"
              rel="noreferrer"
            >
              Website
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

function ProjectGrid({ projects }: { projects: ProjectInfo[] }) {
  if (projects.length === 0) return null;

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {projects.map((project) => (
        <div key={project.name}>
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
}

export const Projects = () => {
  const maintainerProjects = PROJECTS.filter((p) => p.contributorRole === "Maintainer");
  const rest = PROJECTS.filter((p) => p.contributorRole !== "Maintainer");
  const orderedProjects = [...maintainerProjects, ...rest];

  return (
    <div className="pb-10">
      <ProjectGrid projects={orderedProjects} />
    </div>
  );
};
