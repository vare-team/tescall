import { EmbedBuilder } from 'discord.js';
import { colors, messages } from '../../config.js';

export default async function (interaction) {
	await interaction.reply({
		embeds: [
			new EmbedBuilder()
				.setTitle(messages.hello.replace('%NAME%', interaction.user.username))
				.setDescription(messages.helloDescription)
				.setColor(colors.blue),
		],
		ephemeral: interaction.channel.type !== 'DM',
	});
}
