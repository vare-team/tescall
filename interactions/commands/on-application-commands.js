import { colors, messages, modals } from '../../config.js';
import { EmbedBuilder } from 'discord.js';
import muteCommand from './mute-command.js';
import unmuteCommand from './unmute-command.js';
import closeCommand from './close-command.js';
import listCommand from './list-command.js';
import initWelcomeCommand from './initwelcome-command.js';

const commands = {
	mute: muteCommand,
	unmute: unmuteCommand,
	list: listCommand,
	close: closeCommand,
	initwelcome: initWelcomeCommand,
};

export default async function (interaction) {
	if (commands[interaction.commandName]) {
		await commands[interaction.commandName](interaction);
		return;
	}

	if (tickets.has(interaction.user.id)) {
		await interaction
			.reply({
				ephemeral: true,
				embeds: [new EmbedBuilder().setTitle(messages.waiting).setColor(colors.red)],
			})
			.catch(console.error);
		return;
	}
	await interaction.showModal(modals.resolve(interaction.commandName));
}
