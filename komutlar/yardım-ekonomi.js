const WestraDiscord = require('discord.js');
const WestraClient = new WestraDiscord.Client();
const ayarlar = require('../ayarlar.json');
let prefix = ayarlar.prefix

exports.run = (client, message) => {
 const WestraEmbed = new WestraDiscord.MessageEmbed()
  .setColor(0x36393F)
 .setAuthor(`${client.user.username} | Ekonomi Sistemi Yardım Menüsü (Beta)  `)
 .setDescription(`<a:giveme:1140646914132562061>  
 **__r!çek Bankadan para çekersiniz!
 \n r!çalış Çalışır ve para kazanırsınız! 
 \n r!çal Başkasından para çalarsınız! 
 \n  r!günlük Günlük para kazanırsınız! 
 \n r!gönder Sevdiklerinize RiseBunny Coin yollarsınız !
 \n r!param Total para miktarınızı öğrenirsiniz!
 \n r!soygun Soygun yaparsınız(!)
 \n r!parasıralama Para sıralamasına bakarsınız!
 \n r!banka Bankanızı kontrol ederseniz!
 \n r!haftalık Haftalık ödülünüzü alırsınız!
 \n r!cf Paranın iki katını kazanmaya hazırmısın? hadi oyna!
 \n r!pet sat petinizi satarsınız!
 \n r!pet al pet alırsınız!
 \n r!preal Premium alırsınız (1.5M RiseBunny cash)!__**
`)
 .setTimestamp()
 .setImage("https://media.discordapp.net/attachments/1126239630203818095/1130479789757693952/standard.gif")
 message.channel.send(WestraEmbed)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ekonomisistem",'ekonomisistemi'],
  kategori: "Bot",
  permLevel: 0
};

exports.help = {
  name: 'ekonomi',
  description: 'Bot ile ilgili bilgi verir.',
  usage: 'bilgi'
};