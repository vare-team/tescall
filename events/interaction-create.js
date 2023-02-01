import onModalSubmit from '../interactions/modals/on-modal-submit.js';
import onMessageComponents from '../interactions/message_components/on-message-components.js';
import onApplicationCommands from '../interactions/commands/on-application-commands.js';
import { MessageEmbed } from 'discord.js';
import { colors, ticketsErrors } from '../config.js';

export default async function (inter) {
	if (
		mutes.has(inter.user.id) &&
		!(mainGuild.members.cache.get(inter.user.id) ?? mainGuild.members.fetch(inter.user.id)).permissions.has(
			'MODERATE_MEMBERS'
		)
	) {
		let date = mutes.get(inter.user.id);
		if (date > Date.now() / 1000) {
			await inter
				.reply({
					ephemeral: true,
					embeds: [new MessageEmbed().setTitle(ticketsErrors.muted).setColor(colors.red)],
				})
				.catch(console.error);
			return;
		}

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
