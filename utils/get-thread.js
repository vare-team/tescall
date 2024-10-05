/**
 * @param {import("discord.js").Snowflake} userId
 * @returns {Promise<import('discord.js').ThreadChannel | null>}
 */
export default async function (userId) {
	/**
	 * @type {import('discord.js').TextChannel}
	 */
	const channel = await discordClient.channels.fetch(process.env.CHANNEL);

	return channel.threads.fetch(tickets.get(userId)?.thread ?? 0);
}
