import { Box, Button, Chip, Grid, lighten, styled, Typography } from "@mui/material";
import { IProjectInfo } from "../../types/project";

const StyledBox = styled(Box)(({ theme }) => ({
  // media widths
  [theme.breakpoints.up("sm")]: {
    width: "80%",
  },
  [theme.breakpoints.up("md")]: {
    width: 800
  },
  [theme.breakpoints.up("lg")]: {
    width: 1000
  },

  "& .root": {
    marginTop: 20,
  },
  "& .header": {
    fontWeight: "bold",
    background: theme.palette.primary.main,
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
    "&:hover": {
      background: lighten(theme.palette.primary.main, 0.1),
    },
  },
  "& .card": {
    margin: "0 12px 0 12px",
    position: "relative",
  },
  "& .content": {
    padding: 12,
    minHeight: 120,
    textAlign: "left",
    borderLeft: `1px solid ${theme.palette.primary.main}`,
    borderRight: `1px solid ${theme.palette.primary.main}`,
    borderBottom: `1px solid ${theme.palette.primary.main}`,
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
    status: "alive",
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
    status: "dead",
  },
];

const StatusBadge = ({ status }: { status: string }) => {
  if (status === "alive") {
    return <Chip size="small" sx={{ background: "#59bc2f", color: "#000000" }} label="alive" />;
  }
  if (status === "dead") {
    return <Chip size="small" sx={{ background: "red" }} label="dead" />;
  }

  return null;
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
            <Button href={project.repoUrl} className="link" variant="contained" rel="noreferrer" target="_blank">
              Repo
            </Button>
          )}
          {project.websiteUrl && (
            <Button
              sx={{ ml: 1 }}
              href={project.websiteUrl}
              className="link"
              variant="contained"
              rel="noreferrer"
              target="_blank"
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
