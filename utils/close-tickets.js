import { colors, messages } from '../config.js';
import removeTicket from './remove-ticket.js';
import getThread from './get-thread.js';

/**
 * @param {import('discord.js').Snowflake} threadId
 * @returns {Promise<void>}
 */
export default function (threadId) {
	return async () => {
		const user = await discordClient.users.fetch(threads.get(threadId));
		const parent = (await getThread(user.id).catch(() => {}))?.parent ?? (await ticketsChannel);

		const ticketMsg = await parent.messages.fetch(threadId);

		if (ticketMsg) {
			await ticketMsg.edit({
				embeds: [{ ...ticketMsg.embeds[0].data, title: messages.goodbyeError, color: colors.grey }],
				components: [],
			});
		}

		await removeTicket(user.id);
	};
}
