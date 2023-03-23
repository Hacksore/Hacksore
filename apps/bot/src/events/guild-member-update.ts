import { GuildMember, PartialGuildMember } from "discord.js";
import { db } from "../firebase.js";
import { isUpdateAllowed } from "../util.js";

// types are messed up for this
// TODO: fix later
export const onGuildMemberUpdate = async (
  oldMember: GuildMember | PartialGuildMember,
  newMember: GuildMember
): Promise<void> => {
  if (!isUpdateAllowed(newMember?.id, newMember.guild?.id)) {
    return;
  }

  const userdataDoc = await db.ref("userdata").get();

  // update anything that changed on the user
  db.ref("userdata").set({
    ...userdataDoc.val(),
    avatarHash: newMember.avatar,
  });
};
