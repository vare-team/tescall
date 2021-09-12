const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = function (client, msg) {
    if (!client.userLib.tickets.has(msg.author.id)) {
        client.userLib.tickets.set(msg.author.id, {});
        const embedDM = new MessageEmbed()
            .setTitle(client.userLib.config.autoMessages.hello.replace("%NAME%", msg.author.username))
            .setDescription(client.userLib.config.autoMessages.helloDescription)
            .setColor("#7083CF");

        msg.channel.send( {embeds: [embedDM]} )

        const embed = new MessageEmbed()
                .setTitle("Новый тикет!")
                .setDescription(`<@${msg.author.id}>: ` + msg.content)
                .setFooter(msg.author.username, msg.author.displayAvatarURL())
                .setColor("#D82D42"),
              row = new MessageActionRow().addComponents(new MessageButton().setCustomId("GET:" + msg.author.id).setLabel('Взять тикет').setStyle('PRIMARY'));

        if (msg.attachments.size) embed.setImage(msg.attachments.first().url);

        console.log(client.userLib.getTime() + `Новый тикет создан! @${msg.author.id}`);

        return client.userLib.channel.send({
            embeds: [embed],
            components: [row]
        })
    }

    if (!client.userLib.tickets.get(msg.author.id).resolver) {
        console.log(client.userLib.getTime() + `Сообщение было получено, не тикет не подтверждён! @${msg.author.id}`);

        const embed = new MessageEmbed()
            .setTitle(client.userLib.config.autoMessages.waiting)
            .setColor("#D82D42");

        return msg.channel.send({ embeds: [embed] });
    }

    if (client.userLib.tickets.get(msg.author.id).thread) {
        let opt = {
            username: msg.author.username,
            avatarURL: msg.author.displayAvatarURL(),
            threadId: client.userLib.tickets.get(msg.author.id).thread.id,
        }

        if (msg.content.length) opt.content = msg.content;
        if (msg.attachments.size) opt.files = [msg.attachments.first().url];

        console.log(client.userLib.getTime() + `Сообщение было получено и переслано! @${msg.author.id}`);

        client.userLib.webHook.send(opt);
    }
}