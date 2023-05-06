import modalsSendHello from './modals-send-hello.js';
import createTicket from '../../utils/create-ticket.js';
import { colors, TicketTitles, TicketTopics } from '../../config.js';
import { EmbedBuilder } from 'discord.js';
import hasTicket from '../../utils/has-ticket.js';

export default async function (interaction) {
	if (await hasTicket(interaction)) return;

	let ticketTopic;

	try {
		ticketTopic = TicketTopics[interaction.customId](interaction);
	} catch (err) {
		await interaction.reply({ embeds: [new EmbedBuilder().setTitle(err).setColor(colors.red)] }).catch(console.error);
		return;
	}

	await createTicket(TicketTitles[interaction.customId], interaction.user, ticketTopic);

	await modalsSendHello(interaction);
}
