const { ActionRowBuilder } = require('@discordjs/builders');
const { CommandInteraction, TextInputBuilder, ModalBuilder, TextInputStyle } = require('discord.js');
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
        if (!interaction.isButton()) return;
        const id = interaction.customId.startsWith(`Répondre_${interaction.channel.id}_`);
        if (id === true) {
            const modal = new ModalBuilder()
                .setCustomId(interaction.customId)
                .setTitle('Réponse au support');

            const textInput = new TextInputBuilder()
                .setCustomId('Reponse')
                .setLabel("Définir la réponse.")
                .setStyle(TextInputStyle.Paragraph);

            const row = new ActionRowBuilder().addComponents(textInput);

            modal.addComponents(row);

            await interaction.showModal(modal);
        }
    }
};