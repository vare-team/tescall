import buttonTake from '../buttons/take.js';
import buttonClose from '../buttons/close.js';
import automessageMenu from './automessage-menu.js';
import log from '../../utils/log.js';

export default async function (interaction) {
	switch (interaction.customId) {
		case 'GET':
			await buttonTake(interaction);
			break;

		case 'CLOSE':
			await buttonClose(interaction);
			break;

		case 'AUTOMESSAGE':
			await automessageMenu(interaction);
			break;

		default:
			log(`Что-то странное! custom-id: ${interaction.customId}`);
	}
}
