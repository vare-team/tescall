import modalsSendHello from './modals-send-hello.js';
import createTicket from '../../utils/create-ticket.js';
import { colors, messages, TicketTitles, TicketTopics } from '../../config.js';
import { ChannelType, EmbedBuilder } from 'discord.js';
import hasTicket from '../../utils/has-ticket.js';
import unavailableDm from '../../utils/unavailable-dm.js';
import sendClosedDm from '../../utils/send-closed-dm.js';

/**
 * @param {import('discord.js').ModalMessageModalSubmitInteraction} interaction
 * @returns {Promise<void>}
 */
export default async function (interaction) {
	if (await hasTicket(interaction)) return;

	let ticketTopic;

	try {
		ticketTopic = TicketTopics[interaction.customId](interaction);
	} catch (err) {
		await interaction
			.reply({
				embeds: [new EmbedBuilder().setTitle(err).setColor(colors.red)],
				flags: interaction.channel.type !== ChannelType.DM ? 'Ephemeral' : [],
			})
			.catch(console.error);
		return;
	}

	try {
		await modalsSendHello(interaction);
		await createTicket(TicketTitles[interaction.customId], interaction.user, ticketTopic);
		if (interaction.channel.type !== ChannelType.DM)
			interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setTitle(messages.hello.replace('%NAME%', interaction.user.username))
						.setDescription(messages.ticketSent)
						.setColor(colors.blue),
				],
				flags: 'Ephemeral',
			});
	} catch (error) {
		await sendClosedDm(interaction);
		await unavailableDm(interaction.user.id);
	}
}
