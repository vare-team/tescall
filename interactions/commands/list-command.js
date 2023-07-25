export default async function (interaction) {
	interaction.reply({
		content: `${tickets.size > 0 ? 'Список тикетов:\n' : 'Тикетов нет'}${[...tickets.entries()].reduce(
			(p, [userId, ticket], index) =>
				`${p}${index + 1}. ` +
				`[сообщение](https://discord.com/channels/${mainGuild.id}/${ticketsChannel.id}/${ticket.thread})` +
				`(<#${ticket.thread}>)` +
				`  - Взят: **${ticket.active ? 'Да' : 'Нет'}** ` +
				`  - Пользователь: <@${userId}> (\`${userId}\`) ` +
				'\n\n',
			''
		)}`,
		flags: 'SuppressEmbeds',
	});
}
