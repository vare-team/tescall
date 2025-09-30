import ms from 'ms';
import saveTickets from '../../utils/save-tickets.js';
import { messages } from '../../config.js';

/**
 * @param {import('discord.js').CommandInteraction} interaction
 * @returns {Promise<void>}
 */
export default async function (interaction) {
	const user = interaction.options.getUser('user');
	const timeRaw = interaction.options.getString('time');
	const time = timeRaw < 0 ? Infinity : parseInt(((Date.now() + ms(timeRaw)) / 1000).toFixed());

	mutes.set(user.id.toString(), time);
	saveTickets();
	await interaction.reply({
		content: messages.mute.replace('%USER%', user).replace('%TIME%', time === Infinity ? 'Навсегда' : `<t:${time}:R>`),
		flags: 'Ephemeral',
		allowedMentions: { repliedUser: false },
	});
}
