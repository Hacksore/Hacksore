import { SlashCommandBuilder, CommandInteraction } from "discord.js";

export interface CommandInt {
  data: SlashCommandBuilder | any;
  // eslint-disable-next-line 
  execute: (interaction: CommandInteraction) => Promise<void>;
}
