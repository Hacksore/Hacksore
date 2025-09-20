import type { SlashCommandBuilder, CommandInteraction } from "discord.js";

export interface CommandInt {
  data: SlashCommandBuilder | unknown;
  execute: (interaction: CommandInteraction) => Promise<void>;
}
