import { modals } from '../../config.js';

/**
 * @param {import('discord.js').ButtonInteraction} interaction
 * @returns {Promise<void>}
 */
export default async function (interaction) {
	const modal = modals.resolve(interaction.customId);

	interaction.showModal(modal);
}
