import { Collection, VoiceChannel, Snowflake, GuildChannel } from 'discord.js';
import { TempChannelsManager } from '..';
import { ChildChannelData, ParentChannelData } from '../types';

export const handleRegistering = async (manager: TempChannelsManager, parent: ParentChannelData) => {
  const parentChannel = manager.client.channels.resolve(parent.channelID) as VoiceChannel;

  // reconstruct parent's children array when bot is ready
  if (parentChannel && parent.options.childVoiceFormatRegex) {
    let textChildren = new Collection<Snowflake, GuildChannel>();
    const voiceChildren = parentChannel.parent.children
      .filter(c => parent.options.childVoiceFormatRegex.test(c.name) && c.type === 'voice' && c.permissionOverwrites.some(po => po.type === 'member'));
    if (parent.options.childTextFormatRegex) {
      textChildren = parentChannel.parent.children
        .filter(c => parent.options.childTextFormatRegex.test(c.name) && c.isText() && c.permissionOverwrites.some(po => po.type === 'member'));
    }

    parent.children = await Promise.all(voiceChildren.map(async child => {
      const ownerId = child.permissionOverwrites.find(po => po.type === 'member').id;
      const owner = await child.guild.members.fetch(ownerId);

      return {
        owner: owner,
        voiceChannel: child as VoiceChannel,
        textChannel: textChildren.find(c => c.permissionOverwrites.some(po => po.type === 'member' && po.id === ownerId)),
      } as ChildChannelData;
    }));

    // remove children if voice channels are empty when bot is ready
    parent.children = Array.from(
      new Collection(parent.children.map(c => [c.owner.id, c]))
        .each(async child => {
          const childShouldBeDeleted =  (parent.options.childAutoDelete && child.voiceChannel.members.size === 0) ||
                                        (parent.options.childAutoDeleteIfOwnerLeaves && !child.voiceChannel.members.has(child.owner.id));
          if (childShouldBeDeleted) {
            if (child.textChannel) {
              await child.textChannel.delete();
              manager.emit('textChannelDelete', child.textChannel);
            }

            await child.voiceChannel.delete();
            manager.emit('voiceChannelDelete', child.voiceChannel);

            manager.emit('childDelete', manager.client.user, child, parentChannel);
          }
        })
        .filter(c => !c.voiceChannel.deleted)
        .values()
    );
  }
};
