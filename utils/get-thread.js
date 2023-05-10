export default async function (userId) {
	const channel = await discordClient.channels.fetch(process.env.CHANNEL);

	return channel.threads.fetch(tickets.get(userId)?.thread ?? 0);
}
