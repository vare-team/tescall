import { EmbedBuilder } from 'discord.js';
import { colors, messages } from '../../config.js';

export default async function (interaction) {
	await interaction.reply({
		embeds: [
			new EmbedBuilder()
				.setTitle(messages.hello.replace('%NAME%', interaction.user.username))
				.setDescription(messages.helloDescription)
				.setColor(
					mainGuild.members.cache.get(interaction.user.id) ??
						(await mainGuild.members.fetch(interaction.user.id))?.roles.cache.has(process.env.ROLE)
						? colors.yellow
						: colors.blue
				),
		],
	});
}
