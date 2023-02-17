import {
	ActionRowBuilder,
	ModalBuilder,
	SlashCommandBuilder,
	StringSelectMenuOptionBuilder,
	SlashCommandUserOption,
	TextInputBuilder,
	PermissionsBitField,
	SlashCommandStringOption,
	TextInputStyle,
} from 'discord.js';

export const messages = {
	hello: 'Здравствуйте, %NAME%!',
	helloDescription:
		'Вас рада приветствовать служба поддержки Vare!\n' +
		'В скором времени Вам будет назначен агент поддержки, который постарается решить ваш вопрос!',
	goodbye: 'Тикет был завершён агентом поддержки!',
	goodbyeError: 'Тикет закрыт из-за ошибки!',
	goodbyeDescription:
		'Спасибо за обращение!\n' +
		'Для повторного обращения, необходимо будет написать сообщение с темой нового тикета в этот чат!',
	waiting: '⚠ Пожалуйста, дождитесь, пока ваш тикет будет принят агентом поддержки!',
	stuffJoined: 'К вам присоединился агент поддержки!',
	chatEnabled: 'С этого момента вы находитесь в чате!',
	noTickets: 'У вас нет открытых обращений',
	noTicketsDescription:
		'Для открытия обращения общего направления используйте:\n' +
		'</%GENERAL_NAME%:%GENERAL_ID%>\n' +
		'Для открытия обращения связанного с перепроверкой используйте:\n' +
		'</%RECHECK_NAME%:%RECHECK_ID%>',
};

export const ticketsErrors = {
	invalidBotId: 'Указан не верный айди',
	muted: 'Вы временно не можете создавать новых обращений',
	mutedForever: 'Вы не можете создавать новых обращений',
	unavailableDm: 'Не возможно отправить сообщение этому пользователю.',
};

export const replies = [
	new StringSelectMenuOptionBuilder()
		.setLabel('Ожидайте перепроверки')
		.setDescription('Здравствуйте и спасибо за предоставленную информацию, ожидайте перепроверки!')
		.setValue('botReCheck')
		.setEmoji('🛠'),
	new StringSelectMenuOptionBuilder()
		.setLabel('#шпаргалка')
		.setDescription('Убедитесь, пожалуйста, что ваш бот соответствует всему, что есть в канале #шпаргалка!')
		.setValue('botShpora')
		.setEmoji('🗑'),
	new StringSelectMenuOptionBuilder()
		.setLabel('Права ботов')
		.setDescription('На тестовом сервере установлены эти права для ботов...')
		.setValue('botPerms')
		.setEmoji('🛡'),
	new StringSelectMenuOptionBuilder()
		.setLabel('Проблема с /up')
		.setDescription('На всех серверах бот добавил свои слеш команды...')
		.setValue('upIssue')
		.setEmoji('🆙'),
	new StringSelectMenuOptionBuilder()
		.setLabel('В ЧС Ники')
		.setDescription('Это означает что вы в черном списке системы Nika...')
		.setValue('warnsIssue')
		.setEmoji('⚠'),
];

export const repliesMessages = {
	botReCheck: 'Здравствуйте и спасибо за предоставленную информацию, ожидайте перепроверки!',
	botShpora: 'Убедитесь, пожалуйста, что ваш бот соответствует всему, что есть в канале <#775675626580607018>',
	botPerms:
		'На тестовом сервере установлены эти права для ботов: https://cdn.discordapp.com/attachments/669972218868138025/880823412614897724/testRole.png',
	upIssue:
		'На всех серверах бот добавил свои слеш команды, однако, если этого не произошло, то перепригласите бота с правом «Создание слеш-команд»!\n' +
		'Приглашение бота: https://discord.com/oauth2/authorize?client_id=464272403766444044&scope=bot+applications.commands&permissions=3533825',
	warnsIssue:
		'Здравствуйте. Это означает, что вы в черном списке системы Nika. Она предназначена для борьбы со спам рассылками приглашений.\n' +
		'Если вы считаете, что произошла какая-то ошибка, то можете заполнить форму https://sdc.su/form\n' +
		'Однако учтите, если последнее предупреждение в системе было выдано раньше полугода назад, то предупреждения сняты не будут.',
};

export const colors = {
	grey: 0x666666,
	green: 0x378d53,
	blue: 0x7083cf,
	red: 0xd82d42,
	yellow: 0xffac33,
};

