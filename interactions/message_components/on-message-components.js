import buttonTake from '../buttons/take.js';
import buttonClose from '../buttons/close.js';
import buttonTicket from '../buttons/ticket.js';
import automessageMenu from './automessage-menu.js';
import log from '../../utils/log.js';

export default async function (interaction) {
	if (!interaction.customId.startsWith("ticket_")) {
		const [customId, userId] = interaction.customId.split(':');

		switch (customId) {
			case 'GET':
				await buttonTake(interaction);
				break;

			case 'CLOSE':
				await buttonClose(interaction);
				break;

			case 'AUTOMESSAGE':
				await automessageMenu(interaction);
				break;

			default:
				log(`Что-то странное! custom-id: ${customId}, user-id: ${userId}`);
		}
	} else if (interaction.customId.startsWith('ticket_')) {
		buttonTicket(interaction);
	}
}
