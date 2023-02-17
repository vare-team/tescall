import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder } from 'discord.js';
import { ButtonStyle, colors, messages, replies } from '../../config.js';
import log from '../../utils/log.js';
import saveTickets from '../../utils/save-tickets.js';
import unavailableDm from '../../utils/unavailable-dm.js';

export default async function (interaction) {
	const [, userId] = interaction.customId.split(':');

	if (!tickets.has(userId)) {
		await interaction.reply({ content: `Тикет #${userId} уже закрыт!`, ephemeral: true });
		return;
	}

	await interaction.update({
		embeds: [{ ...interaction.message.embeds[0].data, color: colors.green }],
		components: [
			new ActionRowBuilder().setComponents(
				new ButtonBuilder().setCustomId('CLOSE').setLabel('Закрыть тикет').setStyle(ButtonStyle.Success)
			),
			new ActionRowBuilder().setComponents(
				new StringSelectMenuBuilder().setCustomId('AUTOMESSAGE').addOptions(replies).setPlaceholder('Быстрый ответ')
			),
		],
	});

	const user = await discordClient.users.fetch(userId);
	const thread = await interaction.message.startThread({ name: user.tag });

	threads.set(thread.id, userId);

	const ticket = tickets.get(userId);
	ticket.thread = thread.id;
	ticket.guild = thread.guildId;
	ticket.active = true;
	saveTickets();

	await user
		.send({
			embeds: [
				new EmbedBuilder().setTitle(messages.stuffJoined).setDescription(messages.chatEnabled).setColor(colors.green),
			],
		})
		.catch(unavailableDm(userId));

	log(`Тикет был открыт! @${userId}`);
}
