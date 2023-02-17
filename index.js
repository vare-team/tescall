if (!process.env.WEBHOOK_URL || !process.env.TOKEN || !process.env.CHANNEL || !process.env.GUILD) {
	console.log('Ошибка окружения!');
	process.exit();
}

import { Client, IntentsBitField, WebhookClient } from 'discord.js';
import { createFiles, readFiles } from './utils/save-tickets.js';
import log from './utils/log.js';
import readyEvent from './events/ready.js';

createFiles();

const client = new Client({
	intents:
		IntentsBitField.Flags.Guilds |
		IntentsBitField.Flags.DirectMessages |
		IntentsBitField.Flags.GuildMessages |
		IntentsBitField.Flags.GuildMembers,
	partials: ['CHANNEL'],
});

global.discordClient = client;
global.discordWebhook = new WebhookClient({ url: process.env.WEBHOOK_URL });
global.tickets = new Map(Object.entries(readFiles('./tickets.json')));

/**
 * @type {Map<string, string>}
 */
global.threads = new Map(Object.entries(readFiles('./threads.json')));
/**
 * @type {Map<string, number>}
 */
global.mutes = new Map(Object.entries(readFiles('./mutes.json')));

client.once('ready', readyEvent);

client.login(process.env.TOKEN).then(() => log('Авторизация...'));
