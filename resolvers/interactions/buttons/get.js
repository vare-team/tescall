const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = async function (client, inter, userId) {
    if (client.userLib.tickets.has(userId)) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId("CLOSE:" + userId)
                    .setLabel('Закрыть тикет')
                    .setStyle('SUCCESS')
            );

        const user = await client.users.fetch(userId);

        let embed = inter.message.embeds[0];
        embed.color = "#7083CF";

        inter.update({
            embeds: [embed],
            components: [row]
        });
        let thread = await inter.message.startThread({name: user.tag});
        client.userLib.threads.set(thread.id, userId);
        client.userLib.tickets.set(userId, {resolver: inter.user.id, thread: thread});

        console.log(client.userLib.getTime() + `Тикет был открыт! @${userId}`);

        client.users.fetch(userId).then((user) => {
            const embedDM = new MessageEmbed()
                .setTitle(client.userLib.config.autoMessages.stuffJoined)
                .setDescription(client.userLib.config.autoMessages.chatEnabled)
                .setColor("#378D53");

            return user.send( {embeds: [embedDM]} );
        });
    } else {
        inter.reply({
            content: `Тикет #${userId}  уже закрыт!`,
            ephemeral: true
        })
    }
}