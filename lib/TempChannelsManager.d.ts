import { Client, Snowflake } from 'discord.js';
import { ParentChannelOptions } from './types';
import { VoiceChannelsManager } from './VoiceChannelsManager';
/**
 * The temporary channels manager.
 * @export
 * @class TempChannelsManager
 * @extends {EventEmitter}
 */
export declare class TempChannelsManager extends VoiceChannelsManager {
    #private;
    readonly client: Client;
    /**
     * Creates an instance of TempChannelsManager.
     * @param {Client} client
     * @memberof TempChannelsManager
     */
    constructor(client: Client);
    /**
     * Registers a parent channel. When a user joins a it, a child will be created and they will be moved to it.
     *
     * @param {Snowflake} channelId
     * @param {ParentChannelOptions} [options={
     *       childCategory: null,
     *       childAutoDeleteIfEmpty: true,
     *       childAutoDeleteIfOwnerLeaves: false,
     *       childFormat: (name, count) => `[DRoom #${count}] ${name}`,
     *       childFormatRegex: /^\[DRoom #\d+\]\s+.+/i,
     *       childPermissionOverwriteOption: { 'ManageChannels': true }
     *     }]
     */
    registerChannel(channelId: Snowflake, options?: ParentChannelOptions): void;
    /**
     * Unregisters a parent channel. When a user joins it, nothing will happen.
     *
     * @param {Snowflake} channelId
     */
    unregisterChannel(channelId: Snowflake): boolean;
}
/**
 * Emitted when a voice channel name is changed because it does not respect the prefix regular expression.
 * @event TempChannelsManager#childPrefixChange
 * @see TempChannelsManagerEvents#childPrefixChange
 * @param {ChildChannelData} child The child channel data
 * @example
 * manager.on('childPrefixChange', (child) => {});
 */
