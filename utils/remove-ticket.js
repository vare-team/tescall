import { messages } from '../config.js';
import saveTickets from './save-tickets.js';
import log from './log.js';
import getThread from './get-thread.js';

/**
 * @param {import('discord.js').Snowflake} userId
 * @returns {Promise<void>}
 */
export default async function (userId) {
	const ticket = tickets.get(userId);

	if (ticket && ticket.active) {
		const thread = await getThread(userId);
		await thread.setArchived(true, messages.goodbyeError).catch(() => log('no thread ticket remove'));
		threads.delete(thread.id);
	}

	tickets.delete(userId);
	saveTickets();
	log(`Тикет закрыт! @${userId}`);
}
