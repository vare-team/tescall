import { commands } from '../config.js';

import log from '../utils/log.js';
import messageCreateEvent from './message-create.js';
import messageUpdateEvent from './message-update.js';
import messageDeleteEvent from './message-delete.js';
import interactionCreateEvent from './interaction-create.js';
import threadDeleteEvent from './thread-delete.js';
import { ActivityType } from 'discord.js';

export default async function (client) {
	log('Авторизация выполнена!');

	global.mainGuild = await client.guilds.fetch(process.env.GUILD);
	if (process.env.ROLE) global.boosterRole = await mainGuild.roles.fetch(process.env.ROLE);
	global.ticketsChannel = await mainGuild.channels.fetch(process.env.CHANNEL);

	await client.application.commands.set(Object.values(commands).slice(1));

	client.on('messageCreate', messageCreateEvent);
	client.on('messageUpdate', messageUpdateEvent);
	client.on('messageDelete', messageDeleteEvent);
	client.on('interactionCreate', interactionCreateEvent);
	client.on('threadDelete', threadDeleteEvent);

	client.user.setActivity('Напиши в ЛС для помощи!', { type: ActivityType.Watching });

	log(`Лог канал закеширован! #${client.channels.cache.get(process.env.CHANNEL).name}`);
	log('К работе готов!\n');
}
