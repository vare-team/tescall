import { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } from 'discord.js';
import { colors, messages, replies } from '../../config.js';
import log from '../../utils/log.js';
import saveTickets from '../../utils/save-tickets.js';

export default async function (inter) {
	const [, userId] = inter.customId.split(':');

	if (!tickets.has(userId)) {
		await inter.reply({ content: `Тикет #${userId} уже закрыт!`, ephemeral: true });
		return;
	}

	await inter.update({
		embeds: [{ ...inter.message.embeds[0], color: colors.green }],
		components: [
			new MessageActionRow().addComponents(
				new MessageButton()
					.setCustomId('CLOSE:' + userId)
					.setLabel('Закрыть тикет')
					.setStyle('SUCCESS')
			),
			new MessageActionRow().addComponents(
				new MessageSelectMenu()
					.setCustomId('AUTOMESSAGE:' + userId)
					.addOptions(replies)
					.setPlaceholder('Быстрый ответ')
			),
		],
	});

	const user = await discordClient.users.fetch(userId);
	const thread = await inter.message.startThread({ name: user.tag });

	threads.set(thread.id, userId);
	tickets.get(userId).thread = thread.id;
	tickets.get(userId).guild = thread.guildId;
	tickets.get(userId).active = true;
	saveTickets();

	await user
		.send({
			embeds: [
				new MessageEmbed().setTitle(messages.stuffJoined).setDescription(messages.chatEnabled).setColor(colors.green),
			],
		})
		.catch(console.error);

	log(`Тикет был открыт! @${userId}`);
}
