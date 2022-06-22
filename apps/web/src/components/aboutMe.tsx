import { useEffect, useState } from "react";
import { Box, Skeleton, styled, Typography } from "@mui/material";
import Presence from "./presence";
import Avatar from "./avatar";

const DISCORD_AVATAR_CDN = "https://cdn.discordapp.com/avatars";

const STATE_COLORS = {
  online: "#90ce5c",
  offline: "#747f8d",
  idle: "#f2b34d",
  dnd: "#d33f3f",
  unknown: "#747f8d",
};

const StyledBox = styled(Box)(({ theme }) => ({
  "& .header": {
    [theme.breakpoints.up("lg")]: {
      fontSize: 100,
    },
    [theme.breakpoints.down("lg")]: {
      fontSize: 50,
      margin: 20,
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
    [theme.breakpoints.up("lg")]: {
      marginRight: 28,
    },
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
    width: 16,
    height: 16,
    borderRadius: 20,
    position: "absolute",
    bottom: 5,
    border: "1px solid #000",
    right: 6,
  },
}));

export const AboutMe = () => {
  const [profileData, setProfileData] = useState({ status: "unknown", avatarHash: "", userId: "", activities: [] });

  useEffect(() => {
    fetchPresence();
  }, []);

  const fetchPresence = () => {
    fetch("/presence")
      .then(res => res.json())
      .then(res => setProfileData(res));
  };

  const { userId, avatarHash, activities } = profileData;
  const ext = avatarHash.startsWith("a_") ? "gif" : "png";
  const avatarUrl = `${DISCORD_AVATAR_CDN}/${userId}/${avatarHash}.${ext}`;

  return (
    <StyledBox>
      <div className="about-wrap">
        <div className="name">
          {avatarHash ? (
            <div className="image-wrap">
              <Presence activities={activities}>
                <div>
                  {/* <img className="avatar" src={avatarUrl} alt="My discord avatar" /> */}
                  <Avatar url={avatarUrl} />
                  <div
                    className="indicator"
                    style={{
                      background: STATE_COLORS[profileData.status],
                    }}
                  />
                </div>
              </Presence>
            </div>
          ) : (
            <div className="image-wrap">
              <Skeleton variant="circular" width={100} height={100} />
            </div>
          )}
          <Typography className="header">Sean Boult</Typography>
        </div>
      </div>
    </StyledBox>
  );
};
