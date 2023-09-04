"use client";
import { useEffect, useState } from "react";
import { Presence } from "../components/presence";
import { Avatar } from "../components/avatar";
import { DataSnapshot, onValue, ref } from "firebase/database";
import { db } from "../firebase-client";
import { Profile } from "@boult/types";

export const STATE_COLORS = {
  online: "#90ce5c",
  offline: "#747f8d",
  invisible: "#747f8d",
  idle: "#f2b34d",
  dnd: "#d33f3f",
};

const DISCORD_AVATAR_CDN = "https://cdn.discordapp.com/avatars";

export const About = ({ hideTagline = false }: { hideTagline?: boolean }) => {
  const [profileData, setProfileData] = useState < Profile > ({
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
          <div className="image-wrap">TODO;</div>
        )}
        <p>Sean Boult</p>
      </div>
      {!hideTagline && <p>Full Stack Developer Who Loves React</p>}
    </div>
  );
};
