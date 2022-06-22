import { Box, Button, Grid, lighten, styled } from "@mui/material";
import { IProjectInfo } from "../types/project";

const StyledBox = styled(Box)(({ theme }) => ({
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
  },
  "& .link": {
    textDecoration: "none",
    fontWeight: "bold",
    color: "#fff",
    padding: "8px 10px 6px 10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    height: 28,
    "&:hover": {
      background: lighten(theme.palette.primary.main, 0.3),
    }
  },
  "& .card": {
    margin: "0 12px 0 12px",
    position: "relative",
  },
  "& .content": {
    padding: 12,
    minHeight: 120,
    textAlign: "left",
    border: "1px solid #000",
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
    repoUrl: "https://overlayed.dev",
    websiteUrl: "https://overlayed.dev",
    status: "alive",
  },
];

const ProjectCard = ({ project }: { project: IProjectInfo } ) => {
  return (
    <div className="card">
      <div className="header">{project.name}</div>
      <div className="content">
        <div className="desc">{project.desc}</div>
        <div className="bottom">
          <Button href={project.repoUrl} className="link" variant="contained" rel="noreferrer" target="_blank">
            Repo
          </Button>
          {project.websiteUrl && (
            <Button sx={{ ml: 1 }} href={project.websiteUrl} className="link" variant="contained" rel="noreferrer" target="_blank">
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
      <Grid container spacing={2}>
        {PROJECTS.map((project: IProjectInfo) => (
          <Grid key={project.name} item xs={12} md={4} lg={4}>
            <ProjectCard project={project} />
          </Grid>
        ))}
      </Grid>
    </StyledBox>
  );
};
