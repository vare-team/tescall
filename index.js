if (!process.env.WEBHOOK_URL || !process.env.TOKEN || !process.env.CHANNEL) {
	console.log('Ошибка окружения!');
	process.exit();
}

import { Client, WebhookClient } from 'discord.js';
import { createFiles } from './utils/save-tickets.js';
import log from './utils/log';
import readyEvent from './events/ready';

createFiles();

const client = new Client({
	intents: ['GUILDS', 'DIRECT_MESSAGES', 'GUILD_MESSAGES'],
	partials: ['CHANNEL'],
});

global.discordClient = client;
global.discordWebhook = new WebhookClient({ url: process.env.WEBHOOK_URL });
global.tickets = new Map(Object.entries(require('./tickets.json')));

/**
 * @type {Map<string, string>}
 */
global.threads = new Map(Object.entries(require('./threads.json')));

client.once('ready', readyEvent);

client.login(process.env.TOKEN).then(() => log('Авторизация...'));
