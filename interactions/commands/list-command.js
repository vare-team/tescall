/**
 * @param {import('discord.js').CommandInteraction} interaction
 * @returns {Promise<void>}
 */
export default async function (interaction) {
	if (tickets.size == 0)
		return interaction.reply({
			content: 'Тикетов нет',
		});
	const ticketsChunk = Array();
	const maxTickets = 5;
	for (let i = 0; i < tickets.size / maxTickets; i++) {
		ticketsChunk.push([...tickets].slice(i * maxTickets, i * maxTickets + maxTickets));
	}

	for (const [i, ticket] of ticketsChunk.entries()) {
		const ticketList = ticket.reduce(
			(p, [userId, ticket], index) =>
				`${p}${index + 1}. ` +
				`[сообщение](https://discord.com/channels/${mainGuild.id}/${ticketsChannel.id}/${ticket.thread})` +
				`(<#${ticket.thread}>)` +
				`\n  - Взят: **${ticket.active ? 'Да' : 'Нет'}** ` +
				`\n  - Пользователь: <@${userId}> (\`${userId}\`) ` +
				'\n\n',
			''
		);
		if (i == 0)
			await interaction.reply({
				content: `Список тикетов:\n${ticketList}`,
				flags: 'SuppressEmbeds',
			});
		if (i >= 1) await interaction.followUp({ content: ticketList });
	}
}
