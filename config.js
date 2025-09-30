import {
	ActionRowBuilder,
	ModalBuilder,
	SlashCommandBuilder,
	StringSelectMenuOptionBuilder,
	SlashCommandUserOption,
	TextInputBuilder,
	SlashCommandStringOption,
	PermissionsBitField,
} from 'discord.js';

export const Permissions = {
	ModerateMembers: PermissionsBitField.Flags.ModerateMembers,
	ViewAuditLog: 1 << 7,
};
export const Intents = {
	Guilds: 1 << 0,
	GuildMembers: 1 << 1,
	GuildMessages: 1 << 9,
	DirectMessages: 1 << 12,
	MessageContent: 1 << 15,
};
export const ActivityType = {
	Custom: 4,
};
export const ButtonStyle = {
	Primary: 1,
	Success: 3,
};
export const TextInputStyle = {
	Short: 1,
	Paragraph: 2,
};

export const ContextType = {
	Guild: 0,
	BotDM: 1,
	PrivateChannel: 2,
};

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
	initWelcome: 'Выберите тип вашего обращения',
	initWelcomeDescription: 'Для продолжения выберите тип вашего обращения с помощью кнопок ниже.',
	initWelcomeSent: 'Сообщение было отправлено в текущий канал.',
	closedDmErrorDescription: 'Перед созданием тикета, откройте лс.',
	ticketSent: 'Ваше обращение отправлено.',
	ticketNotFound: 'Тикет отсутствует!',
	ticketClosed: 'Тикет %USER% уже закрыт!',
	quickReply: 'Быстрый ответ',
	responseSent: 'Ответ отправлен!',
	notMuted: '%USER% не в муте.',
	unmute: '%USER% размучен.',
	mute: '%USER% замучен: %TIME%',
};

