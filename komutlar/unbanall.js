// Pâyidar Code - Pâyidar

const Discord = require('discord.js')

    exports.run = async(client, message, args) => {

        const payidarcode = await message.guild.fetchBans()
        
        for(const pâyidar of payidarcode.array()){
            await message.guild.members.unban(pâyidar.user.id)
            message.react('✅') //Eğer İşlem Başarılı Olursa Mesajımıza Emoji Ekleyelim
        }

    } //Pâyidar

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['Unbanall','UNBANALL','unban all','Unban all'],
    permLevel: 0
}

exports.help = {
    name: 'unbanall'
}