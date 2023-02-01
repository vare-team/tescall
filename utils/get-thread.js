export default async function (userId) {
	return await discordClient.channels.cache.get(process.env.CHANNEL).threads.fetch(tickets.get(userId).thread);
}
