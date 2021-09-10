const discord = require('discord.js'),
      client = new discord.Client({
          intents: [
              discord.Intents.FLAGS.GUILDS,
              discord.Intents.FLAGS.DIRECT_MESSAGES,
              discord.Intents.FLAGS.GUILD_MESSAGES,
              discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING,

          ],
          partials: [
              "CHANNEL"
          ]
      }),
      config = require("./config.json");

const webHook = new discord.WebhookClient({url: process.env.WEBHOOK})

let tickets = new Map(),
    channel;

client.on("ready", async () => {
    console.log(`Auth success! Account: ${client.user.username}`);
    channel = await client.channels.fetch(config.logChannel);
})

client.on("messageCreate", msg => {
    if (msg.author.bot) return;

    if (msg.channel.type === "DM") {
        if (!tickets.has(msg.author.id)) {
            tickets.set(msg.author.id, {});
            const embedDM = new discord.MessageEmbed()
                .setDescription(config.autoMessages.hello.replace("%NAME%", msg.author.username))
                .setColor("#7083CF");

            msg.channel.send( {embeds: [embedDM]} )

            const embed = new discord.MessageEmbed()
                    .setTitle("Новый тикет!")
                    .setDescription(msg.content)
                    .setFooter(msg.author.username, msg.author.displayAvatarURL())
                    .setColor("#D82D42"),
                row = new discord.MessageActionRow()
                    .addComponents(
                        new discord.MessageButton()
                            .setCustomId("GET:" + msg.author.id)
                            .setLabel('Взять тикет')
                            .setStyle('PRIMARY')
                    );

            return channel.send({
                embeds: [embed],
                components: [row]
            })
        }

        if (!tickets.get(msg.author.id).resolver) {
            const embed = new discord.MessageEmbed()
                    .setDescription(config.autoMessages.waiting)
                    .setColor("#D82D42");

            return msg.channel.send( {embeds: [embed]} )
        }

        if (tickets.get(msg.author.id).thread) {
            webHook.send({
                username: msg.author.username,
                avatarURL: msg.author.displayAvatarURL(),
                content: msg.content,
                threadId: tickets.get(msg.author.id).thread.id
            });
        }
    }

    if (msg.channel.type === "GUILD_PUBLIC_THREAD") {
        if (!tickets.has(msg.channel.name)) return;

        client.users.fetch(msg.channel.name).then((user) => {
            user.send(msg.content)
        })
    }


})

client.on("interactionCreate", async inter => {
    if (inter.type !== "MESSAGE_COMPONENT") return;

    const [command, userId] = inter.customId.split(":");

    switch (command) {
        case 'GET':
            if (tickets.has(userId)) {
                const row = new discord.MessageActionRow()
                    .addComponents(
                        new discord.MessageButton()
                            .setCustomId("CLOSE:" + userId)
                            .setLabel('Закрыть тикет')
                            .setStyle('DANGER')
                    );

                let embed = inter.message.embeds[0];
                embed.color = "#7083CF";

                inter.update({
                    embeds: [embed],
                    components: [row]
                });
                let thread = await inter.message.startThread({name: userId});
                tickets.set(userId, {resolver: inter.user.id, thread: thread});

                client.users.fetch(userId).then((user) => {
                    const embedDM = new discord.MessageEmbed()
                        .setTitle(config.autoMessages.stuffJoined)
                        .setDescription(config.autoMessages.chatEnabled)
                        .setColor("#378D53");

                    return user.send( {embeds: [embedDM]} );
                });
            } else {
                inter.reply({
                    content: `Тикет #${userId}  уже закрыт!`,
                    ephemeral: true
                })
            }
            break;

        case 'CLOSE':
            client.users.fetch(userId).then((user) => {
                const embedDM = new discord.MessageEmbed()
                    .setTitle(config.autoMessages.goodbye)
                    .setColor("#378D53");

                return user.send( {embeds: [embedDM]} );
            });

            let embed = inter.message.embeds[0];
            embed.title = config.autoMessages.goodbye;
            embed.color = "#378D53";

            inter.update({
                embeds: [embed],
                components: []
            });

            tickets.get(userId).thread.setArchived(true, config.autoMessages.goodbye);

            tickets.delete(userId);
    }
})

client.login(process.env.TOKEN).then(() => {
    console.log("Authorized")
})