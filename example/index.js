const { Client } = require('discord.js');
const TempChannelsManager = require('../lib');

const client = new Client();
const manager = new TempChannelsManager(client);

client.on('ready', () => {
  console.log('Connected!');

  manager.registerChannel('CHANNEL_ID', {
    childCategory: 'CATEGORY_ID',
    childAutoDelete: true,
    childAutoDeleteIfOwnerLeaves: false,
    childVoiceFormat: (str, count) => `Example #${count} | ${str}`,
    childVoiceFormatRegex: /^Example #\d+ \|/,
    childTextFormat: (str, count) => `example-${count}_${str}`,
    childTextFormatRegex: /^example-\d+_/i,
  });
});

client.on('message', msg => {
  if (msg.content.startsWith('!createText')) {
    manager.emit('createText', msg);
  }
});

client.login('TOKEN');
