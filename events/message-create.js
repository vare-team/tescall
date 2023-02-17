import log from '../utils/log.js';
import directMessages from '../utils/direct-messages.js';
import unavailableDm from '../utils/unavailable-dm.js';
import { ChannelType } from 'discord.js';

/**
 * @param message {Message}
 * @return {Promise<void>}
 */
export default async function (message) {
	if (message.channel.type === ChannelType.DM && !message.author.bot) {
		await directMessages(message);
		return;
	}

	if (message.channel.type === 'GUILD_PUBLIC_THREAD' && threads.has(message.channel.id)) {
		if (message.author.bot) return;

		const opt = {
			...(message.content.length && { content: `**${message.author.username}**: ${message.content}` }),
			...(message.attachments.size && { files: message.attachments.map(a => a.url) }),
		};

		const user = await discordClient.users.fetch(threads.get(message.channel.id));
		const sendedMsg = await user.send(opt).catch(unavailableDm(user.id));
		if (!sendedMsg) return;

		tickets.get(user.id).messageLinks[message.id] = sendedMsg.id;
		log(`Сообщение было получено и переслано! @${message.author.id}`);
	}
}
