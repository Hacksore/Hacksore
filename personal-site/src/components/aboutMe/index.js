import { Typography } from "@material-ui/core";

const STATE = {
  online: "#90ce5c",
  away: "#f2b34d",
  dnd: "#d33f3f"
}

export const AboutMe = () => {
  const currentState = STATE.online;

  return <>
    <img style={{ border: `6px solid ${currentState}`, borderRadius: '50%' }} width="256" id="profile-pic" src="me_irl.png" alt="Me in real life" />

    <div className="about-wrap">
      <Typography variant="h4">Sean Boult</Typography>
      <Typography variant="body2">I like to build things 🛠️</Typography>
    </div>
  </>
}
