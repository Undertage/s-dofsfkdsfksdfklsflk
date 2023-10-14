const db = require('quick.db');

exports.run = async (client, message, args) => {
    const couponCode = args[0];

    if (!couponCode) {
        return message.reply('Lütfen bir kupon kodu girin.');
    }

    // Kupon kodlarını kontrol et
    const validCouponCodes = ["TEF16","Prekod16","test10"]; // Örnek geçerli kupon kodları

    if (validCouponCodes.includes(couponCode)) {
        // Kontrol et, kupon daha önce kullanılmış mı?
        const isCouponUsed = db.get(`usedCoupons.${couponCode}`);

        if (!isCouponUsed) {
            let addedAmount = 250000; // Eklenecek miktarı belirle (örneğin 500.000)

            let userMoney = db.fetch(`para_${message.author.id}`) || 0;
            userMoney += addedAmount; // Kullanıcıya belirlenen miktarı ekle

            // Kullanıcının parasını güncelle
            db.set(`para_${message.author.id}`, userMoney);

            message.reply(`Tebrikler, ${addedAmount.toLocaleString()} 💸 kazandınız!`);

            // Kuponun kullanıldığını işaretle
            db.set(`usedCoupons.${couponCode}`, true);
        } else {
            return message.reply('Bu kupon daha önce kullanılmış.');
        }
    } else {
        message.reply('Girilen kupon kodu geçersiz.');
    }
};

exports.conf = {
    enabled: true,
    aliases: ['kuponkullan', 'kodkullan'],
};

exports.help = {
    name: 'kuponkullan',
    description: 'Kupon kodunu kullanarak para kazanın.',
    usage: 'kuponkullan [kupon kodu]'
};
