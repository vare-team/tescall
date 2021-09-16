import $resolveMessagesDirect from "./messages/directMessage";
import $resolveMessagesThread from "./messages/thread";

export default function(client, msg, action = "send") {
    if (msg.author.id === client.user.id) return;

    try {
        if (msg.channel.type === "DM") {
            $resolveMessagesDirect(client, msg, action);
        }

        if (msg.channel.type === "GUILD_PUBLIC_THREAD" && client.userLib.threads.has(msg.channel.id)) {
            $resolveMessagesThread(client, msg, action);
        }
    } catch (e) {
        console.warn(e);
    }
}