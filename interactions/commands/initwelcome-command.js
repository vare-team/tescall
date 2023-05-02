import { colors, messages } from '../../config.js';
import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, CommandInteraction} from 'discord.js';

export default async function (interaction = CommandInteraction.prototype) {
	const embed = new EmbedBuilder({
		title: messages.initWelcome,
		description: messages.initWelcomeDescription,
		color: colors.grey
	});
	const components = [new ActionRowBuilder().setComponents([
		new ButtonBuilder().setCustomId("ticket_DEFAULT").setLabel("Вопрос").setStyle(2),
		new ButtonBuilder().setCustomId("ticket_GENERAL").setLabel("Помощь").setStyle(2),
		new ButtonBuilder().setCustomId("ticket_RECHECK").setLabel("Перепроверка").setStyle(2),
	])];

	await interaction.channel.send({components: components, embeds: [embed]});
	interaction.reply({content: "Сообщение было отправлено в текущий канал.", ephemeral: true});
}
