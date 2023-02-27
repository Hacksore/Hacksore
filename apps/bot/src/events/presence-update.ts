import { Presence } from "discord.js";
import { db } from "../firebase.js";
import { isUpdateAllowed } from "../util.js";

import type { Activity, Profile } from "@boult/types";
import { ActivityType } from "@boult/types";

export const onPresenceUpdate = async (_oldPres: Presence | null, newPres: Presence): Promise<void> => {
  if (!isUpdateAllowed(newPres.user?.id, newPres.guild?.id)) {
    return;
  }

  const prevDataSnapshot = await db.ref("userdata").get()
  const previousUserdata: Profile = prevDataSnapshot.val();

  const data: Profile = {
    status: newPres?.status,
    // TODO: check if streaming first
    streaming: false,
    // some events can delete this for some reason?
    avatarHash: newPres?.user?.avatar || previousUserdata.avatarHash,
    userId: newPres?.user?.id || previousUserdata.userId,
    activities: newPres.activities.map<Activity>(item => ({
      name: item?.name || "",
      details: item?.details || "",
      type: item?.type || ActivityType.Playing,
      state: item?.state || "",
    })),
  };

  db.ref("userdata").set(data);
};
