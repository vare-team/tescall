import { colors, messages, modals } from '../../config.js';
import { MessageEmbed } from 'discord.js';
import muteCommand from './mute-command.js';
import unmuteCommand from './unmute-command.js';
import closeCommand from './close-command.js';
import listCommand from './list-command.js';

export default async function (interaction) {
	if (commands.has(interaction.commandName)) {
		await commands[interaction.commandName](interaction);
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

const commands = {
	mute: muteCommand,
	unmute: unmuteCommand,
	list: listCommand,
	close: closeCommand,
};
