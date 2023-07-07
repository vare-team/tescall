export default async function (interaction) {
	interaction.reply({
		content:
			'Список тикетов:\n' +
			`${[...tickets.entries()].reduce(
				(p, [userId, ticket], index) =>
					`${p}\n\n${index + 1}.
					[сообщение](https://discord.com/channels/${mainGuild.id}/${ticketsChannel.id}/${ticket.thread})
					(<#${ticket.thread}>)` +
					`  - Взят: **${ticket.active ? 'Да' : 'Нет'}** ` +
					`  - Пользователь: <@${userId}> (\`${userId}\`)`,
				''
			)}`,
		flags: 'SuppressEmbeds',
	});
}
