import { PermissionOverwriteOption, RoleResolvable, Snowflake, UserResolvable } from 'discord.js';

type Resolvables = RoleResolvable | UserResolvable;

export interface ParentChannelOptions {
  childCategory?: Snowflake;
  childAutoDelete: boolean;
  childAutoDeleteIfOwnerLeaves: boolean;
  childVoiceFormat(str: string, count: number): string;
  childVoiceFormatRegex: RegExp;
  childTextFormat(str: string, count: number): string;
  childTextFormatRegex: RegExp;
  childMaxUsers?: number;
  childBitrate?: number;
  childPermissionOverwriteOption?: PermissionOverwriteOption;
  childOverwriteRolesAndUsers?: Resolvables[];
}
