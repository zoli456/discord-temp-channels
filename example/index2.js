const { ClientWithTempManager } = require('../lib');

const client = new ClientWithTempManager();

client.on('ready', () => {
  console.log('Connected!');

  client.tempChannelsManager.registerChannel('CHANNEL_ID', {
    childCategory: 'CATEGORY_ID',
    childAutoDelete: true,
    childAutoDeleteIfOwnerLeaves: false,
    childVoiceFormat: (str, count) => `Example #${count} | ${str}`,
    childVoiceFormatRegex: /^Example #\d+ \|/,
    childTextFormat: (str, count) => `example-${count}_${str}`,
    childTextFormatRegex: /^example-\d+_/i,
  });
});

client.on('message', (msg) => {
  if (msg.content.startsWith('!createText')) {
    client.tempChannelsManager.emit('createText', msg);
  }
});

client.login('TOKEN');
