const Discord = require('discord.js');

exports.run = async(client, message) => {
     
      const atam = new Discord.MessageEmbed()
    .setAuthor('Mustafa Kemal Atatürkü Saygı ve Sevgiyle Anıyoruz. ❤️💛')
    .setColor(3447003)
        .setImage(`https://i.hizliresim.com/8CIYMl.gif`)
    return message.channel.send(atam);
    
};
//OTTOMAN
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
//ottoman
exports.help = {
  name: 'atatürk',
  description: 'Atam',
  usage: 'atatürk'
};