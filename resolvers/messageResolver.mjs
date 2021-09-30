import $resolveMessagesDirect from "./messages/directMessage";
import $resolveMessagesThread from "./messages/thread";
import {MessageEmbed} from "discord.js";
import {colors} from "../config.js";

export default async function(client, msg, action = "send") {
	if (msg.channel.type === "DM" && !msg.author.bot) {
		$resolveMessagesDirect(client, msg, action);
	}

	if (msg.channel.type === "GUILD_PUBLIC_THREAD" && client.userLib.threads.has(msg.channel.id)) {
		$resolveMessagesThread(client, msg, action);
	}

	if (msg.channel.id === client.userLib.channel.id && client.userLib.threads.has(msg.id) && action === 'deleted') {
		const userId = client.userLib.threads.get(msg.id);

		client.users.fetch(userId).then((user) => {
			user.send({
				embeds: [
					new MessageEmbed()
						.setTitle(client.userLib.config.goodbye)
						.setDescription(client.userLib.config.goodbyeDescription)
						.setColor(colors.grey)
				]
			});
		});

		client.userLib.tickets.delete(userId);
		client.userLib.threads.delete(msg.id);

		console.log(client.userLib.getTime() + `Тикет закрыт! @${userId}`);
	}
}