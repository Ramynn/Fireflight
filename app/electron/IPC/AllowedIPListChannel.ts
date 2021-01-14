import {StorageNames, IPCChannelInterface, IPCChannelNames, IPCRequestInterface, IPCAllowedIPListParamsType} from '../../shared';
import {IpcMainEvent} from 'electron';
import {storageHelper, arrayHelper, debugHelper} from '../helpers';
import {application} from '../bootstrap';

export class AllowedIPListChannel implements IPCChannelInterface<IPCAllowedIPListParamsType> {
  getName(): string {
    return IPCChannelNames.AllowedIPListChannel;
  }

  handle(event: IpcMainEvent, request: IPCRequestInterface<IPCAllowedIPListParamsType>): void {
    if (!request.responseChannel) {
      request.responseChannel = `${this.getName()}_response`;
    }

    debugHelper.log('IPC', 'AllowedIPListChannel', request);

    if (request.params) {
      const allowedIPList = storageHelper.get(StorageNames.AllowedIPList);
      const [action, IPList] = request.params;
      let newIPList: string[] = [];

      if (action === 'get') {
        return event.sender.send(request.responseChannel, allowedIPList);
      }

      if (action === 'add') {
        newIPList = IPList.concat(allowedIPList);
      }

      if (action === 'remove') {
        newIPList = arrayHelper.removeItems(allowedIPList, IPList);
      }

      newIPList = arrayHelper.unique(arrayHelper.removeEmptyItems(newIPList));

      debugHelper.log('IPC', 'AllowedIPListChannel', 'Saving new IP List', newIPList);

      storageHelper.set(StorageNames.AllowedIPList, newIPList);
      application.update();
      application.updateTray();

      return event.sender.send(request.responseChannel, true);
    }

    event.sender.send(request.responseChannel, false);
  }
}
