const WestraDiscord = require('discord.js');
const WestraClient = new WestraDiscord.Client();
const ayarlar = require('../ayarlar.json');
let prefix = ayarlar.prefix

exports.run = (client, message) => {
 const WestraEmbed = new WestraDiscord.MessageEmbed()
  .setColor(0x36393F)
 .setAuthor(`${client.user.username} | Koruma Sistemi Yardım Menüsü   `)
 .setDescription(` <a:ohno:1140647212792164352>
 **${prefix}ban-koruma #kanal** \n-> Ban koruma sistemini açar.
 **${prefix}ban-koruma-sıfırla** \n-> Ban koruma sistemini sıfırlar.
 **${prefix}kanal-koruma #kanal** \n-> Kanal koruma sistemini açar.
 **${prefix}kanal-koruma-sıfırla** \n-> Kanal koruma sistemini sıfırlar.
 **${prefix}rol-koruma #kanal** \n-> Rol koruma sistemini açar.
 **${prefix}rol-koruma-sıfırla** \n-> Rol koruma sistemini sıfırlar.
 **${prefix}spam-koruma** \n-> Spam koruma sistemini açar.
 **${prefix}spam-koruma-kapat** \n-> Spam koruma sistemini kapatır.`)
 .setFooter(`RiseBunny`)
 .setTimestamp()
 .setImage("https://media.discordapp.net/attachments/1126239630203818095/1130479789757693952/standard.gif")
 message.channel.send(WestraEmbed)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  kategori: "Bot",
  permLevel: 0
};

exports.help = {
  name: 'korumasistemi',
  description: 'Bot ile ilgili bilgi verir.',
  usage: 'bilgi'
};