import { MessageEmbed } from 'discord.js';
import { colors, messages } from '../config.js';
import log from './log.js';

/**
 * @param message {Message}
 * @param client {Client}
 * @param action {String}
 * @return {Promise<void>}
 */
export default async function (message, client, action) {
	if (!tickets.has(message.author.id)) {
		let general = client.application.commands.cache.find(x => x.name === 'обычное_обращение');
		let recheck = client.application.commands.cache.find(x => x.name === 'перепроверка_бота');

		await message.channel
			.send({
				embeds: [
					new MessageEmbed()
						.setTitle(messages.noTickets)
						.setDescription(
							messages.noTicketsDescription
								.replace('%GENERAL_NAME%', general.name)
								.replace('%GENERAL_ID%', general.id)
								.replace('%RECHECK_NAME%', recheck.name)
								.replace('%RECHECK_ID%', recheck.id)
						)
						.setColor(colors.red),
				],
			})
			.catch(console.error);
		return;
	}

	const ticket = tickets.get(message.author.id);

	if (!ticket.active) {
		await message.channel
			.send({ embeds: [new MessageEmbed().setTitle(messages.waiting).setColor(colors.red)] })
			.catch(console.error);

		log(`Сообщение было получено, но тикет не принят! @${message.author.id}`);
		return;
	}

	if (!ticket.thread) return;

	const opt = {
		username: message.author.username,
		avatarURL: message.author.displayAvatarURL(),
		threadId: ticket.thread,

		...(message.content.length && { content: message.content }),
		...(message.attachments.size && { files: message.attachments.map(a => a.url) }),
	};

	const embeds = [
		...(message.stickers.size
			? [{ description: `Отправил стикер «${message.stickers.first().name}»\n`, color: colors.blue }]
			: []),
	];

	if (action === 'edit')
		embeds.push({
			description: `Предыдущее сообщение:
https://discord.com/channels/${ticket.guild}/${ticket.thread}/${ticket.messageLinks[message.id]}`,
			color: colors.yellow,
		});
	if (embeds.length) opt.embeds = embeds;

	const sendedMsg = await discordWebhook.send(opt);
	tickets.get(message.author.id).messageLinks[message.id] = sendedMsg.id;
	log(`Сообщение было получено и переслано! @${message.author.id}`);
}
