import { MessageEmbed } from 'discord.js';
import { colors, messages } from '../config.js';
import log from '../utils/log.js';
import saveTickets from '../utils/save-tickets.js';

export default async function (thread) {
	if (!threads.has(thread.id)) return;

	const userId = threads.get(thread.id);
	const ticketMsg = await thread.parent.messages.fetch(thread.id);
	const user = await discordClient.users.fetch(userId);

	await user
		.send({
			embeds: [
				new MessageEmbed()
					.setTitle(messages.goodbye)
					.setDescription(messages.goodbyeDescription)
					.setColor(colors.green),
			],
		})
		.catch(console.error);

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
