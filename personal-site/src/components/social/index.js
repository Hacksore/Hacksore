import { GitHub, LinkedIn, Email, CalendarToday, Article } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { lighten } from "@mui/material/styles";
import { styled } from "@mui/system";

const StyledGrid = styled(Grid)(({ theme }) => ({
  margin: "40px 0 50px 0",
  "& .link": {
    background: theme.palette.primary.main,
    color: "#fff",
    padding: "8px 10px 6px 10px",
    margin: "4px 8px 4px 8px",
    height: 40,
    width: 70,
    display: "block",
    "&:hover": {
      background: lighten(theme.palette.primary.main, 0.3),
      borderBottom: lighten(theme.palette.primary.main, 0.1),
    },
  },
}));

export const Social = () => {

  return (
    <StyledGrid container justifyContent="center">
      <Grid item>
        <a
          title="My Github"
          href="https://github.com/Hacksore"
          rel="noreferrer"
          target="_blank"
          className="link"
        >
          <GitHub />
        </a>
      </Grid>
      <Grid item>
        <a
          title="My Linkedin"
          href="https://www.linkedin.com/in/seanboult"
          rel="noreferrer"
          target="_blank"
          className="link"
        >
          <LinkedIn />
        </a>
      </Grid>
      <Grid item>
        <a
          title="My Discord"
          href="https://discordapp.com/users/378293909610037252"
          rel="noreferrer"
          target="_blank"
          className="link"
        >
          <img alt="discord" src="/discord.svg" style={{ width: 24, height: 24 }} />
        </a>
      </Grid>
      <Grid item>
        <a
          title="My Email"
          href="mailto:sean@boult.me"
          rel="noreferrer"
          target="_blank"
          className="link"
        >
          <Email />
        </a>
      </Grid>
      <Grid item>
        <a
          title="Schudle a meeting"
          href="https://cal.com/hacksore"
          rel="noreferrer"
          target="_blank"
          className="link"
        >
          <CalendarToday />
        </a>
      </Grid>
      <Grid item>
        <a
          title="My blog posts"
          href="https://dev.to/hacksore"
          rel="noreferrer"
          target="_blank"
          className="link"
        >
          <Article />
        </a>
      </Grid>

    </StyledGrid>
  );
};
