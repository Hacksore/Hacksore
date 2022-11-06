import { Box, Button, Grid, styled, Typography } from "@mui/material";
import { IProjectInfo, ProjectStatus } from "../../types/project";
import { SiTypescript, SiRust, SiReact, SiNodedotjs, SiFirebase, SiElectron } from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";

const lanagueToIcons: Record<string, { icon: any; color: string }> = {
  typescript: { icon: SiTypescript, color: "#3178C6" },
  nodejs: { icon: SiNodedotjs, color: "#5FA04E" },
  nextjs: { icon: TbBrandNextjs, color: "#fff" },
  electron: { icon: SiElectron, color: "#8CEAF9" },
  react: { icon: SiReact, color: "#8CEAF9" },
  rust: { icon: SiRust, color: "#fff" },
  firebase: { icon: SiFirebase, color: "#FFCB2B" },
};

const StyledBox = styled(Box)(({ theme }) => ({
  // media widths
  [theme.breakpoints.up("sm")]: {
    width: "100%",
  },
  [theme.breakpoints.up("md")]: {
    width: 800,
  },
  [theme.breakpoints.up("lg")]: {
    width: 1000,
  },

  "& .root": {
    marginTop: 20,
  },
  "& .header": {
    fontWeight: "bold",
    color: "#fff",
    padding: "8px 10px 6px 12px",
    display: "flex",
    alignItems: "center",
    height: 28,
    "& .status": {
      display: "flex",
      marginLeft: 10,
    },
  },
  "& .link": {
    textDecoration: "none",
    fontWeight: "bold",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    height: 28,
  },
  "& .card": {
    margin: "0 12px 0 12px",
    border: `1px solid ${theme.palette.card.border}`,
    background: theme.palette.card.bg,
    borderRadius: 10,
    padding: 8,
    position: "relative",
  },
  "& .content": {
    padding: "4px 12px 12px 12px",
    minHeight: 120,
    textAlign: "left",
  },
  "& .bottom": {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    padding: "0 10px 10px 0",
  },
  "& .icon": {
    color: theme.palette.primary.contrastText,
  },
  "& .tech-icon": {
    width: 24,
    height: 24,
    marginRight: 8,
  },
}));

type ProjectInfo = IProjectInfo & { tech?: string[] };

const PROJECTS: ProjectInfo[] = [
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
    name: "react-skinview3d",
    desc: "React component for rendering a minecraft skin",
    repoUrl: "https://github.com/hacksore/react-skinview3d",
    websiteUrl: "https://hacksore.github.io/react-skinview3d/?path=/story/all-stories--basic",
    status: "alive",
    tech: ["typescript", "react"],
  },
  {
    name: "react-grid-select",
    desc: "React component for selecting grid regions",
    repoUrl: "https://github.com/hacksore/react-grid-select",
    websiteUrl: "https://hacksore.github.io/react-grid-select/?path=/story/region-selection--basic-example",
    status: "alive",
    tech: ["typescript", "react"],
  },
  {
    name: "overlayed",
    desc: "A discord overlay built with electron and react",
    repoUrl: "https://github.com/hacksore/overlayed",
    websiteUrl: "https://overlayed.dev",
    tech: ["typescript", "electron", "react"],
  },
  {
    name: "overlayed-rust",
    desc: "A discord overlay built with tauri and react",
    repoUrl: "https://github.com/hacksore/overlayed-rust",
    tech: ["rust", "typescript", "react"],
  },
  {
    name: "rpc-discord",
    desc: "A discord RPC library for rust",
    repoUrl: "https://github.com/hacksore/rpc-discord",
    tech: ["rust"],
  },
  {
    name: "u2f",
    desc: "A Next app that shows websites that accept hardware tokens",
    repoUrl: "https://github.com/Hacksore/u2f",
    websiteUrl: "https://u2f.vercel.app",
    tech: ["nextjs", "typescript", "react"],
  },
  {
    name: "drone-mobile",
    desc: "An unofficial nodejs API wrapper for DroneMobile",
    repoUrl: "https://github.com/hacksore/drone-mobile",
    tech: ["nodejs", "typescript"],
  },

  {
    name: "buildtray",
    desc: "Build notifications for Github",
    websiteUrl: "https://buildtray.com",
    tech: ["nodejs", "firebase", "typescript"],
  },
];

const renderIconsFromLanguage = (langs: string[]) =>
  langs.map((lang: string) => {
    const Element = lanagueToIcons[lang].icon;
    return <Element className="tech-icon" style={{ color: lanagueToIcons[lang].color }} key={lang} />;
  });

const STATUS_COLOR = {
  alive: "#3a8230",
  shambles: "#aa262f",
};

const StatusBadge = ({ status }: { status: ProjectStatus }) => {
  const color = STATUS_COLOR[status];
  return <Box sx={{ fontSize: 12, padding: "2px 12px 2px 12px", background: color, borderRadius: 8 }}>{status}</Box>;
};

const ProjectCard = ({ project }: { project: ProjectInfo }) => {
  return (
    <div className="card">
      <div className="header">
        <Typography sx={{ fontWeight: "bold" }}>{project.name}</Typography>

        {project.status && (
          <div className="status">
            <StatusBadge status={project.status} />
          </div>
        )}
      </div>
      <div className="content">
        <div className="desc">{project.desc}</div>

        <Box sx={{ mt: 1, mb: 1 }}>{project?.tech && renderIconsFromLanguage(project.tech)}</Box>

        <div className="bottom">
          <>
            {project.repoUrl && (
              <Button
                color="secondary"
                href={project.repoUrl}
                className="link"
                variant="contained"
                rel="noreferrer"
                target="_blank"
              >
                Repo
              </Button>
            )}
            {project.websiteUrl && (
              <Button
                sx={{ ml: 1 }}
                href={project.websiteUrl}
                className="link"
                variant="contained"
                color="secondary"
                rel="noreferrer"
                target="_blank"
              >
                Website
              </Button>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export const Projects = () => {
  return (
    <StyledBox>
      <Grid container rowSpacing={4} spacing={1}>
        {PROJECTS.map((project: ProjectInfo) => (
          <Grid key={project.name} item xs={12} md={6} lg={6}>
            <ProjectCard project={project} />
          </Grid>
        ))}
      </Grid>
    </StyledBox>
  );
};
