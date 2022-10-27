import { Presence } from "discord.js";
import { db } from "../firebase.js";
import { isUpdateAllowed } from "../util.js";

export const onPresenceUpdate = async (_oldPres: Presence | null, newPres: Presence): Promise<void> => {
  if (!isUpdateAllowed(newPres.user?.id, newPres.guild?.id)) {
    return;
  }

  const data = {
    status: newPres?.status,
    avatarHash: newPres?.user?.avatar,
    userId: newPres?.user?.id,
    activities: newPres.activities.map(item => ({
      name: item?.name,
      details: item?.details,
      type: item?.type,
      state: item?.state,
    })),
    clientStatus: newPres.clientStatus
  };

  db.ref("userdata").set(data);
};
