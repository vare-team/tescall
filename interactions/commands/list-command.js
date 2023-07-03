export default async function (interaction) {
	interaction.reply({
		content: `Список тикетов:\n${[...tickets.entries()].reduce(
			(p, [u, t], i) =>
				`${p}\n${i + 1}. Взят: **${
					t.active ? 'Да' : 'Нет'
				}** Пользователь: <@${u}> (\`${u}\`) Тикет: https://discord.com/channels/${mainGuild.id}/${ticketsChannel.id}/${
					t.thread
				}(<#${t.thread}>)`,
			''
		)}`,
		flags: 'SuppressEmbeds',
	});
}
