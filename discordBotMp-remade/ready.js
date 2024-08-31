module.exports = {
    name: 'ready',
    async execute(bot) {
      console.log(`[!] Veuillez entrer la commande npm i ffmpeg-static @discordjs/voice ou de mettre dans startup --> additional node packages ffmpeg-static @discordjs/voice`)
      await bot.application.commands.set(bot.arrayOfSlashCommands);
      await bot.user.setPresence({ activities: [{ name: 'EN PANNE !', type: 2 }], status: 'dnd' });
      setInterval(() => {
        bot.guilds.cache.forEach(guild => {
          if(!bot.db.prepare('SELECT guildId FROM guild WHERE guildId = ?').get(guild.id)) bot.db.exec(`INSERT INTO guild (guildId) VALUES ('${guild.id}')`), console.log(`[!] Ajout ${guild.name} à la base de donnée !`);
        })
      }, 10000)
    },
  };