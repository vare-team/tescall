import log from '../utils/log.js';
import directMessages from '../utils/direct-messages.js';
import closeTickets from '../utils/close-tickets.js';

/**
 * @param oldMessage {Message}
 * @param message {Message}
 * @return {Promise<void>}
 */
export default async function (oldMessage, message) {
	if (message.channel.type === 'DM' && !message.author.bot) {
		await directMessages(message, 'edit');
		return;
	}

	const id = message.channel.id;

	if (message.channel.type === 'GUILD_PUBLIC_THREAD' && threads.has(id)) {
		if (!tickets.get(threads.get(id))?.messageLinks[message.id]) return;

		const opt = { ...(message.content.length && { content: `**${message.author.username}**: ${message.content}` }) };
		const user = await discordClient.users.fetch(threads.get(id));
		const fetchedMessage = await user.dmChannel.messages.fetch(tickets.get(user.id).messageLinks[message.id]);

		await fetchedMessage
			.edit(opt)
			.then(() => log(`Сообщение было отредактировано и переслано! @${message.author.id}`))
			.catch(closeTickets(message.channel.id));
	}
}
