import { colors } from '../config.js';
import log from '../utils/log.js';
import closeTickets from '../utils/close-tickets.js';
import removeTicket from '../utils/remove-ticket.js';
import sendGoodbye from '../utils/send-goodbye.js';
import { ChannelType } from 'discord.js';
import getMember from '../utils/get-member.js';

export default async function (message) {
	if (message.author.bot) return;

	if (message.channel.type === ChannelType.DM) {
		const user = (await getMember(message.author.id)) ?? message.author;
		const ticket = tickets.get(user.id);
		if (!ticket?.messageLinks[message.id]) return;
		const opt = {
			username: user.displayName,
			avatarURL: user.displayAvatarURL(),
			threadId: ticket.thread,

			...(message.content.length && { content: message.content }),
			...(message.attachments.size && { files: message.attachments.map(a => a.url) }),

			embeds: [
				...(message.stickers.size
					? [{ description: `Отправил стикер «${message.stickers.first().name}»\n`, color: colors.blue }]
					: []),
				{ description: 'Сообщение было удалено', color: colors.red },
			],
		};

		await discordWebhook.editMessage(ticket.messageLinks[message.id], opt);
		return;
	}

	if (message.channel.type === ChannelType.GuildPublicThread && threads.has(message.channel.id)) {
		if (!tickets.get(threads.get(message.channel.id))?.messageLinks[message.id]) return;

		const user = await discordClient.users.fetch(threads.get(message.channel.id));
		const fetchedMessage = await user.dmChannel.messages.fetch(tickets.get(user.id).messageLinks[message.id]);

		await fetchedMessage
			.delete()
			.then(() => log(`Сообщение было удалено и переслано! @${message.author.id}`))
			.catch(closeTickets(message.channel.id));
		return;
	}

	if (message.channel.id === process.env.CHANNEL && threads.has(message.id)) {
		const userId = threads.get(message.id);
		const user = await discordClient.users.fetch(userId);

		const check = await sendGoodbye(user);
		if (!check) return;

		await removeTicket(userId);
	}
}
