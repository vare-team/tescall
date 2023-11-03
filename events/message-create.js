import log from '../utils/log.js';
import directMessages from '../utils/direct-messages.js';
import unavailableDm from '../utils/unavailable-dm.js';
import { ChannelType } from 'discord.js';
import getMember from '../utils/get-member.js';

/**
 * @param message {Message}
 * @return {Promise<void>}
 */
export default async function (message) {
	if (message.author.bot) return;

	if (message.channel.type === ChannelType.DM) {
		await directMessages(message);
		return;
	}

	const id = message.channel.id;

	if (message.channel.type === ChannelType.GuildPublicThread && threads.has(id)) {
		const moderator = (await getMember(message.author.id)) ?? message.author;
		const opt = {
			...(message.content.length && { content: `**${moderator.displayName}**:\n${message.content}` }),
			...(message.attachments.size && { files: message.attachments.map(a => a.url) }),
		};

		const user = await discordClient.users.fetch(threads.get(id));
		const sendedMsg = await user.send(opt).catch(unavailableDm(user.id));
		if (!sendedMsg) return;

		tickets.get(user.id).messageLinks[message.id] = sendedMsg.id;
		log(`Сообщение было получено и переслано! @${message.author.id}`);
	}
}
