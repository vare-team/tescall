import ms from 'ms';
import saveTickets from '../../utils/save-tickets.js';

export default async function (interaction) {
	const user = interaction.options.getUser('user');
	const time = parseInt(((Date.now() + ms(interaction.options.getString('time'))) / 1000).toFixed());

	mutes.set(user.id.toString(), time);
	saveTickets();
	await interaction.reply({
		content: `<@${user.id}> muted: <t:${time}:R>`,
		ephemeral: true,
		allowedMentions: { repliedUser: false },
	});
}
