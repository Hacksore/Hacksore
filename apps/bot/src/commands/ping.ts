import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import { CommandInt } from "../types.js";

const command: CommandInt = {
  data: new SlashCommandBuilder().setName("ping").setDescription("Shows the bot's ping"),
  execute: (interaction: CommandInteraction) => {
    interaction.reply("hi");
  },
};

export default command;
