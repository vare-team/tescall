module.exports = function (client, msg) {
    let opt = {};
    if (msg.content.length) opt.content = `**${msg.author.username}**: ${msg.content}`;
    if (msg.attachments.size) opt.files = [msg.attachments.first().url];

    console.log(client.userLib.getTime() + `Сообщение было получено и переслано! @${msg.author.id}`);

    client.users.fetch(client.userLib.threads.get(msg.channel.id)).then((user) => {
        user.send(opt)
    });
}