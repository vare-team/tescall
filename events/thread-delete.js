import { MessageEmbed } from 'discord.js';
import { colors, messages } from '../config.js';
import log from '../utils/log.js';
import saveTickets from '../utils/save-tickets.js';
import closeTickets from '../utils/close-tickets.js';

export default async function (thread) {
	if (!threads.has(thread.id)) return;

	const userId = threads.get(thread.id);
	const ticketMsg = await thread.parent.messages.fetch(thread.id);
	const user = await discordClient.users.fetch(userId);

	const check = await user
		.send({
			embeds: [
				new MessageEmbed()
					.setTitle(messages.goodbye)
					.setDescription(messages.goodbyeDescription)
					.setColor(colors.green),
			],
		})
		.catch(closeTickets(thread.id));
	if (!check) return;

	if (ticketMsg) {
		await ticketMsg.edit({
			embeds: [{ ...ticketMsg.embeds[0], title: messages.goodbye, color: colors.grey }],
			components: [],
		});
	}

	tickets.delete(userId);
	threads.delete(thread.id);
	saveTickets();
	log(`Тикет закрыт! @${userId}`);
}
