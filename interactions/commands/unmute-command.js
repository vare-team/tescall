import saveTickets from '../../utils/save-tickets.js';

export default async function (interaction) {
	const user = interaction.options.getUser('user');

	if (!mutes.has(user.id.toString())) {
		await interaction.reply({
			content: `<@${user.id}> isn't muted`,
			ephemeral: true,
			allowedMentions: {},
		});
		return;
	}

	mutes.delete(user.id.toString());
	saveTickets();
	await interaction.reply({
		content: `<@${user.id}> unmuted`,
		ephemeral: true,
		allowedMentions: { repliedUser: false },
	});
}
