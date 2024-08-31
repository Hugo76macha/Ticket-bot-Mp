const { Client, Partials, Collection, GatewayIntentBits } = require("discord.js");
const { DirectMessages, MessageContent, DirectMessageTyping, Guilds } = GatewayIntentBits;
const { User, Message, Channel } = Partials;
const config = require('./config.json');
const { loadEvents } = require('./handler/eventHandler');

const client = new Client({
    intents: [DirectMessages, MessageContent, DirectMessageTyping, Guilds],
    partials: [User, Message, Channel],
});

client.commands = new Collection();
client.config = config;


client.login(process.env.TOKEN || client.config.token)
    .then(async () => {
        console.log('Bot connecté avec succès');
        
        
        loadEvents(client);

        
        client.once('ready', async bot => {
            console.log(`Le bot as bien définie son activitée !`);
            
            
            if (client.arrayOfSlashCommands && client.arrayOfSlashCommands.length > 0) {
                await bot.application.commands.set(client.arrayOfSlashCommands);
            }

            
            await bot.user.setPresence({ 
                activities: [{ name: 'les tickets !', type: 3 }],
                status: 'online' 
            });
        });
    })
    .catch(err => {
        
        switch (err.message) {
            case "An invalid token was provided.":
                console.log("Un jeton invalide a été fourni !");
                break;
            case "Privileged intent provided is not enabled or whitelisted.":
                console.log("Vous devez activer ou mettre sur liste blanche l'intention 'Guild_Members' dans votre portail de développeur Discord !");
                break;
            default:
                console.log("Une erreur inattendue s'est produite ! Veuillez contacter le support pour obtenir de l'aide." + "\n\n" + err.stack);
                break;
        }
    });


process.on('unhandledRejection', error => {
    console.log("Unhandled Rejection:", error.stack);
});

process.on('uncaughtException', error => {
    console.log("Uncaught Exception:", error.stack);
});
