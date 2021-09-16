import { MessageEmbed, MessageActionRow, MessageButton } from "discord.js";

export default async function(client, inter, userId) {
    if (client.userLib.tickets.has(userId)) {

        const user = await client.users.fetch(userId);

        let embed = inter.message.embeds[0];
        embed.color = "#7083CF";

        inter.update({
            embeds: [embed],
            components: [
                new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId("CLOSE:" + userId)
                            .setLabel('Закрыть тикет')
                            .setStyle('SUCCESS')
                    )
            ]
        });

        let thread = await inter.message.startThread({name: user.tag});
        client.userLib.threads.set(thread.id, userId);
        client.userLib.tickets.set(userId, {resolver: inter.user.id, thread: thread.id, messageLinks: new Map(),});

        console.log(client.userLib.getTime() + `Тикет был открыт! @${userId}`);

        client.users.fetch(userId).then((user) => {
            return user.send({
                embeds: [
                    new MessageEmbed()
                        .setTitle(client.userLib.config.stuffJoined)
                        .setDescription(client.userLib.config.chatEnabled)
                        .setColor("#378D53")
                ]
            });
        });
    } else {
        inter.reply({
            content: `Тикет #${userId} уже закрыт!`,
            ephemeral: true
        })
    }
}