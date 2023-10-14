const Discord = require('discord.js');
const database = require('quick.db');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
  const premiumIDs = ayarlar.premiumIDs || [];

  // Premium ID kontrolü eklendi.
  if (!premiumIDs.includes(message.author.id)) {
    const premiumEmbed = new Discord.MessageEmbed()
      .setColor('RED')
      .setTitle('Premium Üye Değilsiniz')
      .setDescription('Bu komutu kullanabilmek için [Satın Al](https://discord.gg/4XeWqvYMYJ) .')
      .setImage('https://media.discordapp.net/attachments/1116091586657407076/1149387613577412608/Picsart_23-09-07_19-50-01-287.jpg');

    return message.channel.send(premiumEmbed);
  }

  // Kullanıcının rolü yönetici olup olmadığını kontrol et
  if (!message.member.permissions.has('ADMINISTRATOR')) {
  return message.reply("Bu komutu kullanabilmek için yönetici olman gerekiyor.");
  }
  

  if (!args[0]) {
    const embed = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle('Tag Ayarı')
      .setDescription('Tag ayarlamak veya sıfırlamak için:\n\nTag Ayarla: `r!ykayıt-tag TAGINIZ`\nTag Sıfırla: `r!ykayıt-tag sıfırla`');

    return message.channel.send(embed);
  }

  if (args[0] === 'sıfırla') {
    database.delete(`kayıt-tag.${message.guild.id}`);
    return message.channel.send('Tag başarıyla sıfırlandı!');
  } else {
    database.set(`kayıt-tag.${message.guild.id}`, args[1]);
    return message.channel.send(new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle('Tag Başarıyla Ayarlandı!')
      .setDescription(`» Ayarlanan Tag: **${args[1]}** olarak ayarlandı!`));
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['y-kayıttag','y-kayıt-tag'],
  permLevel: 1
};

exports.help = {
  name: 'ykayıt-tag'
};
