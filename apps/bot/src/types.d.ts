import { SlashCommandBuilder, CommandInteraction } from "discord.js";

export interface CommandInt {
  data: SlashCommandBuilder | any;
  // eslint-disable-next-line no-unused-vars
  execute: (interaction: CommandInteraction) => void;
}
