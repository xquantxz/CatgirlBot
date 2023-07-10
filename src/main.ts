// Require the necessary discord.js classes
import { Client, Events, GatewayIntentBits, Collection } from 'discord.js';
import * as path from 'node:path'

import { NyanClient } from './nyan';
import './database';
const { BOT_TOKEN } = require('./constant');

// Create a new client instance
const client = new NyanClient({ intents: [GatewayIntentBits.Guilds] });
client.load_commands(path.join(__dirname, 'commands'));

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
    const handler = client.commands.get(interaction.commandName);
    if (handler) {
        await handler(interaction);
    }
});

// Log in to Discord with your client's token
client.login(BOT_TOKEN);
