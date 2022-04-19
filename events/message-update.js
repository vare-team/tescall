import log from '../utils/log.js';
import directMessages from '../utils/direct-messages.js';

export default async function (oldMsg, msg) {
	if (msg.channel.type === 'DM' && !msg.author.bot) {
		await directMessages(msg, 'edit');
	}

	if (msg.channel.type === 'GUILD_PUBLIC_THREAD' && threads.has(msg.channel.id)) {
		if (!tickets.get(threads.get(msg.channel.id))?.messageLinks[msg.id]) return;

		const opt = { ...(msg.content.length && { content: `**${msg.author.username}**: ${msg.content}` }) };
		const user = await discordClient.users.fetch(threads.get(msg.channel.id));
		const fetchedMessage = await user.dmChannel.messages.fetch(tickets.get(user.id).messageLinks[msg.id]);

		await fetchedMessage
			.edit(opt)
			.then(() => log(`Сообщение было отредактировано и переслано! @${msg.author.id}`))
			.catch(console.error);
	}
}
