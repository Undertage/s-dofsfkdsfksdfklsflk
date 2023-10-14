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
  

  if (!message.mentions.roles.first()) {
    const embed = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle('Kayıtsız Rol Ayarı')
      .setDescription('Ayarlamak istediğiniz Kayıtsız rolünü etiketlemelisiniz!');

    return message.channel.send(embed);
  }

  const role = message.mentions.roles.first();
  database.set(`kayıt-kayıtsız.${message.guild.id}`, role.id);

  const successEmbed = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setTitle('Rol Başarıyla Ayarlandı!')
    .setFooter('Kanalı değiştirmek istersen tekrar etiketlemelisin.')
    .setDescription(`» Kayıtsız Rolü: **${role.name}** olarak ayarlandı!`);
  
  return message.channel.send(successEmbed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['y-kayıtkayıtsız', 'y-kayıt-kayıtsız', 'y-k-kayıtsız'],
  permLevel: 1
};

exports.help = {
  name: 'ykayıt-kayıtsız'
};
