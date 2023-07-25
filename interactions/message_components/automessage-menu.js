import { repliesMessages } from '../../config.js';
import log from '../../utils/log.js';
import closeTickets from '../../utils/close-tickets.js';

export default async function (interaction) {
	const interactor = interaction.member ?? interaction.user;
	const message = await discordWebhook.send({
		username: interactor.displayName,
		avatarURL: interactor.displayAvatarURL(),
		threadId: interaction.message.id,
		content: repliesMessages[interaction.values[0]],
		embeds: [{ description: 'Быстрый ответ' }],
	});

	const user = await discordClient.users.fetch(threads.get(interaction.message.id));

	const sendedMsg = await user
		.send(`**${interactor.displayName}**: ${repliesMessages[interaction.values[0]]}`)
		.catch(closeTickets(interaction.message.id));

	if (!sendedMsg) return;

	tickets.get(user.id).messageLinks[message.id] = sendedMsg.id;
	await interaction.reply({ content: 'Ответ отправлен!', ephemeral: true });
	log(`Сообщение было получено и переслано!`);
}
