const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("BAN_MEMBERS"))
    return message.channel.send("Bu komutu kullanabilmek için `Üyeleri Yasakla` yetkisine sahip olmalısın!");

  let kullanici = message.mentions.users.first();
  if (!kullanici) return message.channel.send("Banlayacağın kişiyi etiketlemelisin!");

  // Eğer banlanacak kullanıcı idm (985126554306773063) ise veya sahip ise banlama ve bildirim yapma
  if (kullanici.id === '985126554306773063' || kullanici.id === message.guild.ownerID) {
    return message.channel.send("Sahibimi banlayamam ;)");
  }

  const embed = new Discord.MessageEmbed()
    .setColor('RED')
    .setTitle(`${kullanici.tag} adlı kullanıcı banlandı.`)
    .setImage(`https://media.discordapp.net/attachments/964902901451489320/1082342926333522040/thanos-vs-thor-infinity-war_2.gif`);

  message.channel.send(embed);
  message.guild.members.ban(kullanici);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori: "moderasyon",
};

exports.help = {
  name: 'ban',
  description: 'Belirtilen kullanıcıyı sunucudan banlar.',
  usage: 'ban <@kullanici>',
};
