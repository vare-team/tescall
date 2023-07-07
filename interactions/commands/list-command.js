export default async function (interaction) {
	interaction.reply({
		content:
			'Список тикетов:\n' +
			`${[...tickets.entries()].reduce(
				(p, [userId, ticket], index) =>
					`${p}\n${index + 1}. ` +
					`Взят: **${ticket.active ? 'Да' : 'Нет'}** ` +
					`Пользователь: <@${userId}> (\`${userId}\`) ` +
					`Тикет:
					 [сообщение](https://discord.com/channels/${mainGuild.id}/${ticketsChannel.id}/${ticket.thread})
					 (<#${ticket.thread}>)`,
				''
			)}`,
		flags: 'SuppressEmbeds',
	});
}
