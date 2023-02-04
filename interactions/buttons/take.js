import { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } from 'discord.js';
import { colors, messages, replies } from '../../config.js';
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
		embeds: [{ ...interaction.message.embeds[0], color: colors.green }],
		components: [
			new MessageActionRow().addComponents(
				new MessageButton().setCustomId('CLOSE').setLabel('Закрыть тикет').setStyle('SUCCESS')
			),
			new MessageActionRow().addComponents(
				new MessageSelectMenu().setCustomId('AUTOMESSAGE').addOptions(replies).setPlaceholder('Быстрый ответ')
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
				new MessageEmbed().setTitle(messages.stuffJoined).setDescription(messages.chatEnabled).setColor(colors.green),
			],
		})
		.catch(unavailableDm(userId));

	log(`Тикет был открыт! @${userId}`);
}
