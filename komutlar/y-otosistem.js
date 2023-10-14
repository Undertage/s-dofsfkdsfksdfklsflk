// komutlar/otosistem.js

const { MessageEmbed } = require('discord.js');
const database = require('quick.db');
const { runKayitIslemleri } = require('../bot.js');  // Bot.js dosyasındaki fonksiyonu import ediyoruz

module.exports.run = async (client, message, args) => {
  const channelNames = ['kayıt-ol', 'kayıtol', 'kayıt', 'kayıtsız'];
  const roleNames = ['kayıtsız', 'erkek', 'kız', 'kadın', 'bayan', 'bay', 'adam'];

  let kayitKanal = null;
  for (const name of channelNames) {
    const channel = message.guild.channels.cache.find(channel => channel.name.toLowerCase() === name.toLowerCase() && channel.type === 'text');
    if (channel) {
      kayitKanal = channel;
      break;
    }
  }

  const [kayitsizRol, erkekRol, kizRol] = roleNames.map(name => {
    const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === name.toLowerCase());
    if (!role) {
      // Eğer rol tanımlı değilse, oluşturabilir veya hata mesajı gönderebilirsiniz.
      return message.guild.roles.create({
        data: {
          name: name,
          color: 'RANDOM',
        },
        reason: 'Otomatik Kayıt Sistemi için bir rol oluşturuldu.',
      });
    }
    return role;
  });

  if (!message.member.permissions.has('ADMINISTRATOR')) {
  return message.reply("Bu komutu kullanabilmek için yönetici olman gerekiyor.");
  }
  
  
  if (kayitKanal && kayitsizRol && erkekRol && kizRol) {
    // Verileri veritabanına kaydet
    database.set(`kayıt-kanal.${message.guild.id}`, kayitKanal.id);
    database.set(`kayıt-kayıtsız.${message.guild.id}`, kayitsizRol.id);
    database.set(`kayıt-erkek.${message.guild.id}`, erkekRol.id);
    database.set(`kayıt-kız.${message.guild.id}`, kizRol.id);

    const successEmbed = new MessageEmbed()
      .setColor('GREEN')
      .setTitle('Otomatik Kayıt Sistemi Başarıyla Kuruldu')
      .setDescription(`Kayıt Kanalı: ${kayitKanal}\nKayıtsız Rolü: ${kayitsizRol}\nErkek Rolü: ${erkekRol}\nKız Rolü: ${kizRol}`);

    message.channel.send(successEmbed);

    // Bot.js dosyasındaki kayıt işlemlerini çağır
    runKayitIslemleri(client, message.guild.id);
  } else {
    // Hata durumu
    let errorMessage = 'Aşağıdaki öğeler bulunamadı:\n';
    if (!kayitKanal) errorMessage += '- Kayıt kanalı\n';
    if (!kayitsizRol) errorMessage += '- Kayıtsız rolü\n';
    if (!erkekRol) errorMessage += '- Erkek rolü\n';
    if (!kizRol) errorMessage += '- Kız rolü\n';

    const errorEmbed = new MessageEmbed()
      .setColor('RED')
      .setTitle('Hata')
      .setDescription(errorMessage);

    message.channel.send(errorEmbed);
  }
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['y-otosistem'],
  permLevel: 0
};

module.exports.help = {
  name: 'y-otosistem'
};
