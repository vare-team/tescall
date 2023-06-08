import ms from 'ms';
import saveTickets from '../../utils/save-tickets.js';

export default async function (interaction) {
	const user = interaction.options.getUser('user');
	const timeRaw = interaction.options.getString('time');
	const time = timeRaw < 0 ? Infinity : parseInt(((Date.now() + ms(timeRaw)) / 1000).toFixed());

	mutes.set(user.id.toString(), time);
	saveTickets();
	await interaction.reply({
		content: time === Infinity ? `<@${user.id}> muted forever` : `<@${user.id}> muted: <t:${time}:R>`,
		ephemeral: true,
		allowedMentions: { repliedUser: false },
	});
}
