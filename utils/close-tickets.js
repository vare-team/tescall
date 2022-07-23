import { colors, messages } from '../config.js';
import saveTickets from './save-tickets.js';
import log from './log.js';

export default function (threadId) {
	return async () => {
		const user = await discordClient.users.fetch(threads.get(threadId));
		const thread = await discordClient.channels.cache
			.get(process.env.CHANNEL)
			.threads.fetch(tickets.get(user.id).thread);

		await thread.send('Не возможно отправить сообщение этому пользователю. Тикет закрывается...');
		const ticketMsg = await thread.parent.messages.fetch(threadId);

		if (ticketMsg) {
			await ticketMsg.edit({
				embeds: [{ ...ticketMsg.embeds[0], title: messages.goodbyeError, color: colors.grey }],
				components: [],
			});
		}

		await thread.setArchived(true, messages.goodbyeError);
		tickets.delete(user.id);
		threads.delete(threadId);
		saveTickets();
		log(`Тикет закрыт! @${user.id}`);
	};
}
