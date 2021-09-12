const { MessageEmbed } = require("discord.js");

module.exports = async function (client, inter, userId) {
    client.users.fetch(userId).then((user) => {
        const embedDM = new MessageEmbed()
            .setTitle(client.userLib.config.autoMessages.goodbye)
            .setDescription(client.userLib.config.autoMessages.goodbyeDescription)
            .setColor("#378D53");

        user.send( {embeds: [embedDM]} );
    });

    let embed = inter.message.embeds[0];
    embed.title = client.userLib.config.autoMessages.goodbye;
    embed.color = "#378D53";

    inter.update({embeds: [embed], components: []});

    await client.userLib.tickets.get(userId).thread.setArchived(true, client.userLib.config.autoMessages.goodbye);

    client.userLib.tickets.delete(userId);
    client.userLib.threads.delete(inter.message.id);

    console.log(client.userLib.getTime() + `Тикет был закрыт! @${userId}`);
}