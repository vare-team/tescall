export default async function (userId) {
	return await mainGuild.members.fetch(userId);
}
