"use client";
import { GitHub, LinkedIn, Email, CalendarToday, Article, Twitter } from "@mui/icons-material";
import { SiX } from "@icons-pack/react-simple-icons";
import { Button, Grid, Tooltip, Typography } from "@mui/material";
import { lighten } from "@mui/material/styles";
import { styled } from "@mui/system";
import Link from "next/link";

const StyledGrid = styled(Grid)(({ theme }) => ({
  margin: "20px 0 28px 0",
  gap: ".75rem",
  ".link": {
    background: theme.palette.secondary.main,
    color: "#fff",
    padding: "8px 10px 6px 10px",
    height: 40,
    width: 70,
    borderRadius: ".375rem",
    display: "block",
    "&:hover": {
      background: lighten(theme.palette.primary.main, 0.1),
    },
    "& .icon": {
      width: 24,
      height: 24,
    },
  },
}));

const SOCIALS = [
  {
    title: "Github",
    url: "https://github.com/hacksore",
    icon: GitHub,
  },
  {
    title: "Linkedin",
    url: "https://www.linkedin.com/in/seanboult",
    icon: LinkedIn,
  },
  {
    title: "X / Twitter",
    url: "https://x.com/hacksore",
    icon: () => <SiX size={20} />,
  },
  {
    title: "Discord - Hacksore",
    url: "https://discord.gg/rg9sUQ4gvb",
    // eslint-disable-next-line @next/next/no-img-element
    icon: () => <img alt="discord" src="/img/discord.svg" width={24} height={24} />,
  },
  {
    title: "Email",
    url: "mailto:sean@boult.me",
    icon: Email,
  },
  {
    title: "Meeting",
    url: "https://cal.com/hacksore",
    icon: CalendarToday,
  },
  {
    title: "Blog",
    url: "https://dev.to/hacksore",
    icon: Article,
  },
];

export const Social = () => {
  return (
    <StyledGrid container justifyContent="center">
      {SOCIALS.map(item => (
        <Grid key={item.title} item>
          <Tooltip arrow title={<Typography sx={{ fontWeight: "bold" }}>{item.title}</Typography>}>
            <a href={item.url} rel="noreferrer" target="_blank" aria-label={item.title} className="link">
              <item.icon className="icon" />
            </a>
          </Tooltip>
        </Grid>
      ))}
      <Link style={{ textDecoration: "none" }} href="/guestbook">
        <Tooltip arrow title={<Typography sx={{ fontWeight: "bold" }}>Sign my Guestbook</Typography>}>
          <Button sx={{ textTransform: "lowercase" }} className="link" color="secondary" variant="contained">
            ✍️
          </Button>
        </Tooltip>
      </Link>
      <Link style={{ textDecoration: "none" }} href="/uses">
        <Tooltip arrow title={<Typography sx={{ fontWeight: "bold" }}>What I use</Typography>}>
          <Button sx={{ textTransform: "lowercase" }} className="link" color="secondary" variant="contained">
            💊
          </Button>
        </Tooltip>
      </Link>
      <Link style={{ textDecoration: "none" }} href="/keyboard">
        <Tooltip arrow title={<Typography sx={{ fontWeight: "bold" }}>My Ergo Keyboard Journey</Typography>}>
          <Button sx={{ textTransform: "lowercase" }} className="link" color="secondary" variant="contained">
            ⌨️
          </Button>
        </Tooltip>
      </Link>
    </StyledGrid>
  );
};
