import { ticketsErrors } from '../config.js';
import closeTickets from './close-tickets.js';
import getThread from './get-thread.js';

/**
 * @return {Promise<void>}
 * @param userId
 */
export default function (userId) {
	return async () => {
		const thread = await getThread(userId);
		await thread.send(ticketsErrors.unavailableDm);
		await closeTickets(thread.id)();
	};
}
