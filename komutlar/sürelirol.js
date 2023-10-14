const Discord = require('discord.js');
const ms = require('ms');
const database = require('quick.db');

exports.run = async (client, message, args) => {
  // Komutu sadece adminlerin kullanmasına izin vermek için yetki kontrolü yapın
  if (!message.member.hasPermission('ADMINISTRATOR')) {
    return message.channel.send('Bu komutu kullanabilmek için admin yetkiniz olmalı.');
  }

  // Kullanıcıdan hedef kullanıcıyı, rolü ve süreyi etiketlemesini isteyin
  const hedefKullanici = message.mentions.members.first();
  if (!hedefKullanici) return message.reply('Rol vermek istediğiniz kullanıcıyı etiketlemelisiniz!');

  const rol = message.mentions.roles.first();
  if (!rol) return message.reply('Ayarlamak istediğiniz rolü etiketlemelisiniz!');

  const sureArg = args[2];
  if (!sureArg) return message.reply('Bir süre belirtmelisiniz. Örnek: `1s` (1 saniye), `1m` (1 dakika), `1h` (1 saat), `1w` (1 hafta)');

  // Belirtilen süreyi milisaniyeye çevirin
  const sureMs = ms(sureArg);
  if (!sureMs) return message.reply('Geçersiz bir süre belirttiniz. Örnek: `1s` (1 saniye), `1m` (1 dakika), `1h` (1 saat), `1w` (1 hafta)');

  // Hedef kullanıcıya rolü verin
  hedefKullanici.roles.add(rol);

  // Verilen rolü ve sonlanma zamanını veritabanına kaydedin
  const sonlanmaZamani = Date.now() + sureMs;
  database.set(`suresi.${message.guild.id}.${hedefKullanici.id}.${rol.id}`, {
    sonlanmaZamani: sonlanmaZamani,
  });

  // Başarılı yanıtı ve süreyi içeren bir mesaj gönderin
  const kalanSure = ms(sureMs, { long: true }); // Süreyi daha okunabilir bir formata dönüştürün
  const basariliMesaj = new Discord.MessageEmbed()
    .setColor('GREEN')
    .setTitle('Rol Başarıyla Verildi!')
    .setDescription(`${hedefKullanici} kullanıcısına **${rol.name}** rolü, başarıyla verildi ve ${kalanSure} süre boyunca aktif olacak.`);

  message.channel.send(basariliMesaj);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sürelirol', 'rolver', 'rolvergelsin'],
  permLevel: 0
};

exports.help = {
  name: 'sürelirol',
  description: 'Belirtilen süre boyunca bir kullanıcıya rol verir.',
  usage: 'sürelirol @Kullanıcı @Rol <Süre>'
};
