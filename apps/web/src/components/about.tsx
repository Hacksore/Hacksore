"use client";
import { useEffect, useState } from "react";
import { Presence } from "../components/presence";
import { Avatar } from "../components/avatar";
import { DataSnapshot, onValue, ref } from "firebase/database";
import { db } from "../firebase-client";
import { Profile } from "@boult/types";
const DISCORD_AVATAR_CDN = "https://cdn.discordapp.com/avatars";

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
    <div className="flex flex-col text-center items-center gap-2">
      <div className="flex flex-col items-center gap-2">
        {avatarHash ? (
          <Presence status={status} activities={activities}>
            <Avatar url={avatarUrl} status={status} />
          </Presence>
        ) : (
          <div className="animate-pulse rounded-full bg-zinc-800 h-[96px] w-[96px]" />
        )}
        <p className="bg-gradient-to-tl via-red-400 from-indigo-400 to-yellow-400 text-transparent bg-clip-text font-bold text-4xl sm:text-7xl">
          Sean Boult
        </p>
      </div>

      {!hideTagline && <p>Full Stack Developer Who Likes React</p>}
    </div>
  );
};
