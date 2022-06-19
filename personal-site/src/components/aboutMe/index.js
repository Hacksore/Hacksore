import { useEffect, useState } from "react";
import { Box, styled, Typography } from "@mui/material";

const STATE_COLORS = {
  online: "#90ce5c",
  idle: "#f2b34d",
  dnd: "#d33f3f",
  unknown: "rgba(0, 0, 0, 0)",
};

const StyledBox = styled(Box)(({ theme }) => ({
  "& .header": {
    [theme.breakpoints.up("lg")]: {
      fontSize: 100,
    },
    [theme.breakpoints.down("lg")]: {
      fontSize: 50,
    },
    fontWeight: "bold",
  },
  "& .subtitle": {
    fontSize: 60,
    fontWeight: "bold",
  },
  "& .image-wrap": {
    width: 100,
    height: 100,
    marginRight: 26,
    position: "relative",
  },
  "& .avatar": {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  "& .name": {
    [theme.breakpoints.down("lg")]: {
      flexDirection: "column",
    },
    display: "flex",
    alignItems: "center",
  },
  "& .indicator": {
    width: 30,
    height: 30,
    borderRadius: 20,
    position: "absolute",
    bottom: 0,
    right: 0,
  },
}));

export const AboutMe = () => {
  const [profileData, setProfileData] = useState({ status: "online", avatarUrl: "" });

  useEffect(() => {
    fetchPresence();
  }, []);

  const fetchPresence = () => {
    fetch("/presence")
      .then(res => res.json())
      .then(res => setProfileData(res));
  };

  return (
    <StyledBox>
      <div className="about-wrap">
        <div className="name">
          <div className="image-wrap">
            <img className="avatar" src={profileData.avatarUrl} data-testid="avatar" alt="Me in real life" />

            <div
              className="indicator"
              style={{
                background: STATE_COLORS[profileData.status],
              }}
            />
          </div>
          <Typography className="header">Sean Boult</Typography>
        </div>
      </div>
    </StyledBox>
  );
};
