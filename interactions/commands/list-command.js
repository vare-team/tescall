export default async function (interaction) {
	interaction.reply({
		content: `Список тикетов:\n${[...tickets.entries()].reduce(
			(p, [u, t], i) => `${p}\n${i + 1}. Взят: **${t.active}** Пользователь: <@${u}> (\`${u}\`) Тикет: <#${t.thread}>`,
			''
		)}`,
	});
}
