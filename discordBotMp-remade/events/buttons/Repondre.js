const { ButtonBuilder } = require('@discordjs/builders');
const { CommandInteraction, EmbedBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const { Client } = require("discord.js");

module.exports = {
    name: 'interactionCreate',
    once: false,
    /**
     * 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client) {
        if (!interaction.isModalSubmit()) return;
        const id = interaction.customId.startsWith(`Répondre_${interaction.channel.id}_`);
        if (id === true) {
            const membre = interaction.customId.replace(`Répondre_${interaction.channel.id}_`, "");
            client.users.cache.get(membre).send({
                embeds: [new EmbedBuilder()
                    .setColor("Blurple")
                    .setTitle('Vous avez reçu une réponse !')
                    .setDescription(`__Réponse de ${interaction.user.tag}__ : \n\n${interaction.fields.getTextInputValue('Reponse')}`)]
            });
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('Fermer_support')
                        .setStyle(ButtonStyle.Danger)
                        .setLabel('Fermer le support'),
                    new ButtonBuilder()
                        .setCustomId('Support_Disable')
                        .setStyle(ButtonStyle.Primary)
                        .setLabel('Répondre')
                        .setDisabled(true)
                );
            interaction.update({ components: [row] });
            interaction.message.reply({
                embeds: [new EmbedBuilder()
                    .setColor('Green')
                    .setTitle(`Réponse de ${interaction.user.username}`)
                    .setDescription(`__Description :__\n${interaction.fields.getTextInputValue('Reponse')}`)
                    .setTimestamp()]
            });
        }
    }
};