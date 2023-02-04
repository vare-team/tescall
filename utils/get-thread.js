export default async function (userId) {
	const channel = discordClient.channels.cache.get(process.env.CHANNEL);

	return await channel.threads.fetch(tickets.get(userId)?.thread ?? 0);
}
