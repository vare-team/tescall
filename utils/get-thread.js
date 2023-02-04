export default function (userId) {
	const channel = discordClient.channels.cache.get(process.env.CHANNEL);

	return channel.threads.fetch(tickets.get(userId)?.thread ?? 0);
}
