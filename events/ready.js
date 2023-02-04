import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import { commands } from '../config.js';

import log from '../utils/log.js';
import messageCreateEvent from './message-create.js';
import messageUpdateEvent from './message-update.js';
import messageDeleteEvent from './message-delete.js';
import interactionCreateEvent from './interaction-create.js';
import threadDeleteEvent from './thread-delete.js';

export default async function () {
	log('Авторизация выполнена!');

	global.mainGuild = await discordClient.guilds.fetch(process.env.GUILD);
	if (process.env.ROLE) global.boosterRole = await discordClient.guilds.fetch(process.env.ROLE);
	global.ticketsChannel = await mainGuild.channels.fetch(process.env.CHANNEL);

	const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
	await rest.put(Routes.applicationCommands(discordClient.application.id), {
		body: Object.values(commands).slice(1),
	});

	discordClient.on('messageCreate', messageCreateEvent);
	discordClient.on('messageUpdate', messageUpdateEvent);
	discordClient.on('messageDelete', messageDeleteEvent);
	discordClient.on('interactionCreate', interactionCreateEvent);
	discordClient.on('threadDelete', threadDeleteEvent);

	discordClient.user.setActivity('Напиши в ЛС для помощи!', { type: 'WATCHING' });

	log(`Лог канал закеширован! #${discordClient.channels.cache.get(process.env.CHANNEL).name}`);
	log('К работе готов!\n');
}
