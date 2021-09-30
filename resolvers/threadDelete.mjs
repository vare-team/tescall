import {MessageEmbed} from "discord.js";
import {colors} from "../config.js";

export default async function(client, thread) {
	if (!client.userLib.threads.has(thread.id)) return;

	const ticketMsg = await thread.parent.messages.fetch(thread.id),
		  userId 	= client.userLib.threads.get(thread.id);

	client.users.fetch(userId).then((user) => {
		user.send({
			embeds: [
				new MessageEmbed()
					.setTitle(client.userLib.config.goodbye)
					.setDescription(client.userLib.config.goodbyeDescription)
					.setColor(colors.green)
			]
		});
	});

	if (ticketMsg) {
		let embed = ticketMsg.embeds[0];
		embed.title = client.userLib.config.goodbye;
		embed.color = colors.grey;

		await ticketMsg.edit({embeds: [embed], components: []});
	}

	client.userLib.tickets.delete(userId);
	client.userLib.threads.delete(thread.id);

	console.log(client.userLib.getTime() + `Тикет закрыт! @${userId}`);
}