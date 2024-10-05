import { colors, messages } from '../config.js';
import { EmbedBuilder } from 'discord.js';
import unavailableDm from './unavailable-dm.js';

/**
 * @param {import('discord.js').User} user
 * @returns {Promise<void>}
 */
export default async function (user) {
	return await user
		.send({
			embeds: [
				new EmbedBuilder()
					.setTitle(messages.goodbye)
					.setDescription(messages.goodbyeDescription)
					.setColor(colors.green),
			],
		})
		.catch(unavailableDm(user.id));
}
