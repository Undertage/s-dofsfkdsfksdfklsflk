const { createCanvas, loadImage } = require('canvas');
const { MessageAttachment } = require('discord.js');
const db = require('quick.db');

async function createMoneyLeaderboard(users) {
    const canvas = createCanvas(400, 400);
    const ctx = canvas.getContext('2d');

    // Arka plan
    ctx.fillStyle = '#23272A'; // Gri ton
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Başlık
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Arial';
    ctx.fillText('Para Sıralama', 100, 40);

    // Kullanıcı bilgileri
    ctx.font = '20px Arial';
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const userInfo = `${i + 1}. ${user.username} - ${user.money} `;
        ctx.fillText(userInfo, 20, 80 + i * 30);
    }

    const attachment = new MessageAttachment(canvas.toBuffer(), 'money-leaderboard.png');
    return attachment;
}

exports.run = async (client, message, args) => {
    const users = [];

    // Kullanıcıları toplam paralarına göre sırala
    const userIds = db.all().filter(data => data.ID.startsWith('para_')).map(data => data.ID.replace('para_', ''));
    for (const userId of userIds) {
        const user = client.users.cache.get(userId);
        if (user) {
            const walletMoney = db.fetch(`para_${userId}`) || 0;
            const bankMoney = db.fetch(`bankapara_${userId}`) || 0;
            const totalMoney = walletMoney + bankMoney;
            users.push({ username: user.username, money: totalMoney });
        }
    }

    users.sort((a, b) => b.money - a.money); // Paraya göre sırala

    // İlk 10 kullanıcıyı al (istediğiniz sayıda kullanıcı gösterebilirsiniz)
    const topUsers = users.slice(0, 10);

    const attachment = await createMoneyLeaderboard(topUsers);
    message.channel.send(attachment);
};

exports.conf = {
    enabled: true,
    aliases: ['parasıralama', 'liderlik'],
};

exports.help = {
    name: 'para-sıralama',
    description: 'Kullanıcıların paralarına göre sıralanmasını sağlar.',
    usage: 'para-sıralama'
};
