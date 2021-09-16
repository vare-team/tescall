import { replies } from "../../config";

export default async function(client, inter) {
    client.userLib.webHook.send({
        username: inter.user.username,
        avatarURL: client.user.displayAvatarURL(),
        threadId: inter.message.id,
        content: replies[inter.values[0]],
        embeds: [{description: "Быстрый ответ"}]
    }).then(() => {
        console.log(client.userLib.getTime() + `Сообщение было получено и переслано!`)
    });

    inter.reply({content: "Ответ отправлен!", ephemeral: true});
}