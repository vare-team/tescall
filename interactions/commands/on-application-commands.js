import { modals } from '../../config.js';
import muteCommand from './mute-command.js';
import unmuteCommand from './unmute-command.js';
import closeCommand from './close-command.js';
import listCommand from './list-command.js';
import initWelcomeCommand from './initwelcome-command.js';
import hasTicket from '../../utils/has-ticket.js';

const commands = {
	mute: muteCommand,
	unmute: unmuteCommand,
	list: listCommand,
	close: closeCommand,
	initwelcome: initWelcomeCommand,
};

/**
 * @param {import('discord.js').CommandInteraction} interaction
 * @returns {Promise<void>}
 */
export default async function (interaction) {
	if (commands[interaction.commandName]) {
		await commands[interaction.commandName](interaction);
		return;
	}

	if (await hasTicket(interaction)) return;

	await interaction.showModal(modals.resolve(interaction.commandName));
}
