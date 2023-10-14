
const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
  const toplamkomut = new Discord.MessageEmbed()

    .setTitle(``)
    .setAuthor(`RiseBunny  |  Toplam Komut Sayısı`)
    .setDescription(
      `✅ **RiseBunny de  Toplam**  \`` +
        client.commands.size +
        `\` **Komut Var vay be!**`
    )
    .setColor("#00ff00")
    .setTimestamp()
    .setFooter(`RiseBunny kullanmak bir ayrıcalıktır!`, client.user.avatarURL());

  return message.channel.send(toplamkomut);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['toplamkomut','toplam-komut','topkomut'],
  permLevel: 0
};

exports.help = {
  name: "komutlar",
  description: "Toplam Komut",
  usage: "toplamkomut"
};
