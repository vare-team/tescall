import { colors, messages } from '../../config.js';
import { EmbedBuilder } from 'discord.js';
import unavailableDm from '../../utils/unavailable-dm.js';
import removeTicket from '../../utils/remove-ticket.js';
import getThread from '../../utils/get-thread.js';

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

	if (ticket && ticket.thread) {
		const parent =
			(await getThread(user.id).catch(() => {}))?.parent ?? (await discordClient.channels.fetch(process.env.CHANNEL));

		const ticketMsg = await parent.messages.fetch(ticket.thread);

		if (ticketMsg) {
			await ticketMsg.edit({
				embeds: [{ ...ticketMsg.embeds[0].data, title: messages.goodbye, color: colors.grey }],
				components: [],
			});
		}
	}

	if (!check) return;

	await removeTicket(user.id).then(async () => await interaction.reply({ content: 'Закрыт !', ephemeral: true }));
}
