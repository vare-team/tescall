import { ChannelType, EmbedBuilder } from 'discord.js';
import { colors, messages } from '../../config.js';

/**
 * @param {import('discord.js').CommandInteraction} interaction
 * @returns {Promise<import('discord.js').InteractionResponse | import('discord.js').Message>}
 */
export default async function (interaction) {
	const options = {
		embeds: [
			new EmbedBuilder()
				.setTitle(messages.hello.replace('%NAME%', interaction.user.username))
				.setDescription(messages.helloDescription)
				.setColor(colors.blue),
		],
		flags: interaction.channel.type !== ChannelType.DM ? 'Ephemeral' : [],
	};
	return interaction.channel.type == ChannelType.DM
		? await interaction.reply(options)
		: await interaction.user.send(options);
}
