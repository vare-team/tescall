import { repliesMessages } from "../../config";

export default async function(client, inter) {
	let message = await client.userLib.webHook.send({
		username: inter.user.username,
		avatarURL: client.user.displayAvatarURL(),
		threadId: inter.message.id,
		content: repliesMessages[inter.values[0]],
		embeds: [{description: "Быстрый ответ"}]
	});

	client.users.fetch(client.userLib.threads.get(inter.message.id)).then((user) => {
		user.send(`**${inter.user.username}**: ${repliesMessages[inter.values[0]]}`).then((sendedMsg) => {
			console.log(client.userLib.getTime() + `Сообщение было получено и переслано!`);
			client.userLib.tickets.get(user.id).messageLinks[message.id] = sendedMsg.id;
		})
	});

	inter.reply({content: "Ответ отправлен!", ephemeral: true});
}