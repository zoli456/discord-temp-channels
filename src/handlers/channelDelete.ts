import { GuildChannel, VoiceChannel, Snowflake } from 'discord.js';
import TempChannelsManager from '../index';
import { ChildChannelData } from '../types';

const isVoiceOrTextChannel = (c: ChildChannelData, id: Snowflake) => c.voiceChannel.id === id || c.textChannel?.id === id;

export const handleChannelDelete = async (manager: TempChannelsManager, channel: GuildChannel) => { 
  let parent = manager.channels.get(channel.id);
  if (parent) {
    manager.channels.delete(channel.id);
    return manager.emit('channelUnregister', parent);
  }

  parent = manager.channels.find(p => p.children.some(c => isVoiceOrTextChannel(c, channel.id)));
  if (!parent) return;
  
  const child = parent.children.find(c => isVoiceOrTextChannel(c, channel.id));
  if (!child) return;

  const textChannel = child.textChannel;
  if (textChannel?.id === channel.id) {
    child.textChannel = null;
    return manager.emit('textChannelDelete', textChannel);
  }

  if (child.voiceChannel.id === channel.id) {
    if (textChannel) {
      await textChannel.delete();
      manager.emit('textChannelDelete', textChannel);
    }
    parent.children = parent.children.filter(c => c.voiceChannel.id !== channel.id);
    manager.emit('voiceChannelDelete', channel as VoiceChannel);
    return manager.emit('childDelete', manager.client.user, child, manager.client.channels.cache.get(parent.channelID));
  }
};
