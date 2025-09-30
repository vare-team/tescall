import { EmbedBuilder } from 'discord.js';
import { colors, messages } from '../config.js';
/**
 * @param {import('discord.js').CommandInteraction} interaction
 * @returns {Promise<Boolean>}
 */
export default async function (interaction) {
	if (tickets.has(interaction.user.id)) {
		await interaction
			.reply({
				flags: 'Ephemeral',
				embeds: [new EmbedBuilder().setTitle(messages.waiting).setColor(colors.red)],
			})
			.catch(console.error);

		return true;
	}

	return false;
}
