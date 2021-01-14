import {AllowedIPListChannel, StoredIPListChannel, AppSettingsChannel, NetworkChannel, UserInfoChannel} from './IPC';

export const IPCLists = [new AllowedIPListChannel(), new StoredIPListChannel(), new AppSettingsChannel(), new NetworkChannel(), new UserInfoChannel()];
