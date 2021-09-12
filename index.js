if (!process.env.WEBHOOK || !process.env.TOKEN) {
    console.log("Ошибка окружения!");
    process.exit();
}

const discord = require('discord.js'),
      client  = new discord.Client({
          intents: [
              discord.Intents.FLAGS.GUILDS,
              discord.Intents.FLAGS.DIRECT_MESSAGES,
              discord.Intents.FLAGS.GUILD_MESSAGES,
              discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING,

          ],
          partials: [
              "CHANNEL"
          ]
      });

const $resolveInteractionButtonsClose = require('./resolvers/interactions/buttons/close'),
      $resolveInteractionButtonsGet   = require('./resolvers/interactions/buttons/get'),
      $resolveMessagesDirect          = require('./resolvers/messages/directMessage'),
      $resolveMessagesThread          = require('./resolvers/messages/thread');

client.userLib = {
    config : require("./config.json"),
    webHook: new discord.WebhookClient({url: process.env.WEBHOOK}),
    tickets: new Map(),
    threads: new Map(),
    channel: {},
    getTime: function () {const date = new Date();return `(${date.getDate() > 9 ? date.getDate() : "0" + date.getDate()}.${(date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1)} ${date.getHours() > 9 ? date.getHours() : "0" + date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes()}:${date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds()}) `}
};

client.on("messageCreate", msg => {
    if (msg.author.bot) return;

    try {
        if (msg.channel.type === "DM") {
            $resolveMessagesDirect(client, msg);
        }

        if (msg.channel.type === "GUILD_PUBLIC_THREAD" && client.userLib.threads.has(msg.channel.id)) {
            $resolveMessagesThread(client, msg);
        }
    } catch (e) {
        console.warn(e);
    }
});

client.on("interactionCreate", async inter => {
    if (inter.type !== "MESSAGE_COMPONENT") return;

    const [command, userId] = inter.customId.split(":");

    try {
        switch (command) {
            case 'GET':
                await $resolveInteractionButtonsGet(client, inter, userId);
                break;

            case 'CLOSE':
                await $resolveInteractionButtonsClose(client, inter, userId);
                break;
            default:
                console.warn(client.userLib.getTime() + `Что-то странное!\n${inter}`)
        }
    } catch (e) {
        console.warn(e);
    }
});

client.on("ready", async () => {
    console.log(client.userLib.getTime() + `Авторизация выполнена!`);
    client.user.setActivity('Напиши в ЛС для помощи!', { type: 'WATCHING' });
    client.userLib.channel = await client.channels.fetch(client.userLib.config.logChannel);
    console.log(client.userLib.getTime() + `Лог канал закеширован! #${client.userLib.channel.name}`);
    console.log(client.userLib.getTime() + "К работе готов!\n");
});

client.login(process.env.TOKEN).then(() => {
    console.log(client.userLib.getTime() + "Авторизация...")
});