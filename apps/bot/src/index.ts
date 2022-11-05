import "dotenv/config";

import { Client, GatewayIntentBits } from "discord.js";
import { onReady } from "./events/ready.js";
import { onInteraction } from "./events/interaction.js";
import { onPresenceUpdate } from "./events/presence-update.js";
import { onVoiceStateUpdate } from "./events/voice-state-update.js";
import { onGuildMemberUpdate } from "./events/guild-member-update.js";

export const { DISCORD_TOKEN } = process.env;

if (!DISCORD_TOKEN) {
  throw new Error("You must set a DISCORD_TOKEN");
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

// ready event
client.on("ready", onReady);

// interaction event
client.on("interactionCreate", onInteraction);

// hacked type in
client.on("presenceUpdate", onPresenceUpdate);

// check for voice state changes
client.on("voiceStateUpdate", onVoiceStateUpdate);

// handle users updating
client.on("guildMemberUpdate", onGuildMemberUpdate);

// login with the token
client.login(DISCORD_TOKEN);
