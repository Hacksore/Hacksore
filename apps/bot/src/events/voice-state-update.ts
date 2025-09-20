import type { VoiceState } from "discord.js";
import { db } from "../firebase.js";
import { isUpdateAllowed } from "../util.js";

export const onVoiceStateUpdate = async (newVoiceState: VoiceState): Promise<void> => {
  if (!isUpdateAllowed(newVoiceState?.id, newVoiceState.guild?.id)) {
    return;
  }

  const userdataDoc = await db.ref("userdata").get();
  db.ref("userdata").set({
    ...userdataDoc.val(),
    streaming: newVoiceState.streaming,
  });
};
