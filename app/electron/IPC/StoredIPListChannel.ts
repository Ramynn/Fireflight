import {StorageNames, IPCChannelInterface, IPCChannelNames, IPCRequestInterface, IPInfoInterface, IPCStoredIPListParamsType} from '../../shared';
import {IpcMainEvent} from 'electron';
import {storageHelper, arrayHelper, debugHelper} from '../helpers';
import {application} from '../bootstrap';

export class StoredIPListChannel implements IPCChannelInterface<IPCStoredIPListParamsType> {
  getName(): string {
    return IPCChannelNames.StoredIPListChannel;
  }

  handle(event: IpcMainEvent, request: IPCRequestInterface<IPCStoredIPListParamsType>): void {
    const {storedItemsCount} = application.settings;

    if (!request.responseChannel) {
      request.responseChannel = `${this.getName()}_response`;
    }

    debugHelper.log('IPC', 'StoredIPListChannel', request);

    if (request.params) {
      const storedIPList = storageHelper.get(StorageNames.StoredIPList);
      const [action, IPList] = request.params;
      let newIPList: IPInfoInterface[] = [];

      if (action === 'get') {
        return event.sender.send(request.responseChannel, storedIPList);
      }

      if (action === 'add') {
        const [latestStoredIP] = storedIPList;
        const safeIPList = IPList.filter((IPItem) => latestStoredIP?.IP !== IPItem.IP);

        newIPList = safeIPList.concat(storedIPList).slice(-(storedItemsCount - 1));
      }

      if (action === 'remove') {
        const safeIPList: string[] = IPList.map((IPItem) => IPItem.ID);

        newIPList = storedIPList.filter((storedIPItem) => !safeIPList.includes(storedIPItem.ID));
      }

      debugHelper.log('IPC', 'StoredIPListChannel', 'Saving new IP List');
      newIPList = arrayHelper.removeEmptyItems(newIPList);
      storageHelper.set(StorageNames.StoredIPList, newIPList);
      application.updateTray();

      return event.sender.send(request.responseChannel, true);
    }

    event.sender.send(request.responseChannel, false);
  }
}
