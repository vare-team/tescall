import buttonTake from '../buttons/take.js';
import buttonClose from '../buttons/close.js';
import buttonTicket from '../buttons/ticket.js';
import automessageMenu from './automessage-menu.js';
import log from '../../utils/log.js';
import { TicketTitles } from '../../config.js';
import hasTicket from '../../utils/has-ticket.js';
import unavailableDm from '../../utils/unavailable-dm.js';

/**
 * @param {import('discord.js').BaseInteraction} interaction
 * @returns {Promise<void>}
 */
export default async function (interaction) {
	const [customId, userId] = interaction.customId.split(':');

	try {
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
				if (TicketTitles.hasOwnProperty(customId)) {
					if (!(await hasTicket(interaction))) await buttonTicket(interaction);
					break;
				}

				log(`Что-то странное! custom-id: ${customId}, user-id: ${userId ?? interaction.userId}`);
		}
	} catch {
		await unavailableDm(userId);
	}
}
