import { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } from 'discord.js';
import { colors, messages, replies } from '../../config.js';
import log from '../../utils/log.js';
import saveTickets from '../../utils/save-tickets.js';
import closeTickets from '../../utils/close-tickets.js';

export default async function (inter) {
	const userId = inter.user.id;

	if (!tickets.has(userId)) {
		await inter.reply({ content: `Тикет #${userId} уже закрыт!`, ephemeral: true });
		return;
	}

	await inter.update({
		embeds: [{ ...inter.message.embeds[0], color: colors.green }],
		components: [
			new MessageActionRow().addComponents(
				new MessageButton()
					.setCustomId('CLOSE')
					.setLabel('Закрыть тикет')
					.setStyle('SUCCESS')
			),
			new MessageActionRow().addComponents(
				new MessageSelectMenu()
					.setCustomId('AUTOMESSAGE')
					.addOptions(replies)
					.setPlaceholder('Быстрый ответ')
			),
		],
	});

	const user = await discordClient.users.fetch(userId);
	const thread = await inter.message.startThread({ name: user.tag });

	threads.set(thread.id, userId);

	let ticket = tickets.get(userId);
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
		.catch(closeTickets(inter.message.id));

	log(`Тикет был открыт! @${userId}`);
}
