import {IpcMainEvent} from 'electron';
import {IPCRequestInterface} from './IPCRequestInterface';
import {IPCChannelNames} from './IPCChannelNames';

export interface IPCChannelInterface<ParamsType extends any[] = []> {
  getName(): IPCChannelNames[keyof IPCChannelNames];

  handle(event: IpcMainEvent, request: IPCRequestInterface<ParamsType>): void;
}
