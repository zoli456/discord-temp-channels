import { GuildMember, VoiceChannel } from 'discord.js';
/**
 * The data about a temporary channel ticket
 *
 * @export
 * @interface ChildChannelData
 */
export interface ChildChannelData {
    /**
     * The owner of the ticket
     *
     * @type {GuildMember}
     * @memberof ChildChannelData
     */
    owner: GuildMember;
    /**
     * The created voice channel
     *
     * @type {VoiceChannel}
     * @memberof ChildChannelData
     */
    voiceChannel: VoiceChannel;
    /**
     * The created voice channel
     *
     * @type {number}
     * @memberof ChildChannelData
     */
    orderChannel: number;
}
