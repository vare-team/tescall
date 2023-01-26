import { colors, messages } from '../config.js';
import saveTickets from '../utils/save-tickets.js';
import log from '../utils/log.js';
import { MessageEmbed } from 'discord.js';
import closeTickets from '../utils/close-tickets.js';

export default async inter => {
	const user = inter.options.getUser('user');
	if (!tickets.has(user.id)) return await inter.editReply({ content: 'Тикет отсутствиет!' });
	if (!tickets.get(user.id).thread) return await inter.editReply({ content: 'Тред отсутствиет!' });
	const thread = await discordClient.channels.cache.get(process.env.CHANNEL).threads.fetch(tickets.get(user.id).thread);

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

	const ticketMsg = await thread.parent.messages.fetch(thread.id);
	if (ticketMsg) {
		await ticketMsg.edit({
			embeds: [{ ...ticketMsg.embeds[0], title: messages.goodbye, color: colors.grey }],
			components: [],
		});
	}

	await thread.setArchived(true, messages.goodbye);
	tickets.delete(user.id);
	threads.delete(thread.id);
	saveTickets();
	log(`Тикет закрыт! @${user.id}`);
	await inter.editReply({ content: 'Тикет закрыт!' });
};
