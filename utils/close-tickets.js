import { colors, messages } from '../config.js';
import removeTicket from './remove-ticket.js';
import getThread from './get-thread.js';

export default async function (threadId) {
	const user = await discordClient.users.fetch(threads.get(threadId));
	const thread = await getThread(user.id);

	const ticketMsg = await thread.parent.messages.fetch(threadId);

	if (ticketMsg) {
		await ticketMsg.edit({
			embeds: [{ ...ticketMsg.embeds[0], title: messages.goodbyeError, color: colors.grey }],
			components: [],
		});
	}

	await removeTicket(user.id);
}
