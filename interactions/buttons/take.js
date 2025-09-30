import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder } from 'discord.js';
import { ButtonStyle, colors, messages, replies } from '../../config.js';
import log from '../../utils/log.js';
import saveTickets from '../../utils/save-tickets.js';
import unavailableDm from '../../utils/unavailable-dm.js';

/**
 * @param {import('discord.js').ButtonInteraction} interaction
 * @returns {Promise<void>}
 */
export default async function (interaction) {
	const [, userId] = interaction.customId.split(':');
	const moderator = interaction.member ?? interaction.user;
	if (!tickets.has(userId)) {
		await interaction.reply({ content: messages.ticketClosed.replace('%USER%', `#${userId}`), flags: 'Ephemeral' });
		return;
	}

	await interaction.update({
		embeds: [
			{
				...interaction.message.embeds[0].data,
				footer: { text: moderator.displayName, icon_url: moderator.displayAvatarURL() },
				color: colors.green,
			},
		],
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
	const thread = await interaction.message.startThread({ name: user.discriminator === '0' ? user.username : user.tag });

	threads.set(thread.id.toString(), userId);

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
