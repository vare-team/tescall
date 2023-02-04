import { messages } from '../config.js';
import saveTickets from './save-tickets.js';
import log from './log.js';
import getThread from './get-thread.js';

export default async function (userId) {
	const thread = await getThread(userId);
	await thread?.setArchived(true, messages.goodbyeError).catch(() => log('no thread ticket remove'));
	tickets.delete(userId);
	threads.delete(thread.id);
	saveTickets();
	log(`Тикет закрыт! @${userId}`);
}
