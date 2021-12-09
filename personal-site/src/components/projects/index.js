import { darken, Grid, lighten, makeStyles } from "@material-ui/core";
import ExternalIcon from "@material-ui/icons/Launch";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
  },
  header: {
    fontWeight: "bold",
    background: theme.palette.primary.main,
    color: "#fff",
    padding: "8px 10px 6px 10px",
    display: "flex",
    alignItems: "center",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 28,
  },
  link: {
    textDecoration: "none",
    fontWeight: "bold",
    color: "#fff",
    padding: "8px 10px 6px 10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    borderBottom: "4px solid rgba(0, 0, 0, 0)",
    height: 28,
  },
  card: {
    background: darken(theme.palette.background.default, 0.1),
    minHeight: 120,
    margin: "0 12px 0 12px",
    position: "relative",
    borderRadius: 8,
  },
  content: {
    padding: 12,
    textAlign: "left",
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: "2px 0 2px 0"
  },
  icon: {
    color: theme.palette.primary.contrastText,
  },
}));

const PROJECTS = [
  {
    name: "bluelinky",
    desc: "An unofficial nodejs API wrapper for Hyundai bluelink",
    url: "https://github.com/Hacksore/bluelinky",
    status: "alive",
  },
  {
    name: "skinview3d",
    desc: "Three.js powered Minecraft skin viewer",
    url: "https://github.com/bs-community/skinview3d",
    status: "alive",
  },
  {
    name: "overlayed",
    desc: "A discord overlay built with electron and react",
    url: "https://overlayed.dev",
    status: "alive",
  },
];

const ProjectCard = ({ project }) => {
  const classes = useStyles();

  return (
    <div className={classes.card}>
      <div className={classes.header}>{project.name}</div>
      <div className={classes.content}>
        <div className={classes.desc}>{project.desc}</div>
      </div>
      <div className={classes.bottom}>
        <a
          href={project.url}
          className={classes.link}
          rel="noreferrer"
          target="_blank"
        >
          <ExternalIcon classes={{ root: classes.icon }} />
        </a>
      </div>
    </div>
  );
};

export const Projects = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {PROJECTS.map((project) => (
          <Grid key={project.name} item xs={12} md={4} lg={4}>
            <ProjectCard project={project} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
