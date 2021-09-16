if (!process.env.WEBHOOK || !process.env.TOKEN || !process.env.CHANNEL) {console.log("Ошибка окружения!");process.exit();}

import discord from 'discord.js';
import { messages, clientOptions } from './config';
import $resolveInteractionButtonsClose from './resolvers/interactions/buttons/close';
import $resolveInteractionButtonsGet from './resolvers/interactions/buttons/get';
import $resolveInteractionSelectmenu from './resolvers/interactions/selectMenu';
import $resolveMessage from './resolvers/messageResolver';

const client  = new discord.Client(clientOptions);

client.userLib = {
    config : messages,
    webHook: new discord.WebhookClient({url: process.env.WEBHOOK}),
    tickets: new Map(),
    threads: new Map(),
    channel: {},
    getTime: function () {const date = new Date();return `(${date.getDate() > 9 ? date.getDate() : "0" + date.getDate()}.${(date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1)} ${date.getHours() > 9 ? date.getHours() : "0" + date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes()}:${date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds()}) `}
};

client.on("messageCreate", msg => $resolveMessage(client, msg));
client.on("messageDelete", msg => $resolveMessage(client, msg, "deleted"));
client.on("messageUpdate", (oldMsg, newMsg) => $resolveMessage(client, newMsg, "edited"));

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

            case 'AUTOMESSAGE':
                await $resolveInteractionSelectmenu(client, inter, userId);
                break;

            default:
                console.warn(client.userLib.getTime() + `Что-то странное!`)
        }
    } catch (e) {
        console.warn(e);
    }
});

client.on("ready", async () => {
    console.log(client.userLib.getTime() + `Авторизация выполнена!`);
    client.user.setActivity('Напиши в ЛС для помощи!', { type: 'WATCHING' });
    client.userLib.channel = await client.channels.fetch(process.env.CHANNEL);
    console.log(client.userLib.getTime() + `Лог канал закеширован! #${client.userLib.channel.name}`);
    console.log(client.userLib.getTime() + "К работе готов!\n");
});

client.login(process.env.TOKEN).then(() => {
    console.log(client.userLib.getTime() + "Авторизация...")
});