import { EmbedBuilder } from 'discord.js';
import { colors, messages } from '../config.js';
import log from './log.js';
import getMember from './get-member.js';
import saveTickets from './save-tickets.js';

/**
 * @param message {Message}
 * @param action {String}
 * @return {Promise<void>}
 */
export default async function (message, action = '') {
	const client = message.client;
	const user = (await getMember(message.author.id)) ?? message.author;
	if (!tickets.has(user.id)) {
		const commands = await client.application.commands.fetch();
		const general = commands.find(x => x.name === 'general_request');
		const recheck = commands.find(x => x.name === 'bot_recheck');

		await message.channel
			.send({
				embeds: [
					new EmbedBuilder()
						.setTitle(messages.noTickets)
						.setDescription(
							messages.noTicketsDescription
								.replace('%GENERAL_NAME%', general.name)
								.replace('%GENERAL_ID%', general?.id ?? 0)
								.replace('%RECHECK_NAME%', recheck.name)
								.replace('%RECHECK_ID%', recheck?.id ?? 0)
						)
						.setColor(colors.red),
				],
			})
			.catch(console.error);
		return;
	}

	const ticket = tickets.get(user.id);

	if (!ticket.active) {
		await message.channel
			.send({ embeds: [new EmbedBuilder().setTitle(messages.waiting).setColor(colors.red)] })
			.catch(console.error);

		log(`Сообщение было получено, но тикет не принят! @${user.id}`);
		return;
	}

	if (!ticket.thread) return;

	const opt = {
		username: user.displayName,
		avatarURL: user.displayAvatarURL(),
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
	tickets.get(user.id).messageLinks[message.id] = sendedMsg.id;
	saveTickets();
	log(`Сообщение было получено и переслано! @${user.id}`);
}
