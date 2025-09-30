import { colors, messages } from '../../config.js';
import { EmbedBuilder, ActionRowBuilder, ButtonBuilder } from 'discord.js';

/**
 * @param {import('discord.js').CommandInteraction} interaction
 * @returns {Promise<void>}
 */
export default async function (interaction) {
	const embed = new EmbedBuilder({
		title: interaction.options.getString('title'),
		description: interaction.options.getString('description'),
		color: colors.blue,
	});

	const components = [
		new ActionRowBuilder().setComponents([
			new ButtonBuilder().setCustomId('DEFAULT').setEmoji('💬').setLabel('Вопрос').setStyle(2),
			new ButtonBuilder().setCustomId('GENERAL').setEmoji('✉️').setLabel('Помощь').setStyle(2),
			new ButtonBuilder().setCustomId('RECHECK').setEmoji('🔩').setLabel('Перепроверка').setStyle(2),
		]),
	];

	await interaction.channel.send({ components: components, embeds: [embed] });
	interaction.reply({ content: messages.initWelcomeSent, flags: 'Ephemeral' });
}
