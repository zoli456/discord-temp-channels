require('dotenv').config({ path: '.env' });
const {
  Client,
  IntentsBitField,
  GatewayIntentBits,
  Collection,
} = require('discord.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.Guilds,
    // for the unregister command
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,

    GatewayIntentBits.Guilds,
  ],
});

const main = async () => {
  try {
    client.commands = new Collection();

    // use database to save, etc ...
    let listChannelGlobal = []
    let listChannelCouple = []
    let listChannelAlone = []

    await Promise.all([
      eventReady(client, process.env.CHANNEL_ID_GLOBAL, process.env.CATEGORY_ID_GLOBAL, '\'s room', listChannelGlobal.map(e => e.channelId).sort((a, b) => a.count - b.count)),
      eventReady(client, process.env.CHANNEL_ID_DOUBLE, process.env.CATEGORY_ID_DOUBLE, ' và bồ', listChannelCouple.sort((a, b) => a.count - b.count)),
      eventReady(client, process.env.CHANNEL_ID_ALONE, process.env.CATEGORY_ID_ALONE, ' một mình', listChannelAlone.sort((a, b) => a.count - b.count))
    ])

    await client.login(process.env.TOKEN);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

main();

async function eventReady(client, channel, category, name, listChannel) {
  const manager = new TempChannelsManager(client);
  client.on('ready', () => {
    console.log('Connected!');
    console.log(listChannel);
    manager.registerChannel(channel, {
      childCategory: category,
      childAutoDeleteIfEmpty: true,
      childAutoDeleteIfParentGetsUnregistered: true,
      childAutoDeleteIfOwnerLeaves: false,
      childVoiceFormat: (str, count) => `${str}${name}`,
      // `#${count}|${str}${name}`
      childVoiceFormatRegex: /^#\d+\|/,
      // childMaxUsers: 3,
      childBitrate: 64000,
      childShouldBeACopyOfParent: true,
      childCanBeRenamed: true,
      listChannelToRestore: listChannel
    });
  });

  manager.on(TempChannelsManagerEvents.channelRegister, (parent) =>
    console.log('Registered', parent)
  );
  manager.on(TempChannelsManagerEvents.channelUnregister, (parent) =>
    console.log('Unregistered', parent)
  );
  manager.on(TempChannelsManagerEvents.childAdd, (child, parent) => {
    mongodb.upsertNewChannel(child.voiceChannel.id, parent.channelId, child.orderChannel);
    console.log('Child added!', child, parent);
  });
  manager.on(TempChannelsManagerEvents.childRemove, (child, parent) => {
    mongodb.deleteByChannelId(child.voiceChannel.id);
    console.log('Child removed!', child, parent);
  });
  // manager.on(TempChannelsManagerEvents.childPrefixChange, (child) =>
  // 	console.log('Prefix changed', child)
  // );
};