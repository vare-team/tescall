import log from '../utils/log.js';
import directMessages from '../utils/direct-messages.js';
import closeTickets from '../utils/close-tickets.js';

export default async function (msg) {
	if (msg.channel.type === 'DM' && !msg.author.bot) {
		await directMessages(msg);
		return;
	}

	if (msg.channel.type === 'GUILD_PUBLIC_THREAD' && threads.has(msg.channel.id)) {
		if (msg.author.bot) return;

		const opt = {
			...(msg.content.length && { content: `**${msg.author.username}**: ${msg.content}` }),
			...(msg.attachments.size && { files: msg.attachments.map(a => a.url) }),
		};

		const user = await discordClient.users.fetch(threads.get(msg.channel.id));
		const sendedMsg = await user.send(opt).catch(closeTickets(msg.channel.id));
		if (!sendedMsg) return;

		tickets.get(user.id).messageLinks[msg.id] = sendedMsg.id;
		log(`Сообщение было получено и переслано! @${msg.author.id}`);
	}
}
