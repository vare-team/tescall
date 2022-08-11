import onModalSubmit from '../interactions/modals/on-modal-submit.js';
import onMessageComponents from '../interactions/message_components/on-message-components.js';
import onApplicationCommands from '../interactions/commands/on-application-commands.js';
import { MessageEmbed } from 'discord.js';
import { colors, ticketsErrors } from '../config.js';

export default async function (inter) {
	if (inter.type !== 'MESSAGE_COMPONENT') return;

		mutes.delete(inter.user.id);
	}

	if (inter.isApplicationCommand()) {
		await onApplicationCommands(inter);
		return;
	}

	if (inter.isModalSubmit()) {
		await onModalSubmit(inter);
		return;
	}

	if (inter.isMessageComponent()) {
		await onMessageComponents(inter);
	}
}
