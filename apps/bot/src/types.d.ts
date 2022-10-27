import { SlashCommandBuilder, CommandInteraction, Collection, PermissionResolvable, Message } from "discord.js";

export interface CommandInt {
  data: SlashCommandBuilder | any;
  execute: (interaction: CommandInteraction) => void;
}
