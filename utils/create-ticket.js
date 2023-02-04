import { MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';
import { colors, TicketTitles } from '../config.js';
import saveTickets from './save-tickets.js';
import log from './log.js';

export default async function (title = TicketTitles.DEFAULT, user, content, attachments = {}) {
	tickets.set(user.id, { active: false, thread: null, guild: null, messageLinks: {} });

	const member = await mainGuild.members.fetch(user.id);
	const role = member.roles.resolve(boosterRole.id);
	const sendedMsg = await ticketsChannel.send({
		embeds: [
			new MessageEmbed()
				.setTitle(title)
				.setDescription(`<@${user.id}>:\n` + content)
				.setFooter({ text: user.username, iconURL: user.displayAvatarURL() })
				.setColor(boosterRole && role ? colors.yellow : colors.red)
				.setImage(attachments.size ? attachments.first().url : ''),
		],
		components: [
			new MessageActionRow().addComponents(
				new MessageButton().setCustomId('GET').setLabel('Взять тикет').setStyle('PRIMARY')
			),
		],
	});

	threads.set(sendedMsg.id, user.id);
	saveTickets();
	log(`Новый тикет создан! @${user.id}`);
}
