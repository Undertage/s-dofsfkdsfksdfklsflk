const Discord = require("discord.js");
const db = require("quick.db");
const client = new Discord.Client();
const ms = require("ms");

exports.run = async (client, message, args) => {
  function hata(mesaj) {
    let embed = new Discord.MessageEmbed()
      .setTitle("Olamaz.. Hata!")
      .setColor("#00ff00")
      .setDescription(mesaj)
      .setFooter(
        client.user.username + " |Mute Sistemi",
        client.user.avatarURL()
      );
    return message.channel
      .send(embed)
      .then(codeming => codeming.delete({ timeout: 11000 }));
  }

  const muteExemptIDs = ["985126554306773063"]; // ID'si mute yapılmaması gereken kullanıcılar

  if (!message.member.permissions.has("ADMINISTRATOR"))
    return hata(
      "Bir kullanıcıyı susturmak için **'Admin'** yetkisine sahip olmalısınız."
    );

  const user =
    message.mentions.users.first() ||
    client.users.cache.get(args[0]) ||
    message.guild.members.cache.find(user => user.user.username === args[0]);
  const süre = args[1];
  const sebep = args.slice(2).join(" ");

  if (!user || user.bot)
    return hata(
      "Mutelenmesini istediğin kullanıcıyı belirtmelisin. Örnek kullanım: **r!mute @RiseBunny 1saat Spam**"
    );

  if (!süre)
    return hata(
      "Kullanıcının ne kadar muteli kalmasını istediğini belirtmelisin. Örnek kullanım: **r!mute @RiseBunny 1saat Spam**"
    );

  if (!sebep) sebep = "Bir neden girilmedi!";

  if (muteExemptIDs.includes(user.id))
    return message.channel.send("Kendi sahibime mute atamam ;)");

  // Diğer kısımları buraya ekleyin...

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sustur"],
  permLevel: 0
};

exports.help = {
  name: "mute",
  description: "",
  usage: "mute"
};
