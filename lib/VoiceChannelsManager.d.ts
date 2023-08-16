import { GuildMember, Snowflake, VoiceChannel } from 'discord.js';
import { ParentChannelData, ParentChannelOptions } from './types';
import { EventEmitter } from 'events';
/**
 * A voice channels manager, handling the relationship between parents and children channels.
 *
 * @export
 * @class VoiceChannelsManager
 * @extends {EventEmitter}
 */
export declare class VoiceChannelsManager extends EventEmitter {
    #private;
    /**
     * Creates an instance of VoiceChannelsManager.
     * @memberof VoiceChannelsManager
     */
    constructor();
    /**
     * Gets the parent channel either based on its ID or by looking for a match
     * on the provided ID and its list of children.
     *
     * @protected
     * @param {Snowflake} channelId
     * @param {boolean} [lookAsChild=false]
     * @return {*}  {ParentChannelData}
     * @memberof VoiceChannelsManager
     */
    protected getParentChannel(channelId: Snowflake, lookAsChild?: boolean): ParentChannelData;
    /**
     * Adds a parent channel into the collection.
     * Emits the {@link TempChannelsManagerEvents.channelRegister} event.
     *
     * @param {Snowflake} channelId
     * @param {ParentChannelOptions} options
     * @memberof VoiceChannelsManager
     */
    registerChannel(channelId: Snowflake, options: ParentChannelOptions): void;
    /**
     * Removes a registered parent channel from the collection, unbinding all children at the same time.
     * Emits the {@link TempChannelsManagerEvents.channelUnregister} event.
     *
     * @param {Snowflake} channelId
     * @return {*}  {boolean}
     * @memberof VoiceChannelsManager
     */
    unregisterChannel(channelId: Snowflake): boolean;
    /**
     * Adds a voice channel as a child of a parent.
     * Emits the {@link TempChannelsManagerEvents.childAdd} event.
     *
     * @param {ParentChannelData} parent
     * @param {VoiceChannel} voiceChannel
     * @param {GuildMember} owner
     * @return {*}  {void}
     * @memberof VoiceChannelsManager
     */
    bindChannelToParent(parent: ParentChannelData, voiceChannel: VoiceChannel, owner: GuildMember, orderChannel: number): void;
    /**
     * Removes a voice channel from the list of children of a parent.
     * Emits the {@link TempChannelsManagerEvents.childRemove} event.
     *
     * @param {ParentChannelData} parent
     * @param {Snowflake} voiceChannelId
     * @return {*}  {void}
     * @memberof VoiceChannelsManager
     */
    unbindChannelFromParent(parent: ParentChannelData, voiceChannelId: Snowflake): void;
}
/**
 * Emitted when a parent channel is registered.
 * @event VoiceChannelsManager#channelRegister
 * @see TempChannelsManagerEvents#channelRegister
 * @param {ParentChannelData} parent The parent channel data
 * @example
 * manager.on('channelRegister', (parent) => {});
 */
/**
 * Emitted when a parent channel is unregistered.
 * @event VoiceChannelsManager#channelUnregister
 * @see TempChannelsManagerEvents#channelUnregister
 * @param {ParentChannelData} parent The parent channel data
 * @example
 * manager.on('channelUnregister', (parent) => {});
 */
/**
 * Emitted when a voice channel is added as a child to a parent.
 * @event VoiceChannelsManager#childAdd
 * @see TempChannelsManagerEvents#childAdd
 * @param {ChildChannelData} child The child channel data
 * @param {ParentChannelData} parent The parent channel data
 * @example
 * manager.on('childAdd', (child, parent) => {});
 */
/**
 * Emitted when a voice channel is removed from the list of children of a parent.
 * @event VoiceChannelsManager#childRemove
 * @see TempChannelsManagerEvents#childRemove
 * @param {ChildChannelData} child The child channel data
 * @param {ParentChannelData} parent The parent channel data
 * @example
 * manager.on('childRemove', (child, parent) => {});
 */ 
