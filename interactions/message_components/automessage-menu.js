import { messages, repliesMessages } from '../../config.js';
import log from '../../utils/log.js';
import closeTickets from '../../utils/close-tickets.js';

/**
 * @param {import('discord.js').StringSelectMenuComponent} interaction
 * @returns {Promise<void>}
 */
export default async function (interaction) {
	const interactor = interaction.member ?? interaction.user;
	const message = await discordWebhook.send({
		username: interactor.displayName,
		avatarURL: interactor.displayAvatarURL(),
		threadId: interaction.message.id,
		content: repliesMessages[interaction.values[0]],
		embeds: [{ description: messages.quickReply }],
	});

	const user = await discordClient.users.fetch(threads.get(interaction.message.id));

	const sendedMsg = await user
		.send(`**${interactor.displayName}**: ${repliesMessages[interaction.values[0]]}`)
		.catch(closeTickets(interaction.message.id));

	if (!sendedMsg) return;

	tickets.get(user.id).messageLinks[message.id] = sendedMsg.id;
	await interaction.reply({ content: messages.responseSent, flags: 'Ephemeral' });
	log(`Сообщение было получено и переслано!`);
}
