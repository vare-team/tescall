import { MessageEmbed } from 'discord.js';
import { colors, messages } from '../../config.js';
import log from '../../utils/log.js';
import saveTickets from '../../utils/save-tickets.js';
import closeTickets from '../../utils/close-tickets.js';

export default async function (inter) {
	const user = await discordClient.users.fetch(threads.get(inter.message.id));

	const check = await user
		.send({
			embeds: [
				new MessageEmbed()
					.setTitle(messages.goodbye)
					.setDescription(messages.goodbyeDescription)
					.setColor(colors.green),
			],
		})
		.catch(closeTickets(inter.message.id));
	if (!check) return;

	await inter.update({
		embeds: [{ ...inter.message.embeds[0], title: messages.goodbye, color: colors.grey }],
		components: [],
	});

	const thread = await discordClient.channels.cache.get(process.env.CHANNEL).threads.fetch(tickets.get(user.id).thread);
	await thread.setArchived(true, messages.goodbye);

	tickets.delete(user.id);
	threads.delete(inter.message.id);
	saveTickets();
	log(`Тикет закрыт! @${user.id}`);
}
