import { Snowflake } from 'discord.js';
import { ChildChannelData, ParentChannelOptions } from './';
/**
 * The data about the channel allowing creation of temporary channels
 *
 * @export
 * @interface ParentChannelData
 */
export interface ParentChannelData {
    /**
     * The unique identifier of the channel
     *
     * @type {Snowflake}
     * @memberof ParentChannelData
     */
    channelId: Snowflake;
    /**
     * The customization parameters of this channel and the related children.
     *
     * @type {ParentChannelOptions}
     * @memberof ParentChannelData
     */
    options: ParentChannelOptions;
    /**
     * The related children channels related to this parent.
     *
     * @type {ChildChannelData[]}
     * @memberof ParentChannelData
     */
    children: ChildChannelData[];
}
