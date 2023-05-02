import { colors, messages } from '../../config.js';
import { EmbedBuilder } from 'discord.js';
import unavailableDm from '../../utils/unavailable-dm.js';
import removeTicket from '../../utils/remove-ticket.js';

export default async function (interaction) {
	const user = interaction.options.getUser('user');
	if (!tickets.has(user.id)) return await interaction.reply({ content: 'Тикет отсутствует!' });
	const ticket = tickets.get(user.id);

	const check = await user
		.send({
			embeds: [
				new EmbedBuilder()
					.setTitle(messages.goodbye)
					.setDescription(messages.goodbyeDescription)
					.setColor(colors.green),
			],
		})
		.catch(unavailableDm(user.id));

	if (ticket.thread) {
		const thread = await discordClient.channels.cache
			.get(process.env.CHANNEL)
			.threads.fetch(tickets.get(user.id).thread);
		const ticketMsg = await thread.parent.messages.fetch(thread.id);

		if (ticketMsg) {
			await ticketMsg.edit({
				embeds: [{ ...ticketMsg.embeds[0], title: messages.goodbye, color: colors.grey }],
				components: [],
			});
		}
	}

	if (!check) return;

	await removeTicket(user.id).then(async () => await interaction.reply({ content: 'Закрыт !', ephemeral: true }));
}
