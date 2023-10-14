const db = require('quick.db');

exports.run = async (client, message, args) => {
    const user = message.author;

    const receiverIban = args[0];
    if (!receiverIban) return message.channel.send('Para transferi için alıcının IBAN numarasını belirtmelisiniz.');

    const amount = parseFloat(args[1]);
    if (isNaN(amount) || amount <= 0 || amount > 200000) return message.channel.send('Geçerli bir miktar belirtmelisiniz ve en fazla 200,000 TL transfer yapabilirsiniz.');

    const senderIban = db.get(`iban_${user.id}`);
    if (!senderIban) return message.channel.send('Öncelikle bir IBAN numaranız olmalıdır. IBAN numarası oluşturmak için `iban-olustur` komutunu kullanabilirsiniz.');

    if (receiverIban === senderIban) return message.channel.send('Kendi IBAN numaranıza para transferi yapamazsınız.');

    const receiverId = db.get(`iban_${receiverIban}`);
    if (receiverId === null) return message.channel.send('Belirtilen IBAN numarasına sahip bir alıcı bulunamadı.');

    const senderBalance = db.fetch(`para_${user.id}`) || 0;
    if (senderBalance < amount) return message.channel.send('Yeterli bakiyeniz yok.');

    const receiverBalance = db.fetch(`para_${receiverId}`) || 0;

    db.subtract(`para_${user.id}`, amount);
    db.add(`para_${receiverId}`, amount);

    message.channel.send(`${user.username} adlı kullanıcı, IBAN ${receiverIban} olan kullanıcıya ${amount} TL transfer etti.`);
};

exports.conf = {
    enabled: true,
    aliases: ['para-transfer', 'paratransfer'],
    guildOnly: false,
    permLevel: 0
};

exports.help = {
    name: 'transfer',
    description: 'Belirtilen IBAN numarasına para transferi yapar.',
    usage: 'transfer <iban> <miktar>'
};
