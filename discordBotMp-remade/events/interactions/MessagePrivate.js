const { EmbedBuilder, Message, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { Client } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: 'messageCreate',
    /**
     * 
     * @param {Client} client
     * @param {Message} message
     */
    async execute(message, client) {
        // Vérifie si le message provient d'un canal de type DM (Direct Message)
        if (message.channel.type !== 1) return;

        // Ignore les messages envoyés par le bot lui-même
        if (message.author.id === client.user.id) return;

        const support = config.CategorieId;
        
        // Vérifie si le canal de support est défini et s'il existe
        if (!client.channels.cache.get(support)) {
            return message.author.send('Votre message a été reçu, mais le support n\'est pas activé.');
        }

        // Trouve un canal existant pour l'utilisateur
        const channel = client.channels.cache.find(chn => chn.topic === `${message.author.id}`);
        
        if (channel) {
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('Fermer_support')
                        .setStyle(ButtonStyle.Danger)
                        .setLabel('Fermer le support'),
                    new ButtonBuilder()
                        .setCustomId(`Répondre_${channel.id}_${message.author.id}`)
                        .setStyle(ButtonStyle.Primary)
                        .setLabel('Répondre')
                        .setDisabled(false)
                );
            
            const img = message.attachments.map(a => a.url);
            
            // Envoie le message dans le canal de support
            client.channels.cache.get(channel.id).send({
                components: [row],
                embeds: [
                    new EmbedBuilder()
                        .setColor('Blue')
                        .setTitle(`Support de ${message.author.username}`)
                        .setDescription(`__Description :__\n${message.content}`)
                        .setTimestamp()
                ],
                files: img
            }).then(() => {
                message.author.send(config.message);
            });
        } else {
            // Crée un nouveau canal de support
            client.guilds.cache.get(config.GuildsId).channels.create({
                name: `Support-${message.author.username}`,
                parent: support,
                topic: `${message.author.id}`,
                position: 1
            }).then(chn => {
                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('Fermer_support')
                            .setStyle(ButtonStyle.Danger)
                            .setLabel('Fermer le support'),
                        new ButtonBuilder()
                            .setCustomId(`Répondre_${chn.id}_${message.author.id}`)
                            .setStyle(ButtonStyle.Primary)
                            .setLabel('Répondre')
                            .setDisabled(false)
                    );

                // Envoie le message dans le nouveau canal de support
                client.channels.cache.get(chn.id).send({
                    components: [row],
                    embeds: [
                        new EmbedBuilder()
                            .setColor('Blue')
                            .setTitle(`Support de ${message.author.username}`)
                            .setDescription(`__Description :__\n${message.content}`)
                            .setTimestamp()
                    ]
                });
            }).then(() => {
                message.author.send(config.message);
            });
        }
    }
};