export const ticketsErrors = {
	invalidBotId: 'Указан не верный айди',
	muted: 'Вы временно не можете создавать новых обращений',
	mutedForever: 'Вы не можете создавать новые обращения',
	unavailableDm: 'Невозможно отправить сообщение этому пользователю.',
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
	new StringSelectMenuOptionBuilder()
		.setLabel('Что за сервер')
		.setDescription('Данный сервер является поддержкой «VARE»')
		.setValue('whatServer')
		.setEmoji('📃'),
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
	whatServer:
		'Здравствуйте, данный сервер является поддержкой «VARE» и вы могли попасть на него по нескольким причинам:\n' +
		'・ Вас пригласил кто-то из нас или Ваш друг\n' +
		'・ Вы ранее авторизовались на одном из наших сайтов, не убрав галочку "Автоматически войти на сервер тех. поддержки"\n' +
		'Наши Сайты:\n' +
		'https://server-discord.com/ - лист серверов Discord, где вы можете добавить свой сервер, найти новых интересных людей и найти сервер, который Вам понравится.\n' +
		'https://bots.server-discord.com/ - лист ботов Discord, где вы можете добавить своего бота, получить больше пользователей и найти бота, который будет интересен для Вашего сервера.',
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
			case 'bot_recheck':
				return 'recheck';
			case 'general_request':
				return 'general';
			case 'mute':
				return 'mute';
		}
	},

	general: new SlashCommandBuilder()
		.setName('general_request')
		.setNameLocalization('ru', 'обычное_обращение')
		.setDescription('general topic request, for bot recheck use /bot_recheck')
		.setDescriptionLocalization(
			'ru',
			'обращение на свободную тематику, для перепроверки бота используйте /перепроверка_бота'
		)
		.setContexts([ContextType.BotDM])
		.toJSON(),
	recheck: new SlashCommandBuilder()
		.setName('bot_recheck')
		.setNameLocalization('ru', 'перепроверка_бота')
		.setDescription('opens form for bot recheck')
		.setDescriptionLocalization('ru', 'открывает форму для отправки бота на перпроверку')
		.setContexts([ContextType.BotDM])
		.toJSON(),
	mute: new SlashCommandBuilder()
		.setDefaultMemberPermissions(Permissions.ModerateMembers)
		.setName('mute')
		.setNameLocalization('ru', 'мут')
		.setDescription('mutes user from creating tickets')
		.setDescriptionLocalization('ru', 'запрещает создание тикетов для пользователя')
		.addUserOption(
			new SlashCommandUserOption()
				.setName('user')
				.setNameLocalization('ru', 'пользователь')
				.setRequired(true)
				.setDescription('user to be muted')
				.setDescriptionLocalization('ru', 'пользователь который будет замьючен')
		)
		.addStringOption(
			new SlashCommandStringOption()
				.setName('time')
				.setNameLocalization('ru', 'время')
				.setRequired(true)
				.setDescription('mute duration, in ms format 1h etc, or -1 for permanent mute')
				.setDescriptionLocalization('ru', 'длительность мута, в ms формате 1h и т.д., или -1 для мута навсегда')
		)
		.setContexts([ContextType.Guild])
		.toJSON(),
	unmute: new SlashCommandBuilder()
		.setDefaultMemberPermissions(Permissions.ModerateMembers)
		.setName('unmute')
		.setNameLocalization('ru', 'размут')
		.setDescription('unmutes user from creating tickets')
		.setDescriptionLocalization('ru', 'снимает запрет на создание тикетов')
		.addUserOption(
			new SlashCommandUserOption()
				.setName('user')
				.setNameLocalization('ru', 'пользователь')
				.setRequired(true)
				.setDescription('user to be unmuted')
				.setDescriptionLocalization('ru', 'пользователь с кого будет снят мут')
		)
		.setContexts([ContextType.Guild])
		.toJSON(),
	list: new SlashCommandBuilder()
		.setDefaultMemberPermissions(Permissions.ViewAuditLog)
		.setName('list')
		.setNameLocalization('ru', 'список')
		.setDescription('lists all tickets')
		.setDescriptionLocalization('ru', 'Выводит список тикетов')
		.setContexts([ContextType.Guild])
		.toJSON(),
	close: new SlashCommandBuilder()
		.setDefaultMemberPermissions(Permissions.ViewAuditLog)
		.setName('close')
		.setNameLocalization('ru', 'закрыть')
		.setDescription('closes user ticket')
		.setDescriptionLocalization('ru', 'Закрывает тикет пользователя')
		.addUserOption(
			new SlashCommandUserOption()
				.setName('user')
				.setNameLocalization('ru', 'пользователь')
				.setRequired(true)
				.setDescription('user whose ticket will be closed')
				.setDescriptionLocalization('ru', 'пользователь чей тикет будет закрыт')
		)
		.setContexts([ContextType.Guild])
		.toJSON(),
	initwelcome: new SlashCommandBuilder()
		.setDefaultMemberPermissions(Permissions.ViewAuditLog)
		.setName('initwelcome')
		.setNameLocalization('ru', 'приветственное_сообщение')
		.setDescription('initializes welcome message')
		.setDescriptionLocalization('ru', 'Инициализирует приветственное сообщение')
		.addStringOption(
			new SlashCommandStringOption()
				.setName('title')
				.setNameLocalization('ru', 'заголовок')
				.setRequired(true)
				.setMaxLength(256)
				.setDescription('Message title')
				.setDescriptionLocalization('ru', 'Заголовок сообщения')
		)
		.addStringOption(
			new SlashCommandStringOption()
				.setName('description')
				.setNameLocalization('ru', 'описание')
				.setRequired(true)
				.setMaxLength(4096)
				.setDescription('Message description')
				.setDescriptionLocalization('ru', 'Описание сообщения')
		)
		.setContexts([ContextType.Guild])
		.toJSON(),
};

export const modals = {
	resolve: name => modals[commands.resolve(name) ?? name.toLowerCase()] ?? modals.general,

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
					.setMaxLength(495)
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
					.setMinLength(16)
					.setMaxLength(20)
					.setStyle(TextInputStyle.Short)
			),
			new ActionRowBuilder().setComponents(
				new TextInputBuilder()
					.setCustomId('reason')
					.setRequired(true)
					.setLabel('Причина отказа, указанная на сайте')
					.setPlaceholder('офлайн')
					.setMinLength(4)
					.setMaxLength(495)
					.setStyle(TextInputStyle.Paragraph)
			),
		]),
};

String.prototype.format = function () {
	const args = arguments;
	return this.replace(/{([0-9]+)}/g, (match, index) => (typeof args[index] == 'undefined' ? match : args[index]));
};
