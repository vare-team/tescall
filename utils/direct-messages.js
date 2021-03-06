import { MessageEmbed, MessageActionRow, MessageButton } from 'discord.js';
import { colors, messages } from '../config.js';
import log from './log.js';
import saveTickets from './save-tickets.js';

export default async function (msg, action) {
	if (!tickets.has(msg.author.id)) {
		tickets.set(msg.author.id, { active: false, thread: null, guild: null, messageLinks: {} });

		await msg.channel.send({
			embeds: [
				new MessageEmbed()
					.setTitle(messages.hello.replace('%NAME%', msg.author.username))
					.setDescription(messages.helloDescription)
					.setColor(msg.member?.roles.cache.has(process.env.ROLE) ? colors.yellow : colors.blue),
			],
		});

		const sendedMsg = await discordClient.channels.cache.get(process.env.CHANNEL).send({
			embeds: [
				new MessageEmbed()
					.setTitle('Новый тикет!')
					.setDescription(
						(msg.stickers.size ? `Отправил стикер «${msg.stickers.first().name}»\n` : '') +
							`<@${msg.author.id}>: ` +
							msg.content
					)
					.setFooter(msg.author.username, msg.author.displayAvatarURL())
					.setColor(colors.red)
					.setImage(msg.attachments.size ? msg.attachments.first().url : ''),
			],
			components: [
				new MessageActionRow().addComponents(
					new MessageButton()
						.setCustomId('GET:' + msg.author.id)
						.setLabel('Взять тикет')
						.setStyle('PRIMARY')
				),
			],
		});

		threads.set(sendedMsg.id, msg.author.id);
		saveTickets();
		log(`Новый тикет создан! @${msg.author.id}`);
		return;
	}

	const ticket = tickets.get(msg.author.id);

	if (!ticket.active) {
		await msg.channel
			.send({ embeds: [new MessageEmbed().setTitle(messages.waiting).setColor(colors.red)] })
			.catch(console.error);

		log(`Сообщение было получено, не тикет не подтверждён! @${msg.author.id}`);
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
