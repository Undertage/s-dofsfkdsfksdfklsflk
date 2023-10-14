const db = require('quick.db');

exports.run = async (client, message, args) => {
    const mentionedUser = message.mentions.users.first();
    const user = mentionedUser || message.author;

    let userIban = db.get(`iban_${user.id}`);

    if (!args[0]) {
        if (!userIban) {
            const generatedIban = generateRandomIban();
            db.set(`iban_${user.id}`, generatedIban);
            message.channel.send(`IBAN bilginiz bulunmamaktadır. Yeni bir IBAN oluşturuldu: ${generatedIban}`);
            userIban = generatedIban;
        } else {
            message.channel.send(`IBAN numarası: ${userIban}`);
        }
    } else {
        if (!userIban) {
            message.channel.send('Belirtilen kullanıcının IBAN numarası bulunmamaktadır.');
        } else {
            message.channel.send(`IBAN numarası: ${userIban}`);
        }
    }
};

function generateRandomIban() {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let iban = 'TR';
    for (let i = 0; i < 8; i++) {
        iban += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return iban;
};

exports.conf = {
    enabled: true,
    aliases: ['iban-olustur', 'iban-yarat'],
    guildOnly: false,
    permLevel: 0
};

exports.help = {
    name: 'iban',
    description: 'Kullanıcının IBAN numarasını oluşturur veya gösterir.',
    usage: 'iban [@kullanici]'
};
