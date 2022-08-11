import { MessageEmbed, MessageActionRow, MessageButton } from 'discord.js';
import { colors, messages } from '../config.js';
import log from './log.js';
import saveTickets from './save-tickets.js';

export default async function (msg, action) {
	if (!tickets.has(msg.author.id)) {
		return;
	}

	const ticket = tickets.get(msg.author.id);

	if (!ticket.active) {
		await msg.channel
			.send({ embeds: [new MessageEmbed().setTitle(messages.waiting).setColor(colors.red)] })
			.catch(console.error);

		log(`Сообщение было получено, но тикет не принят! @${msg.author.id}`);
		return;
	}

	if (!ticket.thread) return;

	const opt = {
		username: msg.author.username,
		avatarURL: msg.author.displayAvatarURL(),
		threadId: ticket.thread,

		...(msg.content.length && { content: msg.content }),
		...(msg.attachments.size && { files: msg.attachments.map(a => a.url) }),
	};

	const embeds = [
		...(msg.stickers.size
			? [{ description: `Отправил стикер «${msg.stickers.first().name}»\n`, color: colors.blue }]
			: []),
	];

	if (action === 'edit')
		embeds.push({
			description: `Предыдущее сообщение:
https://discord.com/channels/${ticket.guild}/${ticket.thread}/${ticket.messageLinks[msg.id]}`,
			color: colors.yellow,
		});
	if (embeds.length) opt.embeds = embeds;

	const sendedMsg = await discordWebhook.send(opt);
	tickets.get(msg.author.id).messageLinks[msg.id] = sendedMsg.id;
	log(`Сообщение было получено и переслано! @${msg.author.id}`);
}
