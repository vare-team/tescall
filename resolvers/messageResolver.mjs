import $resolveMessagesDirect from "./messages/directMessage";
import $resolveMessagesThread from "./messages/thread";

export default function(client, msg, action = "send") {
	if (msg.channel.type === "DM" && !msg.author.bot) {
		$resolveMessagesDirect(client, msg, action);
	}

	if (msg.channel.type === "GUILD_PUBLIC_THREAD" && client.userLib.threads.has(msg.channel.id)) {
		$resolveMessagesThread(client, msg, action);
	}
}