
const Discord = require('discord.js')
const client = new Discord.Client()
const db = require('quick.db')
exports.run = (client, message, args, member) => {
const yardım = new Discord.MessageEmbed()
  .setAuthor(`RiseBunny  Yardım Menusü`, client.user.avatarURL())
  .setColor("RANDOM")  
.setThumbnail(message.author.displayAvatarURL({dynamic : true}))
  .setDescription(`• Hey! <@${message.author.id}> beni kullandığın için teşekkür ederim! \n • Rolümü en üste al yoksa bazı komutlar çalışmaz!! \n •  Prefixim: **r!**\n • Dilim: **TR** :flag_tr:\n • Üyelik durumu: ${db.has(`üyelikk_${message.author.id}`, "üyelik") ? `**Gold üye!**` : `**Normal üye!**`}`)
  .addField(" • Kategoriler: ", `> <a:theboys:1140646053591388301>  •  [r!kullanıcı] **Kullanıcı yardım menüsünü gösterir.**\n > <a:dc:1140645349069955084>   • [r!moderasyon] **Moderasyon yardım menüsünü gösterir.**\n > <a:ohno:1140647212792164352>  • [r!kayıtsistemi] ** Kayıt sistemi yardım menüsünü gösterir.**\n >  <a:firebird:1140645961979404399>  • [r!korumasistemi] ** Koruma sistemi yardım menüsünü gösterir.**\n > <a:spin:1140645416828932228>   • [r!logosistemi] ** Logo sistemi yardım menüsünü gösterir.**\n > <a:news:1140646392507945032>   • [r!çekilişsistemi] ** Çekiliş sistemi yardım menüsünü gösterir. **\n > <a:love:1140646315756359730>   • [r!ticketsistemi] ** Ticket sistemi yardım menüsünü gösterir. **\n > <a:giveme:1140646914132562061>   • [r!ekonomisistemi] ** Ekonomi sistemi yardım menüsünü gösterir. ** \n > <a:risebunnyverified:1140646128178712647>   • [r!abonerol-sistemi] ** Abonerol sistemini gösterir. ** \n > <a:nabey:1141854694185115659>  • [r!sunucukur] ** Sunucu kurar henüz (Beta) aşamasında. **`)
  .addField(" >  <a:vip:1140645503806210078> • [r!y-kayıtsistemi] ** Yapayzeka sayesinde kullanıcıların ad ve yaşını alarak cinsiyet tespitini otomatik yapar **  \n • Güncelleme Notları:","**📢 Güncelleme v1.0:** Yapayzeka Kayıt sistemi  ")
  .addField(" • Linkler:", "• [Davet Et](https://discord.com/api/oauth2/authorize?client_id=1152613347708125194&permissions=8&scope=bot) • [Destek Sunucusu](https://discord.gg/4XeWqvYMYJ) •")
  .setImage("https://media.discordapp.net/attachments/1126239630203818095/1130479789757693952/standard.gif")
.setFooter("RiseBunny", message.author.avatarURL())
.setTimestamp()
  message.channel.send(yardım)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["y", "help", "h"],
    permLevel: 0
}

exports.help = {
    name: "yardım",
    description: "westra",
    usage: "westra"
}