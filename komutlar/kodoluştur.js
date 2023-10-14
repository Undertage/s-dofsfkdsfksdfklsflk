const fs = require('fs');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
    // Sahip kontrolü
    const sahipID = "985126554306773063"; // Sahip kullanıcı ID'si
    if (message.author.id !== sahipID) return;
  

    // Kupon oluştur
    const couponCode = Math.random().toString(36).substring(7); // Rastgele kupon kodu oluştur

    // Kupon kodunu ve karşılık gelen para miktarını kaydet
    db.set(`kupon_${couponCode}`, 200000);

    const embed = new MessageEmbed()
        .setColor('#00ff00')
        .setTitle('Yeni Kupon Oluşturuldu!')
        .setDescription(`Kupon Kodu: \`${couponCode}\`\nKazanılan Para Miktarı: 200,000 💸`)
        .setFooter('Bu kuponu kullanmak için "kuponkullan" komutunu kullanın.');

    message.channel.send(embed);
};

exports.conf = {
    enabled: true,
    aliases: ['kuponolustur','kodoluştur'],
};

exports.help = {
    name: 'kuponoluştur',
    description: 'Yeni bir kupon oluşturur ve kupon kodunu gösterir.',
    usage: 'kuponoluştur'
};
