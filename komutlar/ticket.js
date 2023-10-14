const Discord = require("discord.js");
const fs = require("fs");
const data = require("quick.db");

const ticketCooldowns = new Map();
const closedTickets = new Set();

exports.run = async (client, message, args) => {
  const settings = JSON.parse(fs.readFileSync("ayarlar.json", "utf8"));
  const prefix = (await data.fetch(`prefix.${message.guild.id}`)) || settings.prefix;

  const isAdmin = message.member.hasPermission("ADMINISTRATOR");

  const kanalbelirle = await data.fetch(`kanal.${message.guild.id}`);
  if (!kanalbelirle && args[0] !== "kanal") {
    return message.channel.send(
      `Biletlerin gönderileceği kanal ayarlanmamış. Ayarlamak için: ${prefix}ticketkanalayarla #kanal`
    );
  }

  if (args[0] === "kanal" && isAdmin) {
    const channel = message.mentions.channels.first();
    if (!channel) {
      return message.channel.send(`Lütfen geçerli bir kanal belirtin: ${prefix}ticketkanalayarla #kanal`);
    }

    data.set(`kanal.${message.guild.id}`, channel.id);
    return message.channel.send(`Biletlerin gönderileceği kanal başarıyla ayarlandı: ${channel}`);
  } else if (args[0] === "kanal" && !isAdmin) {
    return message.channel.send("Bu komutu sadece adminler kullanabilir.");
  }

  const isPremium = settings.premiumIDs.includes(message.author.id);
  if (!isPremium) {
    return message.channel.send({
      embed: {
        color: "#ee7621",
        title: "Premium Özellik",
        description: "Bu komut premium kullanıcılara özeldir.",
        image: {
          url: "https://media.discordapp.net/attachments/1116091586657407076/1149387613577412608/Picsart_23-09-07_19-50-01-287.jpg"
        },
        footer: {
          text: "Bu komut Premium bir özelliktir."
        }
      }
    });
  }

  if (args[0] === "gönder") {
    const kanalbelirle = await data.fetch(`kanal.${message.guild.id}`);
    if (!kanalbelirle) {
      return message.channel.send(
        `Mesajı göndereceğim kanalı ayarlamamışsın: ${prefix}ticketkanalayarla #kanal`
      );
    }

    const askPurposeEmbed = new Discord.MessageEmbed()
      .setTitle('Bilet Açma Amacı')
      .setDescription('Lütfen bilet açma amacını belirtin.')
      .setColor('#ee7621');

    const askPurposeMessage = await message.channel.send(askPurposeEmbed);

    const collector = message.channel.createMessageCollector(
      (response) => response.author.id === message.author.id,
      { time: 30000 }
    );

    collector.on('collect', async (response) => {
      const ticketPurpose = response.content;

      const randomTicketNumber = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit number
      const ticketName = `ticket-${ticketPurpose}-${randomTicketNumber}`;
      const author = response.author;

      if (closedTickets.has(ticketName)) {
        return message.channel.send(`Bu amaçla zaten kapatılmış bir bilet var. Yeni bir bilet açmak için farklı bir amaç belirtin.`);
      }

      // Check if user is trying to open a ticket within the cooldown period
      if (ticketCooldowns.has(author.id)) {
        const cooldownTime = 5000; // 5 seconds in milliseconds
        const lastTicketTime = ticketCooldowns.get(author.id);

        if (Date.now() - lastTicketTime < cooldownTime) {
          response.delete();
          return message.channel.send(`5 saniyede bir bilet açılabilir!`).then(msg => {
            msg.delete({ timeout: 5000 }); // 5 seconds
          });
        }
      }

      ticketCooldowns.set(author.id, Date.now());

      const as = await data.fetch(`numara.${message.guild.id}`);
      const ticketData = {
        purpose: ticketPurpose
      };

      data.set(`ticket.${message.guild.id}.${ticketPurpose}`, ticketData);
      message.guild.channels.create(ticketName).then(async s => {
        data.add(`numara.${s.id}`, as);
        data.set(`ass.${message.guild.id}.${author.id}`, s.id);

        let role = message.guild.roles.cache.find(
          r => r.name === "@everyone"
        );
        s.createOverwrite(role, { VIEW_CHANNEL: false });
        s.createOverwrite(author, {
          VIEW_CHANNEL: true,
          SEND_MESSAGES: true
        });

        const adminRole = message.guild.roles.cache.find(role => role.name === 'admin');
        if (adminRole) {
          const admins = adminRole.members.array();

          for (const admin of admins) {
            const adminUser = admin[1].user;
            adminUser.send(`Kullanıcının bilet açma amacı: ${ticketPurpose}`);
          }
        }

        response.delete();

        s.send(
          `${author}, Hoşgeldin!`,
          new Discord.MessageEmbed()
            .setColor(`#ee7621`)
            .setDescription(
              `Yetkililer en kısa zamanda dönüş yapacak, lütfen sabırlı olun.\nBileti kapatmak istersen: 🔒\nEk bilgi: r!yardım yazarak komutlardan haberdar olun!`
            )
            .setFooter(`RiseBunny ile 1-0 öndesin :)`, client.user.avatarURL())
        ).then(m => {
          m.react(`🔒`);
          let si = (reaction, user) =>
            reaction.emoji.name === "🔒" && user.id !== client.user.id;
          let s23 = m.createReactionCollector(si, { time: 0 });

          s23.on("collect", async reaction => {
            const author = reaction.users.cache.last();
            reaction.users.remove(author.id);
            m.react(`✅`);
            m.react(`❌`);

            let sil = (reaction, user) =>
              reaction.emoji.name === "✅" && user.id !== client.user.id;
            let sill = m.createReactionCollector(sil, { time: 0 });
            let ss = (reaction, user) =>
              reaction.emoji.name === "❌" && user.id !== client.user.id;
            let s2 = m.createReactionCollector(ss, { time: 0 });

            s2.on("collect", async reaction => {
              s.messages.fetch({ limit: 10 }).then(async messages => {
                messages
                  .get(m.id)
                  .reactions.cache.get("✅")
                  .removeAll();
                reaction.users.removeAll();
              });
            });

            sill.on("collect", async reaction => {
              let us = reaction.users.cache.last();
              reaction.users.remove(us.id);
              s.send(
                new Discord.MessageEmbed()
                  .setColor(`#00ff00`)
                  .setDescription(`Bilet ${us} tarafından kapatıldı.`)
              );
              s.setName(`closed-${as}`);
              s.send(
                new Discord.MessageEmbed().setColor(`#00ff00`)
                  .setDescription(`:unlock: Ticketi tekrar açar.\n:no_entry:: Ticketi siler.`)
              ).then(m2 => {
                m2.react("🔓");
                m2.react("⛔");
                let sil = (reaction, user) =>
                  reaction.emoji.name === "⛔" && user.id !== client.user.id;
                let sill = m2.createReactionCollector(sil, { time: 0 });
                let geri = (reaction, user) =>
                  reaction.emoji.name === "🔓" && user.id !== client.user.id;
                let geriaç = m2.createReactionCollector(geri, { time: 0 });

                geriaç.on("collect", async reaction => {
                  const author = reaction.users.cache.last();
                  m2.delete({ timeout: 5000 });
                  reaction.users.remove(author.id);
                  s.send(
                    new Discord.MessageEmbed()
                      .setColor(`#00ff00`)
                      .setDescription(`Bilet ${author} tarafından tekrar açıldı.`)
                  );
                  s.setName(`ticket-${ticketPurpose}-${randomTicketNumber}`);
                });

                sill.on("collect", async reaction => {
                  const author = reaction.users.cache.last();
                  reaction.users.remove(author.id);
                  s.send(
                    new Discord.MessageEmbed()
                      .setColor(`#ee7621`)
                      .setDescription(`Bilet 5 saniye sonra tamamen silinecek.`)
                  );

                  // Remove ticket data from database
                  data.delete(`ticket.${message.guild.id}.${ticketPurpose}`);

                  closedTickets.add(ticketName); // Ticket is clos
                });
              });
            });
          });
        });
      });
    });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ticket"],
  permLevel: 0
};

exports.help = {
  name: "ticket"
};
