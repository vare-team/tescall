/**
 * @param {import("discord.js").Snowflake} userId
 * @returns {Promise<import('discord.js').GuildMember>}
 */
export default async function (userId) {
	return await mainGuild.members.fetch(userId);
}
