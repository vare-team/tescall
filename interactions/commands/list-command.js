import declension from '../../utils/declension.js';

/**
 * @param {import('discord.js').CommandInteraction} interaction
 * @returns {Promise<void>}
 */
export default async function (interaction) {
	const ticketEntries = [...tickets.entries()];
	const maxTickets = 4;
	const remainingTickets = ticketEntries.length - maxTickets;
	let ticketList = ticketEntries
		.slice(0, maxTickets)
		.reduce(
			(p, [userId, ticket], index) =>
				`${p}${index + 1}. ` +
				`[сообщение](https://discord.com/channels/${mainGuild.id}/${ticketsChannel.id}/${ticket.thread})` +
				`(<#${ticket.thread}>)` +
				`\n  - Взят: **${ticket.active ? 'Да' : 'Нет'}** ` +
				`\n  - Пользователь: <@${userId}> (\`${userId}\`) ` +
				'\n\n',
			''
		);

	if (remainingTickets > 0)
		ticketList += `И ещё ${remainingTickets} ${declension(remainingTickets, ['тикет', 'тикета', 'тикетов'])}`;
	interaction.reply({
		content: `${tickets.size > 0 ? 'Список тикетов:\n' : 'Тикетов нет'}${ticketList}`,
		flags: 'SuppressEmbeds',
	});
}
