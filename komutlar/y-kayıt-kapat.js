const Discord = require('discord.js');
const database = require('quick.db');
const fs = require('fs'); // fs modülünü ekledik

exports.run = async (client, message, args) => {
  // Ayarlar dosyasını oku
  let rawdata = fs.readFileSync('ayarlar.json');
  let ayarlar = JSON.parse(rawdata);
  let premiumIDs = ayarlar.premiumIDs; // Premium kullanıcı ID'leri

  // Kullanıcının belirlediğiniz premium ID'lerden birine sahip olup olmadığını kontrol et
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
  

  // Kayıt sistemini sıfırla
  database.delete(`kayıt-kadın.${message.guild.id}`);
  database.delete(`kayıt-tag.${message.guild.id}`);
  database.delete(`kayıt-kayıtsız.${message.guild.id}`);
  database.delete(`kayıt-erkek.${message.guild.id}`);
  database.delete(`kayıt-kanal.${message.guild.id}`);

  const successEmbed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setURL('https://discord.gg/4XeWqvYMYJ')
    .setTitle(client.user.username + ' | AI-Kayıt Sistemi')
    .setDescription(`**Kayıt sistemi başarıyla sıfırlandı!**

**Neden sıfırladığınızı görmek isteriz.
r!öneri ile bize bildirin :)**

**Hatamız olduysa düzeltmeyi çok istiyoruz <3**`)

  return message.channel.send(successEmbed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['y-kayıtkapat', 'y-kayıt-kapat', 'y-k-kapat'],
  permLevel: 1
};

exports.help = {
  name: 'ykayıt-kapat'
};
