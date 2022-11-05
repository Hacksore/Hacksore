import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import { db } from "../firebase.js";
import { CommandInt } from "../types.js";

const command: CommandInt = {
  data: new SlashCommandBuilder().setName("webhooks").setDescription("Manage webhooks"),
  execute: async (interaction: CommandInteraction) => {
    // read data from firebase
    const webhookRefDoc = await db.ref("webhooks").get();
    // the doc from the database
    const configuredWebhooks: { [key: string]: { url: string } } = webhookRefDoc.val();
    // pull out the webhook url from the db

    const repos = Object.keys(configuredWebhooks);
    interaction.reply(repos.join("\n"));
  },
};

export default command;
