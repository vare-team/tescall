import { repliesMessages } from '../config';
import log from '../utils/log.js';

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
		.catch(console.error);

	if (!sendedMsg) return;

	tickets.get(user.id).messageLinks[message.id] = sendedMsg.id;
	await inter.reply({ content: 'Ответ отправлен!', ephemeral: true });
	log(`Сообщение было получено и переслано!`);
}
