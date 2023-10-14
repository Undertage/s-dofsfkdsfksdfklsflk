const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;
let premiumIDs = ayarlar.premiumIDs || []; // Premium ID'lerini al, eğer ayarlar.json'da belirtilmemişse boş bir dizi kullan

exports.run = async (bot, msg, args) => {
  // Kullanıcının belirlediğiniz premium ID'lerden birine sahip olup olmadığını kontrol et
  if (!premiumIDs.includes(msg.author.id)) {
    const premiumEmbed = new Discord.MessageEmbed()
      .setColor('RED')
      .setTitle('Premium Üye Değilsiniz')
      .setDescription('Bu komutu kullanabilmek için [Satın Al](https://discord.gg/4XeWqvYMYJ) .')
      .setImage('https://media.discordapp.net/attachments/1116091586657407076/1149387613577412608/Picsart_23-09-07_19-50-01-287.jpg');

    return msg.channel.send(premiumEmbed);
  }

  const çekiliş = new Discord.MessageEmbed()
    .setAuthor(`RiseBunny Premium Kayıt Sistemi| YapayZeka Kayıt Sistemi (Beta)  `)
    .setTitle(`<a:spin:1140645416828932228>`)
    .setImage('https://cdn.discordapp.com/attachments/1108819464524415097/1109034877774483466/standard_7.gif')
    .setColor(`RANDOM`)
    .addField(
      `**Kayıt Kanalı** `,
      `💓  \`${prefix}ykayıt-kanal #kanal\` \nKayıtın Yapılacağı kanalı belirlersiniz. `,
      true
    )
    .addField(
      `**Kayıtsız Rol Belirle**`,
      `💓  \`${prefix}ykayıt-kayıtsız @rol\` \nKayıtsız Rolünü Sunucuya Giren kişiye verir ve kayıt olana kadar bu rol kalır!`,
      true
    )
    .addField(
      `**Erkek Rolü Belirle**`,
      `💓  \`${prefix}ykayıt-erkek @rol\` \nBelirttiğiniz erkek rolünü kullanıcılar başarı ile kayıt sonrasında alabilirler.`,
      true
    )
    .addField(
      `**Tag Belirle (İsteğe bağlı)**`,
      `💓  \`${prefix}ykayıt-tag <Tag>\` \nBaşarı ile kayıt tamamlandıktan sonra kullanıcılar belirlediğiniz Tag'ı alır.`,
      true
    )
    .addField(
      `**Kadın Rolü Belirle**`,
      ` 💓 \`${prefix}ykayıt-kadın  @rol\` \nKadın olarak kayıt edilecek kullanıcıların başarılı kayıt sonucunda aldığı roldür.`,
      true
    )
    .addField(
      `**Kayıt Sistemini Kapat**`,
      ` 💓  \`${prefix}ykayıt-kapat\` \nYapayZeka kayıt kapatılır ve veriler sıfırlanır!`,
      true
    );
  msg.channel.send(çekiliş);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["y-kayıt-sistem", 'y-kayıt-sistemi', 'ykayıt-sistemi', 'ykayıtsistem', 'y-kayıtsistemi'],
  kategori: "yardım",
  permLevel: 0
};

exports.help = {
  name: "ykayıt-sistem",
  description: "İstediğiniz kullanıcını bilgilerini gösterir.",
  usage: ""
};
