import onModalSubmit from '../interactions/modals/on-modal-submit.js';
import onMessageComponents from '../interactions/message_components/on-message-components.js';
import onApplicationCommands from '../interactions/commands/on-application-commands.js';
import { MessageEmbed } from 'discord.js';
import { colors, ticketsErrors } from '../config.js';

export default async function (inter) {
	if (inter.type !== 'MESSAGE_COMPONENT') return;

	const [command] = inter.customId.split(':');
	switch (command) {
		case 'GET':
			await buttonTake(inter);
			break;

		case 'CLOSE':
			await buttonClose(inter);
			break;

		case 'AUTOMESSAGE':
			await automessageMenu(inter);
			break;

		default:
			log(`Что-то странное!`);
	}
}
