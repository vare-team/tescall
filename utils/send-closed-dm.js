import { ChannelType, EmbedBuilder } from 'discord.js';
import { colors, messages } from '../config.js';

/**
 * @param {import('discord.js').BaseInteraction} interaction
 * @returns {Promise<void>}
 */
export default async function (interaction) {
	await interaction.reply({
		embeds: [
			new EmbedBuilder()
				.setTitle(messages.hello.replace('%NAME%', interaction.user.username))
				.setDescription(messages.closedDmErrorDescription)
				.setColor(colors.blue),
		],
		flags: interaction.channel.type !== ChannelType.DM ? 'Ephemeral' : [],
	});
}
