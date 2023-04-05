import { useEffect, useState } from "react";
import { Box, lighten, Skeleton, styled, Typography } from "@mui/material";
import { Presence } from "../../components/presence";
import { Avatar } from "../../components/avatar";
import { DataSnapshot, onValue, ref } from "firebase/database";
import { db } from "../../firebase-client";
import { Profile } from "@boult/types";

export const STATE_COLORS = {
  online: "#90ce5c",
  offline: "#747f8d",
  invisible: "#747f8d",
  idle: "#f2b34d",
  dnd: "#d33f3f",
};

const DISCORD_AVATAR_CDN = "https://cdn.discordapp.com/avatars";

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
    border: `1px solid ${lighten(theme.palette.background.default, 0.2)}`,
    right: 6,
  },
}));

export const About = ({ hideTagline = false }: { hideTagline?: boolean }) => {
  const [profileData, setProfileData] = useState<Profile>({
    status: "offline",
    avatarHash: "",
    userId: "",
    activities: [],
    streaming: false,
  });

  useEffect(() => {
    const localRef = ref(db, "userdata");

    // when anything changes in the doc
    const removeListener = onValue(localRef, (snapshot: DataSnapshot) => {
      const value = snapshot.val();

      if (value) {
        setProfileData(value);
      }
    });

    return () => removeListener();
  }, []);

  const { userId, avatarHash, activities, status } = profileData;
  const ext = avatarHash?.startsWith("a_") ? "gif" : "png";
  const avatarUrl = `${DISCORD_AVATAR_CDN}/${userId}/${avatarHash}.${ext}`;

  return (
    <StyledBox>
      <div className="about-wrap">
        <div className="name">
          {avatarHash ? (
            <div className="image-wrap">
              <Presence status={status} activities={activities}>
                <div>
                  {/* TODO: move the indicator to the avatar? */}
                  <Avatar url={avatarUrl} />
                  <div
                    className="indicator"
                    style={{
                      background: STATE_COLORS[status],
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
        {!hideTagline && <Typography variant="h5">Full Stack Developer Who Likes React</Typography>}
      </div>
    </StyledBox>
  );
};
