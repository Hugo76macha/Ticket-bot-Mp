const { CommandInteraction, EmbedBuilder} = require('discord.js');
const { Client } = require("discord.js")

module.exports = {
    name:'interactionCreate',
    once: false,
    /**
     * 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client) {
        if(!interaction.isButton())return;
        if(interaction.customId === "Fermer_support"){
            client.channels.cache.get(interaction.message.channel.id).delete()
        } 
    }
}