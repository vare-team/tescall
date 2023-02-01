import { colors, messages } from '../../config.js';
import removeTicket from '../../utils/remove-ticket.js';
import sendGoodbye from '../../utils/send-goodbye.js';

export default async function (inter) {
	const user = await discordClient.users.fetch(threads.get(inter.message.id));
	const check = sendGoodbye(user);

	if (!check) return;

	await inter.update({
		embeds: [{ ...inter.message.embeds[0], title: messages.goodbye, color: colors.grey }],
		components: [],
	});

	await removeTicket(user.id);
}
