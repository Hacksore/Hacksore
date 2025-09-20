import { SlashCommandBuilder, CommandInteraction } from "discord.js";

export interface CommandInt {
  data: SlashCommandBuilder | any;
  execute: (interaction: CommandInteraction) => Promise<void>;
}
