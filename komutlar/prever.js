const Discord = require('discord.js');
const db = require('quick.db');
const fs = require('fs');
let ayarlar = require('../ayarlar.json'); // Ayarlar dosyanızın yolu

exports.run = async (client, message, args) => {
    // Sahip ID'si
    const sahipID = '985126554306773063';

    // Sadece sahip premium verebilir
    if (message.author.id !== sahipID) {
        return message.reply('Bu komutu sadece sahip kullanabilir.');
    }

    const targetUser = message.mentions.users.first();
    if (!targetUser) {
        return message.reply('Premium verilecek kullanıcıyı etiketleyin.');
    }

    const targetUserID = targetUser.id;

    // Kullanıcının ID'sini ayarlar.json dosyasındaki premiumIDs array'ine ekle
    ayarlar.premiumIDs.push(targetUserID);

    // ayarlar.json dosyasını güncelle
    fs.writeFileSync('./ayarlar.json', JSON.stringify(ayarlar, null, 2));

    // Premium süresi 30 gün (1 ay) olarak kabul edilmiş
    const premiumDuration = 30 * 24 * 60 * 60 * 1000; // 30 gün süre
    const premiumExpiration = Date.now() + premiumDuration;

    // Kullanıcının premium süresini kaydet
    db.set(`premium_${targetUserID}`, premiumExpiration);

    // Otomatik olarak premiumu kaldırma
    setTimeout(() => {
        // Kullanıcının premium süresini kontrol et
        const expirationTime = db.get(`premium_${targetUserID}`);
        if (expirationTime && Date.now() >= expirationTime) {
            // Süre dolmuşsa premiumu kaldır
            db.delete(`premium_${targetUserID}`);

            // Kullanıcının premium süresi dolduğuna dair log mesajını gönder
            const premiumExpiredMessage = `Kullanıcının premium süresi doldu. Kullanıcı: ${targetUser.tag} (ID: ${targetUser.id})`;
            const logChannelID = '1126493377748275280';
            const logChannel = client.channels.cache.get(logChannelID);

            if (logChannel) {logChannel.send(premiumExpiredMessage);
            } else {
                console.log('Belirtilen log kanalı bulunamadı.');
            }
        }
    }, premiumDuration); // 30 gün sonra premium kaldır

    message.reply(`${targetUser.tag} adlı kullanıcıya premium verildi. Premium süresi: 30 gün (1 ay).`);
};

exports.conf = {
    enabled: true,
    aliases: ['prever', 'verpremium'],
};

exports.help = {
    name: 'premium-ver',
    description: 'Belirtilen kullanıcıya premium verir.',
    usage: 'premium-ver <@kullanici>',
};