import { colors, messages } from '../config.js';
import removeTicket from '../utils/remove-ticket.js';
import sendGoodbye from '../utils/send-goodbye.js';

/**
 *
 * @param {import('discord.js').ThreadChannel} thread
 * @returns {Promise<void>}
 */
export default async function (thread) {
	if (!threads.has(thread.id)) return;

	const userId = threads.get(thread.id);
	const ticketMsg = await thread.parent.messages.fetch(thread.id);
	const user = await discordClient.users.fetch(userId);

	const check = await sendGoodbye(user);
	if (!check) return;

	if (ticketMsg) {
		await ticketMsg.edit({
			embeds: [{ ...ticketMsg.embeds[0], title: messages.goodbye, color: colors.grey }],
			components: [],
		});
	}

	await removeTicket(userId);
}
