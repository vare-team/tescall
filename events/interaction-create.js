import onModalSubmit from '../interactions/modals/on-modal-submit.js';
import onMessageComponents from '../interactions/message_components/on-message-components.js';
import onApplicationCommands from '../interactions/commands/on-application-commands.js';
import { EmbedBuilder } from 'discord.js';
import { colors, Permissions, ticketsErrors } from '../config.js';

export default async function (interaction) {
	const member = await mainGuild.members.fetch(interaction.user.id);
	if (mutes.has(member.id) && !member.permissions.has(Permissions.ModerateMembers)) {
		const date = mutes.get(member.id);
		if (date > Date.now() / 1000) {
			await interaction
				.reply({
					ephemeral: true,
					embeds: [
						new EmbedBuilder()
							.setTitle(date === Infinity ? ticketsErrors.mutedForever : ticketsErrors.muted)
							.setColor(colors.red),
					],
				})
				.catch(console.error);
			return;
		}
		mutes.delete(member);
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
