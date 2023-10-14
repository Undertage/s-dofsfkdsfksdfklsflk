const Discord = require("discord.js");
const db = require("quick.db");
const moment = require('moment')
const os = require('os');
require("moment-duration-format");
exports.run = async (bot, message, args) => {
  const zaman = moment.duration(bot.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
  const Ottoman = new Discord.MessageEmbed()
   
    
  .setColor("#00fff7")
  .addField(":incoming_envelope:**Bot Sahibi**", "**<@985126554306773063>** | ahmetbs ", )
  .addField(":envelope: **Sunucular**", bot.guilds.cache.size.toLocaleString(), true)
  .addField(":postbox: **Kullanıcılar**",bot.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString(), true)
  .addField(':bar_chart: **Kanallar**' , bot.channels.cache.size,true)
  .addField(':gear: **Ram Kullanım Oranı**', ` ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}  `, true)
  .addField(':green_circle: **Ping**', bot.ws.ping + 'ms',true)
  .addField(':timer: **Çalışma Süresi**', zaman,true) 
  .setImage('https://media.discordapp.net/attachments/1129422623542087801/1130943974761320598/standard_2.gif')
  .addField("» Linkler", ` [Davet Et](https://discord.com/api/oauth2/authorize?client_id=1152613347708125194&permissions=8&scope=bot)` + "** | **" + `[Destek Sunucusu](https://discord.gg/4XeWqvYMYJ)`  + "** | **" + `[Oy Ver](Yakında!)`  + "** | **" + `[Web Sitesi](https://risebunny.tic.tc)  `, false)
  
  return message.channel.send(Ottoman);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["i", "istatistik"],
  permLevel: 0
};

exports.help = {
  name: "istatistik",
  description: "Bot i",
  usage: "istatistik"
};