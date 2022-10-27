import { REST } from "@discordjs/rest";
import { APIApplicationCommandOption, Routes } from "discord-api-types/v9";
import { CommandList } from "../commands/_command-list.js";
import { Client } from "discord.js";
import { DISCORD_TOKEN } from "../index.js";
import { DISCORD_SERVER_ID } from "../constants.js";

export const onReady = async (client: Client): Promise<void> => {
  if (!DISCORD_TOKEN) {
    throw new Error("A DISCORD_TOKEN must be set to register the commands!");
  }

  try {
    const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);

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

    await rest.put(Routes.applicationGuildCommands(client.user?.id || "missing token", DISCORD_SERVER_ID), {
      body: commandData,
    });
    console.log("Presence bot has connected to Discord!");
  } catch (err) {
    console.log("Error starting Presence bot", err);
  }
};
