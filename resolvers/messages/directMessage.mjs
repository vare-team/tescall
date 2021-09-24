import { MessageEmbed, MessageActionRow, MessageButton } from "discord.js";

export default function(client, msg, action) {
	if (!client.userLib.tickets.has(msg.author.id)) {
		client.userLib.tickets.set(msg.author.id, {});

		msg.channel.send({
			embeds: [
				new MessageEmbed()
					.setTitle(client.userLib.config.hello.replace("%NAME%", msg.author.username))
					.setDescription(client.userLib.config.helloDescription)
					.setColor("#7083CF")
			]}
		)

		client.userLib.channel.send({
			embeds: [
				new MessageEmbed().setTitle("Новый тикет!")
					.setDescription(`${msg.stickers.size ? "Отправил стикер «" + msg.stickers.first().name + "» \n" : ""}<@${msg.author.id}>: ` + msg.content).setFooter(msg.author.username, msg.author.displayAvatarURL())
					.setColor("#D82D42")
					.setImage(msg.attachments.size ? msg.attachments.first().url :  "")
			],
			components: [
				new MessageActionRow()
					.addComponents(
						new MessageButton()
							.setCustomId("GET:" + msg.author.id)
							.setLabel('Взять тикет')
							.setStyle('PRIMARY'))
			]
		}).then(sendedMsg => {
			client.userLib.threads.set(sendedMsg.id, msg.author.id);
		});

		console.log(client.userLib.getTime() + `Новый тикет создан! @${msg.author.id}`);
		return;
	}

	if (!client.userLib.tickets.get(msg.author.id).resolver) {
		console.log(client.userLib.getTime() + `Сообщение было получено, не тикет не подтверждён! @${msg.author.id}`);

		msg.channel.send({ embeds: [new MessageEmbed().setTitle(client.userLib.config.waiting).setColor("#D82D42")] });
		return;
	}

	if (client.userLib.tickets.get(msg.author.id).thread) {
		let opt = {
			username: msg.author.username,
			avatarURL: msg.author.displayAvatarURL(),
			threadId: client.userLib.tickets.get(msg.author.id).thread
		}

		let embeds = [];

		if (msg.stickers.size) embeds.push({description: "Отправил стикер «" + msg.stickers.first().name + "» \n", color: "#688ADC"});
		if (msg.content.length) opt.content = msg.content;
		if (msg.attachments.size) opt.files = [msg.attachments.first().url];

		if (action === 'edited') {embeds.push({description: "Сообщение было отредактировано", color: "#FFAC33"})}
		if (action === 'deleted') {embeds.push({description: "Сообщение было удалено", color: "#F04747"})}

		if (embeds.length) opt.embeds = embeds;

		client.userLib.webHook.send(opt).then(() => {
			console.log(client.userLib.getTime() + `Сообщение было получено и переслано! @${msg.author.id}`)
		});
	}
}