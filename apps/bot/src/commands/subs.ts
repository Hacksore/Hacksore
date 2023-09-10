import { SlashCommandBuilder, CommandInteraction, EmbedBuilder } from "discord.js";
import { db } from "../firebase.js";
import { CommandInt } from "../types.js";

import { githubRepoExists, createGithubWebhook } from "@boult/api/github";
import { createDiscordChannel, discordChannelExists, createDiscordWebhook } from "@boult/api/discord";
import { getAllRepos } from "@boult/api/core";

const WEBHOOK_DOMAIN = "boult.me";

const commandData = new SlashCommandBuilder()
  .setName("repo")
  .setDescription("Manage repo webhooks")
  .addSubcommand(subcommand => subcommand.setName("list").setDescription("List all the subs"))
  .addSubcommand(subcommand =>
    subcommand
      .setName("remove")
      .setDescription("Remove a subscription for a repo")
      .addStringOption(option => option.setName("repo").setDescription("The repo name to remove"))
  )
  .addSubcommand(subcommand =>
    subcommand
      .setName("add")
      .setDescription("Add a subscription for a repo")
      .addStringOption(option => option.setName("repo").setDescription("The repo name to add"))
  );

// TODO: how can we use this?

const createWebhook = async (name: string) => {
  // hard code for now
  const guildId = "975086424049213560";

  /*
    Steps to add a new repo 
    1. ✅ check if a repo exists with that name
    2. ✅ check we don't have that channel in discord created already
    1. ✅ create discord channel with the repo as channel name
    2. ✅ create a webhook on github for the repo
    3. ✅ create a webhook for the discord channel
    4. ✅ add the discord webhook to the firebase db
    5. ✅ send message with the new hook for best e2e
    5. profit????
    */

  // create channel
  const repoExists = await githubRepoExists({
    owner: "hacksore",
    repo: name,
  });

  if (!repoExists) {
    return { error: "The repo doesn't exists" };
  }

  // create channel
  console.log("Checking if discord channel exists");
  const channelExists = await discordChannelExists({
    guildId,
    name,
  });

  if (channelExists) {
    return { error: "The discord channel already exists in the server" };
  }

  // create channel
  console.log("Creating discord channel");
  const discordCreateChannelResult = await createDiscordChannel({
    guildId,
    name,
  });

  if (!discordCreateChannelResult.success) {
    return { error: "Something went wrong creating the discord channel" };
  }

  // get the channel id
  const discordChannelId = discordCreateChannelResult.channelId;

  console.log("Creating github webhook");
  const createGithubWebhookResult = await createGithubWebhook({
    owner: "Hacksore",
    repo: name,
    url: `https://${WEBHOOK_DOMAIN}/api/webhook`,
  });

  if (!createGithubWebhookResult.success) {
    return { error: "Could not create github webhook" };
  }

  console.log("Creating discord webhook for the new channel", discordChannelId);
  const createDiscordWebhookResult = await createDiscordWebhook({
    channelId: discordChannelId,
  });

  if (!createDiscordWebhookResult.success) {
    return { error: "Could not create discord webhook" };
  }

  db.ref("webhooks").child(name.toLowerCase()).set({
    url: createDiscordWebhookResult.url,
  });

  console.log("sending message that it was registered");
  await fetch(createDiscordWebhookResult.url, {
    method: "POST",
    body: JSON.stringify({
      content: "<@378293909610037252> repo registered for notifications",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const command: CommandInt = {
  data: commandData,
  execute: async (interaction: CommandInteraction) => {
    // I guess how you get the sub command
    const { name: method = "list" } = interaction.options.data[0];

    if (method === "add") {
      const repo = interaction.options.get("repo");
      if (!repo?.value) {
        interaction.reply("You must provide a repo name");
      } else {
        createWebhook(repo?.value as string);
        interaction.reply(`Added repo ${repo.value}`);
      }
    }

    if (method === "list") {
      // TODO: how to share the db client
      const repos = await getAllRepos(db);
      const exampleEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("Repos")
        .setURL("https://discord.js.org/")
        .addFields(repos.map(item => ({ name: item, value: item })));
      interaction.reply({ embeds: [exampleEmbed] });
    }
  },
};

export default command;
