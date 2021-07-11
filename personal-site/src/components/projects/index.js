import { darken, Grid, lighten, makeStyles } from "@material-ui/core";
import ExternalIcon from "@material-ui/icons/Launch";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
  },
  header: {
    fontWeight: "bold",
    background: lighten(theme.palette.primary.main, 0.1),
    color: "#fff",
    padding: "8px 10px 6px 10px",
    display: "flex",
    alignItems: "center",
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
    background: darken(theme.palette.background.default, 0.05),
    minHeight: 120,
    margin: "0 12px 0 12px",
    position: "relative",
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
    name: "drone-mobile",
    desc: "An unofficial nodejs API wrapper for DroneMobile",
    url: "https://github.com/Hacksore/drone-mobile",
    status: "alive",
  },
  {
    name: "react-grid-select",
    desc: "A grid selection component",
    url: "https://github.com/Hacksore/react-grid-select",
    status: "alive",
  },
  {
    name: "garage-plate-detection",
    desc: "openalpr license plate detection",
    url: "https://github.com/Hacksore/garage-plate-detection",
    status: "alive",
  },
  {
    name: "nftbb.io",
    desc: "Showcase your NFT's",
    url: "https://nftbb.io",
    status: "alive",
  },
  {
    name: "streampoll.me",
    desc: "twitch.tv contests and polls",
    url: "https://streampoll.me/",
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
          <Grid item xs={12} md={4} lg={4}>
            <ProjectCard key={project.name} project={project} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
