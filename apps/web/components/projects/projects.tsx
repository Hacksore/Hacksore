import { Box, Button, Grid, styled, Tooltip, Typography } from "@mui/material";
import { IProjectInfo, ProjectStatus } from "../../types/project";

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
    padding: "8px 10px 6px 10px",
    display: "flex",
    alignItems: "center",
    height: 28,
    "& .status": {
      display: "flex",
      width: "100%",
      flexDirection: "row-reverse",
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
    border: `2px solid ${theme.palette.card.border}`,
    borderRadius: 10,
    background: theme.palette.card.bg,
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
}));

const PROJECTS = [
  {
    name: "bluelinky",
    desc: "An unofficial nodejs API wrapper for Hyundai bluelink",
    repoUrl: "https://github.com/Hacksore/bluelinky",
    websiteUrl: "https://bluelinky.readme.io",
    status: "alive",
  },
  {
    name: "skinview3d",
    desc: "Three.js powered Minecraft skin viewer",
    repoUrl: "https://github.com/bs-community/skinview3d",
    websiteUrl: "https://bs-community.github.io/skinview3d/",
    status: "alive",
  },
  {
    name: "overlayed",
    desc: "A discord overlay built with electron and react",
    repoUrl: "https://github.com/hacksore/overlayed",
    websiteUrl: "https://overlayed.dev",
    status: "shambles",
  },
  {
    name: "overlayed-rust",
    desc: "A discord overlay built with tauri and react",
    repoUrl: "https://github.com/hacksore/overlayed-rust",
    status: "shambles",
  },
  {
    name: "rpc-discord",
    desc: "A discord RPC library for rust",
    repoUrl: "https://github.com/hacksore/rpc-discord",
    status: "shambles",
  },
  {
    name: "u2f",
    desc: "A Next app that shows websites that accept hardware tokens",
    repoUrl: "https://github.com/Hacksore/u2f",
    websiteUrl: "https://u2f.vercel.app",
    status: "shambles",
  },
  {
    name: "drone-mobile",
    desc: "An unofficial nodejs API wrapper for DroneMobile",
    repoUrl: "https://github.com/hacksore/drone-mobile",
    status: "alive",
  },
  {
    name: "react-grid-select",
    desc: "React component for selecting grid regions",
    repoUrl: "https://github.com/hacksore/react-grid-select",
    websiteUrl: "https://hacksore.github.io/react-grid-select/?path=/story/region-selection--basic-example",
    status: "alive",
  },
  {
    name: "buildtray",
    desc: "Build notifications for Github",
    websiteUrl: "https://buildtray.com",
    status: "shambles",
  },
];

const STATUS_COLOR = {
  alive: "green",
  dead: "red",
  shambles: "orange",
};

// TODO: impl
// eslint-disable-next-line no-unused-vars
const StatusBadge = ({ status }: { status: ProjectStatus }) => {
  const color = STATUS_COLOR[status];
  return (
    <Tooltip title={status}>
      <Box sx={{ width: 16, height: 16, background: color, borderRadius: 8 }} />
    </Tooltip>
  );
};

const ProjectCard = ({ project }: { project: IProjectInfo }) => {
  return (
    <div className="card">
      <div className="header">
        <Typography sx={{ fontWeight: "bold" }}>{project.name}</Typography>

        {/* <div className="status">
          <StatusBadge status={project.status} />
        </div> */}
      </div>
      <div className="content">
        <div className="desc">{project.desc}</div>
        <div className="bottom">
          {project.repoUrl && (
            <Button
              color="secondary"
              href={project.repoUrl}
              className="link"
              variant="contained"
              rel="noreferrer"
              target="_blank"
              title="Project repo"
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
              title="Project website"
            >
              Website
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export const Projects = () => {
  return (
    <StyledBox>
      <Grid container rowSpacing={4} spacing={1}>
        {PROJECTS.map((project: IProjectInfo) => (
          <Grid key={project.name} item xs={12} md={4} lg={4}>
            <ProjectCard project={project} />
          </Grid>
        ))}
      </Grid>
    </StyledBox>
  );
};
