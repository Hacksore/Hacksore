import "../env.js";
import { REST } from "@discordjs/rest";
import { APIApplicationCommandOption, Routes } from "discord-api-types/v9";
import { CommandList } from "../commands/_command-list.js";
import { Client, TextChannel } from "discord.js";
import { DISCORD_SERVER_ID } from "../constants.js";
import os from "os";

const HOSTNAME = os.hostname();

export const onReady = async (client: Client): Promise<void> => {
  try {
    const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

    const commandData: {
      name: string;
      description?: string;
      type?: number;
      options?: APIApplicationCommandOption[];
    }[] = [];

    CommandList.forEach(command =>
      commandData.push(
        command.data.toJSON() as {
          name: string;
          description?: string;
          type?: number;
          options?: APIApplicationCommandOption[];
        }
      )
    );

    // update commands
    await rest.put(Routes.applicationGuildCommands(client.user?.id || "missing token", DISCORD_SERVER_ID), {
      body: commandData,
    });

    console.log("Presence bot has connected to Discord!");

    const channelId = "1079776041553375313";
    const channel: TextChannel = client.channels.cache.get(channelId) as TextChannel;
    channel.send(`I am online now! ${HOSTNAME}`);
  } catch (err) {
    console.log("Error starting Presence bot", err);
  }
};
