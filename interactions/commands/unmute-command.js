import { messages } from '../../config.js';
import saveTickets from '../../utils/save-tickets.js';

/**
 * @param {import('discord.js').CommandInteraction} interaction
 * @returns {Promise<void>}
 */
export default async function (interaction) {
	const user = interaction.options.getUser('user');

	if (!mutes.has(user.id)) {
		await interaction.reply({
			content: messages.notMuted.replace('%USER%', user),
			flags: 'Ephemeral',
			allowedMentions: {},
		});
		return;
	}

	mutes.delete(user.id);
	saveTickets();
	await interaction.reply({
		content: messages.unmute.replace('%USER%', user),
		flags: 'Ephemeral',
		allowedMentions: { repliedUser: false },
	});
}
