import { GitHub, LinkedIn, Email, CalendarToday, Article, Twitter } from "@mui/icons-material";
import { Grid, Tooltip, Typography } from "@mui/material";
import { lighten } from "@mui/material/styles";
import { styled } from "@mui/system";

const StyledGrid = styled(Grid)(({ theme }) => ({
  margin: "20px 0 50px 0",
  "& .link": {
    background: theme.palette.primary.main,
    color: "#fff",
    [theme.breakpoints.down("lg")]: {
      marginBottom: 16
    },
    marginLeft: 16,
    padding: "8px 10px 6px 10px",
    height: 40,
    width: 70,
    display: "block",
    "&:hover": {
      background: lighten(theme.palette.primary.main, 0.1),
    },
  },
}));

const SOCIALS = [
  {
    title: "Github",
    url: "https://github.com/hacksore",
    icon: GitHub
  },
  {
    title: "Linkedin",
    url: "https://www.linkedin.com/in/seanboult",
    icon: LinkedIn
  },
  {
    title: "Twitter",
    url: "https://twitter.com/hacksore",
    icon: Twitter
  },
  {
    title: "Discord - Hacksore#1984",
    url: "https://discord.gg/rg9sUQ4gvb",
    // eslint-disable-next-line @next/next/no-img-element
    icon: () => <img alt="discord" src="/img/discord.svg" style={{ width: 24, height: 24 }} />
  },
  {
    title: "Email",
    url: "mailto:sean@boult.me",
    icon: Email
  },
  {
    title: "Meeting",
    url: "https://cal.com/hacksore",
    icon: CalendarToday
  },
  {
    title: "Blog",
    url: "https://dev.to/hacksore",
    icon: Article
  },
]

export const Social = () => {
  return (
    <StyledGrid container justifyContent="center">
      {SOCIALS.map(item => (
        <Grid key={item.title} item>
          <Tooltip arrow title={<Typography sx={{ fontWeight: "bold" }}>{item.title}</Typography>}>
            <a href={item.url} rel="noreferrer" target="_blank" className="link">
              <item.icon />
            </a>
          </Tooltip>
        </Grid>
      ))}
     
    </StyledGrid>
  );
};
