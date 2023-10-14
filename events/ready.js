const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
var prefix = ayarlar.prefix;

module.exports = client => {
 setInterval(function() {
}, 8000);
  var msgArray = [
"🎀 7/24 RiseBunny Yanında 🎀",
"💸 r!yardım yazarak menüye ulaş! 💸",
"🥵 r!davet yazarak sunucuna ekle! 🥵",
    "❤️  RiseBunny 💛"
 ];

 setInterval(() => {
  var rastgeleOyun = Math.floor(Math.random() * msgArray.length);
    client.user.setActivity(`${msgArray[rastgeleOyun]}`, { type: 'PLAYING' ,  url: 'https://www.twitch.tv/risebunny ' })
}, 5000);
    console.log(`RiseBunny başarıyla giriş yaptı.`);
}