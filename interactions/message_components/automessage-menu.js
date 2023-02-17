import { repliesMessages } from '../../config.js';
import log from '../../utils/log.js';
import closeTickets from '../../utils/close-tickets.js';

export default async function (inter) {
	const message = await discordWebhook.send({
		username: inter.user.username,
		avatarURL: inter.user.displayAvatarURL(),
		threadId: inter.message.id,
		content: repliesMessages[inter.values[0]],
		embeds: [{ description: 'Быстрый ответ' }],
	});

	const user = await discordClient.users.fetch(threads.get(inter.message.id));

	const sendedMsg = await user
		.send(`**${inter.user.username}**: ${repliesMessages[inter.values[0]]}`)
		.catch(closeTickets(inter.message.id));

	if (!sendedMsg) return;

	tickets.get(user.id.toString()).messageLinks[message.id] = sendedMsg.id;
	await inter.reply({ content: 'Ответ отправлен!', ephemeral: true });
	log(`Сообщение было получено и переслано!`);
}
