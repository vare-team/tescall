import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from 'discord.js';
import { ButtonStyle, colors, TicketTitles } from '../config.js';
import saveTickets from './save-tickets.js';
import log from './log.js';

/**
 * @param {String} title
 * @param {import('discord.js').User} user
 * @param {String} content
 * @param {import('discord.js').Message['attachments']} attachments
 * @returns {Promise<void>}
 */
export default async function (title = TicketTitles.DEFAULT, user, content, attachments = {}) {
	const member = await mainGuild.members.fetch(user.id);
	const role = boosterRole ? member.roles.resolve(boosterRole.id) : null;
	const sendedMsg = await ticketsChannel.send({
		embeds: [
			new EmbedBuilder()
				.setTitle(title)
				.setAuthor({ name: user.username, iconURL: user.displayAvatarURL() })
				.setDescription(`<@${user.id}>:\n${content}`)
				.setColor(boosterRole && role ? colors.yellow : colors.red)
				.setImage(attachments.size ? attachments.first().url : null),
		],
		components: [
			new ActionRowBuilder().setComponents(
				new ButtonBuilder().setCustomId(`GET:${user.id}`).setLabel('Взять тикет').setStyle(ButtonStyle.Primary)
			),
		],
	});

	threads.set(sendedMsg.id, user.id);
	tickets.set(user.id, { active: false, thread: sendedMsg.id, guild: null, messageLinks: {} });
	saveTickets();
	log(`Новый тикет создан! @${user.id}`);
}
