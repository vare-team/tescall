/**
 * @param {import('discord.js').CommandInteraction} interaction
 * @returns {Promise<void>}
 */
export default async function (interaction) {
	if (tickets.size == 0) return interaction.reply({ content: 'Тикетов нет.' });
	const maxTickets = 5;
	const ticketsChunk = Array.from({ length: Math.ceil(tickets.size / maxTickets) }, (_, ticket) =>
		[...tickets.entries()].slice(ticket * maxTickets, ticket * maxTickets + maxTickets)
	);
	const ticketList = index =>
		ticketsChunk[index].reduce(
			(p, [userId, ticket], index) =>
				`${p}${index + 1}. ` +
				`[сообщение](https://discord.com/channels/${mainGuild.id}/${ticketsChannel.id}/${ticket.thread})` +
				`(<#${ticket.thread}>)` +
				`\n  - Взят: **${ticket.active ? 'Да' : 'Нет'}** ` +
				`\n  - Пользователь: <@${userId}> (\`${userId}\`) ` +
				'\n\n',
			''
		);
	await interaction.reply({
		content: `Список тикетов:\n${ticketList(0)}`,
		flags: 'SuppressEmbeds',
	});
	for (let i = 1; i < ticketsChunk.length; i++) {
		await interaction.followUp({ content: ticketList(i) });
	}
}
