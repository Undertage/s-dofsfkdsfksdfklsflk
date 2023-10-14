const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

const minAmount = 70000; // Minimum para miktarı
const maxAmount = 100000; // Maximum para miktarı
const allowedGuildId = '1098665728321794171'; // Kullanıcının komutu kullanabilmesi için izin verilen sunucu ID'si

function isUserInAllowedGuild(user) {
    // Kullanıcının belirtilen sunucuda olup olmadığını kontrol et
    const guild = user.client.guilds.cache.get(allowedGuildId);
    if (!guild) return false;

    return guild.members.cache.has(user.id);
}

exports.run = async (client, message, args) => {
    // Kullanıcının belirtilen sunucuda olmasını kontrol et
    if (!isUserInAllowedGuild(message.author)) {
        const notAllowedEmbed = new MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Hata')
            .setDescription('Bu komut sadece [RiseBunny](https://discord.gg/4XeWqvYMYJ) Sunucuna Katılan Üyeler kullanılabilir.');

        return message.channel.send(notAllowedEmbed);
    }

    // Kullanıcının bu hafta zaten ödül alıp almadığını kontrol et
    const lastReward = db.get(`lastWeeklyReward.${message.author.id}`) || 0;
    const currentTime = Date.now();

    if (currentTime - lastReward < 604800000) {
        const remainingTime = Math.ceil((604800000 - (currentTime - lastReward)) / 1000);

        const remainingTimeEmbed = new MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Hata')
            .setDescription(`Bu komutu tekrar kullanabilmek için ${Math.ceil(remainingTime / 86400)} gün beklemelisin.`);

        return message.channel.send(remainingTimeEmbed);
    }

    // Rastgele bir para miktarı belirle
    const amount = Math.floor(Math.random() * (maxAmount - minAmount + 1) + minAmount);

    // Kullanıcının paralarını güncelle
    db.add(`para_${message.author.id}`, amount);

    // Kullanıcının bu haftaki ödül alma zamanını güncelle
    db.set(`lastWeeklyReward.${message.author.id}`, currentTime);

    // Kullanıcıya bilgi mesajı gönder
    const successEmbed = new MessageEmbed()
        .setColor('#00FF00')
        .setTitle('Haftalık Ödül')
        .setDescription(`Tebrikler! Haftalık ödül olarak ${amount} para kazandınız.`);

    message.channel.send(successEmbed);
};

exports.conf = {
    enabled: true,
    aliases: ['haftalık-para'],
};

exports.help = {
    name: 'haftalık',
    description: 'Haftalık para ödülünü alır.',
    usage: 'haftalık'
};
