import { colors, messages } from '../../config.js';
import removeTicket from '../../utils/remove-ticket.js';
import getThread from '../../utils/get-thread.js';
import sendGoodbye from '../../utils/send-goodbye.js';

/**
 * @param {import('discord.js').CommandInteraction} interaction
 * @returns {Promise<void>}
 */
export default async function (interaction) {
	const user = interaction.options.getUser('user');
	if (!tickets.has(user.id)) return await interaction.reply({ content: messages.ticketNotFound });
	const ticket = tickets.get(user.id);
	const check = sendGoodbye(user);

	if (ticket && ticket.thread) {
		const parent = (await getThread(user.id).catch(() => {}))?.parent ?? (await ticketsChannel);

		const ticketMsg = await parent.messages.fetch(ticket.thread);

		if (ticketMsg) {
			await ticketMsg.edit({
				embeds: [{ ...ticketMsg.embeds[0].data, title: messages.goodbye, color: colors.grey }],
				components: [],
			});
		}
	}

	if (!check) return;

	await removeTicket(user.id).then(
		async () => await interaction.reply({ content: 'Тикет закрыт!', flags: 'Ephemeral' })
	);
}
