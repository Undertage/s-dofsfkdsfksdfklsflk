const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
    const userMoney = db.fetch(`para_${message.author.id}`) || 0;
    const cost = 1500000;

    // Kullanıcının premium alıp almadığını kontrol et
    const isPremium = db.fetch(`premium_${message.author.id}`);
    if (isPremium) {
        return message.reply('Zaten premium üyesiniz!');
    }

    // Kullanıcının premium süresinin dolup dolmadığını kontrol et (örneğin, 30 gün)
    const premiumExpiration = db.fetch(`premiumExpiration_${message.author.id}`);
    if (premiumExpiration && premiumExpiration > Date.now()) {
        return message.reply('Premium süreniz henüz dolmadı!');
    }

    if (userMoney < cost) {
        const neededMoney = cost - userMoney;
        return message.reply(`Yetersiz RiseBunny cash. Premium satın almak için ${neededMoney} TL daha biriktir! Yada bankan'dan para çek **r!paraçek**`);
    }

    db.subtract(`para_${message.author.id}`, cost);

    const premiumMessage = `Premium satın alındı! Kullanıcı Adı: ${message.author.tag} ve Kullanıcı id si: ${message.author.id}`;
    const premiumChannel = client.channels.cache.get('1126493377748275280'); // Kanal ID'si
    if (premiumChannel) {
        premiumChannel.send(premiumMessage);
    } else {
        console.log('Belirtilen kanal bulunamadı.');
    }

    message.reply('Premium satın alındı!');
    const premiumDuration = 30 * 24 * 60 * 60 * 1000; // 30 gün süre
    const premiumExpirationDate = Date.now() + premiumDuration;
    db.set(`premiumExpiration_${message.author.id}`, premiumExpirationDate);
    db.set(`premium_${message.author.id}`, true);
};

exports.conf = {
    enabled: true,
    aliases: ['alpremium', 'premiumal', 'preal', 'alpre'],
};

exports.help = {
    name: 'satinal-premium',
    description: 'Premium satın almak için kullanılır.',
    usage: 'satinal-premium',
};
