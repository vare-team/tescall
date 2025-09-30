import onModalSubmit from '../interactions/modals/on-modal-submit.js';
import onMessageComponents from '../interactions/message_components/on-message-components.js';
import onApplicationCommands from '../interactions/commands/on-application-commands.js';
import { EmbedBuilder } from 'discord.js';
import { colors, Permissions, ticketsErrors } from '../config.js';
import getMember from '../utils/get-member.js';

/**
 *
 * @param {import('discord.js').BaseInteraction} interaction
 * @returns {Promise<void>}
 */
export default async function (interaction) {
	const member = interaction.member ?? (await getMember(interaction.user.id));
	if (mutes.has(member.id) && !member.permissions.has(Permissions.ModerateMembers)) {
		const date = mutes.get(member.id);

		if (date > Date.now() / 1000) {
			await interaction
				.reply({
					flags: 'Ephemeral',
					embeds: [
						new EmbedBuilder()
							.setTitle(date === Infinity ? ticketsErrors.mutedForever : ticketsErrors.muted)
							.setColor(colors.red),
					],
				})
				.catch(console.error);
			return;
		}

		mutes.delete(member.id);
	}

	if (interaction.isCommand()) {
		await onApplicationCommands(interaction);
		return;
	}

	if (interaction.isModalSubmit()) {
		await onModalSubmit(interaction);
		return;
	}

	if (interaction.isMessageComponent()) {
		await onMessageComponents(interaction);
	}
}
