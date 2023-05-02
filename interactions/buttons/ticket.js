import { modals } from '../../config.js';

export default async function (interaction) {
	const modal = modals.resolve(interaction.customId);

	interaction.showModal(modal);
}
