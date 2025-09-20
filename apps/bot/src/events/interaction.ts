import type { Interaction } from "discord.js";
import { CommandList } from "../commands/_command-list.js";

export const onInteraction = async (interaction: Interaction): Promise<void> => {
  try {
    if (interaction.isCommand()) {
      for (const command of CommandList) {
        if (interaction.commandName === command.data.name) {
          await command.execute(interaction);
          break;
        }
      }
    }
  } catch (err) {
    console.log("onInteraction event", err);
  }
};
