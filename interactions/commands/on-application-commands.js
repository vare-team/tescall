import { colors, messages, modals } from '../../config.js';
import { MessageEmbed } from 'discord.js';
import muteCommand from './mute-command.js';
import unmuteCommand from './unmute-command.js';

export default async function (interaction) {
	if (interaction.commandName === 'mute') {
		await muteCommand(interaction);
		return;
	}

	if (interaction.commandName === 'unmute') {
		await unmuteCommand(interaction);
		return;
	}

	if (tickets.has(interaction.user.id)) {
		await interaction
			.reply({
				ephemeral: true,
				embeds: [new MessageEmbed().setTitle(messages.waiting).setColor(colors.red)],
			})
			.catch(console.error);
		return;
	}
	await interaction.showModal(modals.resolve(interaction.commandName));
}
