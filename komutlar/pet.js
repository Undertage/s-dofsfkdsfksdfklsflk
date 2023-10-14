const fs = require('fs');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');

const petler = {
  "common": [
    { "name": "Köpek", "emoji": "🐶", "price": 100000 },
    { "name": "Tavşan", "emoji": "🐰", "price": 80000 }
    // Diğer common petler buraya eklenecek
  ],
  "rare": [
    { "name": "Kedi", "emoji": "🐱", "price": 150000 },
    { "name": "Balık", "emoji": "🐠", "price": 180000 }
    // Diğer rare petler buraya eklenecek
  ],
  "premium": [
    { "name": "Aslan", "emoji": "🦁", "price": 350000 },
    { "name": "Kaplan", "emoji": "🐅", "price": 380000 }
    // Diğer premium petler buraya eklenecek
  ]
};

exports.run = async (client, message, args) => {
  const userId = message.author.id;
  const userMoney = db.get(`para_${userId}`) || 0;

  const trigger = args[0].toLowerCase(); // Küçük harflere dönüştürüyoruz

  switch (trigger) {
    case 'al':
      const petNameToBuy = args.slice(1).join(' ').toLowerCase();
      const selectedPetToBuy = findPetByName(petNameToBuy);

      if (!selectedPetToBuy) {
        const availablePets = listAvailablePets();
        message.channel.send(`Geçersiz pet ismi. Mevcut petler: ${availablePets}`);
        return;
      }

      const isPremiumToBuy = ayarlar.premiumIDs.includes(userId);

      if (selectedPetToBuy.rarity === 'premium' && !isPremiumToBuy) {
        return message.channel.send('Bu peti satın alabilmek için premium üye olmanız gerekmektedir.');
      }

      if (userMoney < selectedPetToBuy.price || userMoney <= 0) {
        return message.channel.send('Yetersiz bakiye. Bu peti satın almak için yeterli paranız yok.');
      }

      const userPetsToBuy = db.get(`pets_${userId}`) || [];
      userPetsToBuy.push(selectedPetToBuy);

      db.set(`pets_${userId}`, userPetsToBuy);

      message.channel.send(`Tebrikler! ${selectedPetToBuy.emoji} ${selectedPetToBuy.name} satın aldınız. Ücret: ${selectedPetToBuy.price}₺`);

      db.subtract(`para_${userId}`, selectedPetToBuy.price);
      break;

    case 'sat':
      if (args[1] === 'liste') {
        const userPetsToSell = db.get(`pets_${userId}`) || [];
        if (userPetsToSell.length === 0) {
          return message.channel.send('Satacak petiniz bulunmamaktadır.');
        }

        const availablePetsToSell = listUserPetsForSale(userPetsToSell);
        message.channel.send(`Satacağınız petleri seçin: ${availablePetsToSell}`);
        return;
      }

      const petIndexToSell = parseInt(args[1]);

      if (isNaN(petIndexToSell) || petIndexToSell < 1) {
        return message.channel.send('Geçersiz pet numarası.');
      }

      const userPetsToSell = db.get(`pets_${userId}`) || [];
      const selectedPetToSell = userPetsToSell[petIndexToSell - 1];

      if (!selectedPetToSell) {
        return message.channel.send('Geçersiz pet numarası.');
      }

      const randomFactor = Math.random() < 0.5 ? 0.9 : 1.1;
      const salePrice = Math.floor(selectedPetToSell.price * randomFactor);
      const salePriceWithZeros = (salePrice * 1000).toString();

      userPetsToSell.splice(petIndexToSell - 1, 1);
      db.set(`pets_${userId}`, userPetsToSell);

      const profitOrLoss = randomFactor < 1 ? 'zarar' : 'kâr';

      message.channel.send(`Başarıyla ${selectedPetToSell.emoji} ${selectedPetToSell.name} petini sattınız! ${profitOrLoss} edilen miktar: ${Math.abs(selectedPetToSell.price - salePrice)}₺ `);

      const amount = Math.floor(salePrice * 0.1);
      if (randomFactor < 1) {
        db.subtract(`para_${userId}`, amount);
      } else {
        db.add(`para_${userId}`, amount);
      }
      break;

    default:
      message.channel.send('Geçersiz komut. Kullanım: pet al <tür> veya pet sat <pet index>');
      break;
  }

  function findPetByName(name) {
    for (const rarity in petler) {
      const selectedPet = petler[rarity].find(pet => pet.name.toLowerCase() === name);
      if (selectedPet) return selectedPet;
    }
    return null;
  }

  function listAvailablePets() {
    const petList = [];
    for (const rarity in petler) {
      for (const pet of petler[rarity]) {
        petList.push(`${pet.name} - Fiyat: ${pet.price}₺`);
      }
    }
    return petList.join(', ');
  }

  function listUserPetsForSale(userPets) {
    const petList = userPets.map((pet, index) => `${index + 1}. ${pet.name} - Fiyat: ${pet.price}₺`);
    return petList.join('\n');
  }
};

exports.conf = {
  enabled: true,
  aliases: ['pet-al-sat'],
  guildOnly: false,
  permLevel: 0
};

exports.help = {
  name: 'pet',
  description: 'Pet almak veya satmak için kullanılır.',
  usage: 'pet al <tür> veya pet sat <pet index>'
};
