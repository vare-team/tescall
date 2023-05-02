import { modals } from '../../config.js';


export default async function (interaction) {
    const type = interaction.customId.replace('ticket_', '');

    if(!modals[type.toLowerCase()] && modals.general){
        interaction.showModal(modals.general);
    } else if (modals[type.toLowerCase()]){
        interaction.showModal(modals[type.toLowerCase()])
    } else {
        return interaction.reply({
	        ephemeral: true,
	        content: 'Ой... Нам нечего показывать.\nТут должно было быть модальное окно, но из-за неправильной настройки, оно не отобразилось. Пожалуйста, дайте знать разработчикам!',
				});
    }
}
