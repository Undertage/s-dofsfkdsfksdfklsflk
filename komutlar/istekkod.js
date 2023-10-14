const Discord = require('discord.js');

exports.run = async(client, message, args) => {
    let type = args.slice(0).join(' ');
    if (type.length < 1) return message.channel.send('Yanlış Kullanım! Örnek:Doğru Kullanım : r!istek sayaç komutu')
const embed = new Discord.MessageEmbed()
.setColor('0000bf')
.setDescription('İstek Kodunuz başarıyla bildirildi  \nEn Yakın Zamanda <#1119929967766163526>  Kanalından Cevap Vereceğiz. ')
message.channel.send(embed)
const embed2 = new Discord.MessageEmbed()
.setColor("0000bf")
.setDescription(`**${message.author.tag}** adlı kullanıcının **isteği ;**`)
.addField(`**Gönderen Kişinin Bilgileri**`, `__Kullanıcı ID: ${message.author.id}\nKullanıcı Adı: ${message.author.username}\n<Kullanıcı Tagı: ${message.author.discriminator}__`)
.addField("**Gönderilen İstek/Tavsiye Mesajı**", type)
.setThumbnail(message.author.avatarURL)
client.channels.cache.get('1126493377748275280').send(embed2); //Mesajın Gideceği Kanal ID 

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['istekkod','istek-kod'],
  permLevel: 0
}

exports.help = {
    name: 'istek',
    description: 'Sunucuya giren kullanıcıya seçtiğiniz rolü otomatik verir.',
    usage: 'istek <istek>'
}
//Space