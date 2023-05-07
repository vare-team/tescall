import { EmbedBuilder } from 'discord.js';
import { colors, messages } from '../config.js';

export default async function (interaction) {
	if (tickets.has(interaction.user.id)) {
		await interaction
			.reply({
				ephemeral: true,
				embeds: [new EmbedBuilder().setTitle(messages.waiting).setColor(colors.red)],
			})
			.catch(console.error);

		return true;
	}

	return false;
}
