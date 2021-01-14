import {IPCChannelInterface, IPCChannelNames, IPCRequestInterface, IPCUserInfoParamsType, UserInfoInterface, StorageNames} from '../../shared';
import {IpcMainEvent} from 'electron';
import * as OS from 'os';
import {storageHelper, debugHelper} from '../helpers';
import {application} from '../bootstrap';

export class UserInfoChannel implements IPCChannelInterface<IPCUserInfoParamsType> {
  getName(): string {
    return IPCChannelNames.UserInfoChannel;
  }

  handle(event: IpcMainEvent, request: IPCRequestInterface<IPCUserInfoParamsType>): void {
    if (!request.responseChannel) {
      request.responseChannel = `${this.getName()}_response`;
    }

    debugHelper.log('IPC', 'UserInfoChannel', request);

    if (request.params) {
      const [action] = request.params;

      if (action === 'get') {
        const userInfo: UserInfoInterface = {
          ID: storageHelper.get(StorageNames.UserID),
          hostName: OS.hostname(),
          release: OS.release(),
          platform: OS.platform(),
          appVersion: application.version
        };

        return event.sender.send(request.responseChannel, userInfo);
      }
    }
  }
}
