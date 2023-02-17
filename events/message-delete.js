import { colors } from '../config.js';
import log from '../utils/log.js';
import closeTickets from '../utils/close-tickets.js';
import removeTicket from '../utils/remove-ticket.js';
import sendGoodbye from '../utils/send-goodbye.js';

export default async function (msg) {
	if (msg.channel.type === 'DM' && !msg.author.bot) {
		const ticket = tickets.get(msg.author.id.toString());
		if (!ticket?.messageLinks[msg.id]) return;
		const opt = {
			username: msg.author.username,
			avatarURL: msg.author.displayAvatarURL(),
			threadId: ticket.thread,

			...(msg.content.length && { content: msg.content }),
			...(msg.attachments.size && { files: msg.attachments.map(a => a.url) }),

			embeds: [
				...(msg.stickers.size
					? [{ description: `Отправил стикер «${msg.stickers.first().name}»\n`, color: colors.blue }]
					: []),
				{ description: 'Сообщение было удалено', color: colors.red },
			],
		};

		await discordWebhook.editMessage(ticket.messageLinks[msg.id], opt);
		return;
	}

	if (msg.channel.type === 'GUILD_PUBLIC_THREAD' && threads.has(msg.channel.id)) {
		if (!tickets.get(threads.get(msg.channel.id))?.messageLinks[msg.id]) return;

		const user = await discordClient.users.fetch(threads.get(msg.channel.id));
		const fetchedMessage = await user.dmChannel.messages.fetch(tickets.get(user.id).messageLinks[msg.id]);

		await fetchedMessage
			.delete()
			.then(() => log(`Сообщение было удалено и переслано! @${msg.author.id}`))
			.catch(closeTickets(msg.channel.id));
		return;
	}

	if (msg.channel.id === process.env.CHANNEL && threads.has(msg.id)) {
		const userId = threads.get(msg.id);
		const user = await discordClient.users.fetch(userId);

		const check = await sendGoodbye(user);
		if (!check) return;

		await removeTicket(userId);
	}
}
