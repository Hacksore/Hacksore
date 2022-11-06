import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import { db } from "../firebase.js";
import { CommandInt } from "../types.js";

async function getAllRepos() {
  // read data from firebase
  const webhookRefDoc = await db.ref("webhooks").get();
  // the doc from the database
  const configuredWebhooks: { [key: string]: { url: string } } = webhookRefDoc.val();
  // pull out the webhook url from the db

  return Object.keys(configuredWebhooks);
}

const commandData = new SlashCommandBuilder()
  .setName("subs")
  .setDescription("Manage webhooks")
  .addSubcommand(subcommand => subcommand.setName("list").setDescription("List all the subs"))
  .addSubcommand(subcommand =>
    subcommand
      .setName("remove")
      .setDescription("Remove a sub for a repo")
      .addStringOption(option => option.setName("repo").setDescription("The repo name to remove"))
  )
  .addSubcommand(subcommand =>
    subcommand
      .setName("add")
      .setDescription("Add a sub for a repo")
      .addStringOption(option => option.setName("repo").setDescription("The repo name to add"))
  );

const command: CommandInt = {
  data: commandData,
  execute: async (interaction: CommandInteraction) => {

    const repos = await getAllRepos();

    interaction.reply(repos.join("\n"));
  },
};

export default command;