export const TicketTitles = {
	DEFAULT: 'Новый тикет!',
	GENERAL: 'Новый тикет!',
	RECHECK: 'Перепроверка',
};

export const TicketTopics = {
	DEFAULT: () => 'DEFAULT',
	GENERAL: interaction => interaction.fields.getField('topic').value,
	RECHECK: interaction => {
		const botId = interaction.fields.getField('botId').value;
		const reason = interaction.fields.getField('reason').value;

		try {
			BigInt(botId);
		} catch {
			throw ticketsErrors.invalidBotId;
		}

		return `1. ${botId}\n2. ${reason}`;
	},
};

export const commands = {
	resolve: name => {
		switch (name) {
			case 'перепроверка_бота':
				return 'recheck';
			case 'обычное_обращение':
				return 'general';
			case 'mute':
				return 'mute';
		}
	},

	general: new SlashCommandBuilder()
		.setName('обычное_обращение')
		.setDescription('обращение на свободную тематику')
		.toJSON(),
	recheck: new SlashCommandBuilder()
		.setName('перепроверка_бота')
		.setDescription('открывает форму для отправки бота на перпроверку')
		.toJSON(),
	mute: new SlashCommandBuilder()
		.setDefaultMemberPermissions(PermissionsBitField.Flags.ModerateMembers)
		.setName('mute')
		.setDescription('запрещяет создание тикетов для пользователя')
		.addUserOption(
			new SlashCommandUserOption()
				.setName('user')
				.setRequired(true)
				.setDescription('пользователь который будет замьючен')
		)
		.addStringOption(
			new SlashCommandStringOption()
				.setName('time')
				.setRequired(true)
				.setDescription('длительность мута, в ms формате 1h и т.д., или -1 для мута навсегда')
		)
		.setDMPermission(false)
		.toJSON(),
	unmute: new SlashCommandBuilder()
		.setDefaultMemberPermissions(PermissionsBitField.Flags.ModerateMembers)
		.setName('unmute')
		.setDescription('снимает запрет на создание тикетов')
		.addUserOption(
			new SlashCommandUserOption()
				.setName('user')
				.setRequired(true)
				.setDescription('пользователь с кого будет снят мут')
		)
		.setDMPermission(false)
		.toJSON(),
	list: new SlashCommandBuilder()
		.setDefaultMemberPermissions(PermissionsBitField.Flags.ViewAuditLog)
		.setName('list')
		.setDescription('Выводит список тикетов')
		.setDMPermission(false)
		.toJSON(),
	close: new SlashCommandBuilder()
		.setDefaultMemberPermissions(PermissionsBitField.Flags.ViewAuditLog)
		.setName('close')
		.setDescription('Закрывает тикет пользователя')
		.addUserOption(
			new SlashCommandUserOption()
				.setName('user')
				.setRequired(true)
				.setDescription('пользователь чей тикет будет закрыт')
		)
		.setDMPermission(false)
		.toJSON(),
};

export const modals = {
	resolve: name => modals[commands.resolve(name)],

	general: new ModalBuilder()
		.setCustomId('GENERAL')
		.setTitle('Анкета обращения')
		.setComponents([
			new ActionRowBuilder().setComponents(
				new TextInputBuilder()
					.setCustomId('topic')
					.setLabel('Опишите тему обращения')
					.setRequired(true)
					.setPlaceholder('Мне нужна помощь с...')
					.setMinLength(6)
					.setMaxLength(256)
					.setStyle(TextInputStyle.Paragraph)
			),
		]),
	recheck: new ModalBuilder()
		.setCustomId('RECHECK')
		.setTitle('Заявка на перепроверку')
		.setComponents([
			new ActionRowBuilder().setComponents(
				new TextInputBuilder()
					.setCustomId('botId')
					.setLabel('Айди бота')
					.setRequired(true)
					.setPlaceholder('885850225820962826')
					.setMinLength(17)
					.setMaxLength(19)
					.setStyle(TextInputStyle.Short)
			),
			new ActionRowBuilder().setComponents(
				new TextInputBuilder()
					.setCustomId('reason')
					.setRequired(true)
					.setLabel('Причина отказа, указанная на сайте')
					.setPlaceholder('офлайн')
					.setMinLength(6)
					.setMaxLength(200)
					.setStyle(TextInputStyle.Paragraph)
			),
		]),
};

String.prototype.format = function () {
	const args = arguments;
	return this.replace(/{([0-9]+)}/g, (match, index) => (typeof args[index] == 'undefined' ? match : args[index]));
};
