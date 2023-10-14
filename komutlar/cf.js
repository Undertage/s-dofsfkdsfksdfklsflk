const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
    const user = message.author;
    const cooldownTime = 10000; // 10 saniye cooldown
    const maxBet = 50000; // Max 50k oynama miktarı
    const winProbability = 0.4; // Kazanma olasılığı

    // Kullanıcının oyun oynama zamanını kontrol et
    const lastPlayedTime = db.fetch(`cf_cooldown_${user.id}`) || 0;
    const currentTime = Date.now();

    if (lastPlayedTime && currentTime - lastPlayedTime < cooldownTime) {
        const remainingTime = (cooldownTime - (currentTime - lastPlayedTime)) / 1000;
        return message.reply(`Bu komutu tekrar kullanmak için ${remainingTime.toFixed(1)} saniye beklemelisin.`);
    }

    const userBalance = db.fetch(`para_${user.id}`) || 0;

    let betAmount;

    if (args[0] && (args[0].toLowerCase() === 'all' || args[0].toLowerCase() === 'hepsi')) {
        betAmount = userBalance > maxBet ? maxBet : userBalance;
    } else {
        betAmount = parseInt(args[0]);
    }

    if (isNaN(betAmount) || betAmount <= 0) {
        return message.reply('Geçerli bir miktar girin.');
    }

    if (betAmount > maxBet) {
        return message.reply(`Maksimum ${maxBet} miktarında bahis yapabilirsiniz.`);
    }

    if (userBalance < betAmount) {
        return message.reply('Yeterli paranız yok. Oynamak için yeterli paraya sahip olmalısınız.');
    }

    const embed = new MessageEmbed()
        .setColor('#FFA500')
        .setTitle('Coin Flip')
        .setDescription(`Olasılık Hesaplanıyor...`)
        .addField('Oynanan Miktar', `${betAmount} miktarında para`);

    const msg = await message.channel.send(embed);

    setTimeout(() => {
        const win = Math.random() < winProbability;

        let resultMessage;
        let wonAmount = 0;

        if (win) {
            wonAmount = betAmount * 2;
            db.add(`para_${user.id}`, wonAmount);
            resultMessage = `Tebrikler! ${wonAmount} miktarında RiseBunny Cash kazandınız.`;
        } else {
            db.subtract(`para_${user.id}`, betAmount);
            resultMessage = `Üzgünüz, ${betAmount} miktarındaki RiseBunny Cash kaybettiniz.`;
        }

        db.set(`cf_cooldown_${user.id}`, currentTime); // Oyun oynama zamanını güncelle

        const resultEmbed = new MessageEmbed()
            .setColor(win ? '#00FF00' : '#FF0000')
            .setTitle('Coin Flip')
            .setDescription(resultMessage)
            .addField('Durum Mesajı', win ? 'Kazandınız! Yeni bakiyeniz: ' + db.fetch(`para_${user.id}`) : 'Kaybettiniz. Yeni bakiyeniz: ' + db.fetch(`para_${user.id}`));

        msg.edit(resultEmbed);
    }, 3000);
};

exports.conf = {
    enabled: true,
    aliases: ['cf', 'coinflip'],
};

exports.help = {
    name: 'cf',
    description: 'Belirli bir ihtimalle para kazanıp kaybetme oyunu. Örneğin: cf <miktar> veya cf all/hepsi',
    usage: 'cf <miktar>',
};
