import {IPInfoInterface} from '../../common';

export type IPCStoredIPListAction = 'add' | 'remove' | 'get';
export type IPCStoredIPListParamsType = [IPCStoredIPListAction, IPInfoInterface[]];
