import {AppSettingsInterface} from '../../common';

export type IPCAppSettingsParamsAction = 'update' | 'get';
export type IPCAppSettingsParamsType = [IPCAppSettingsParamsAction, AppSettingsInterface?];
