import {StorageNames, IPCChannelInterface, IPCChannelNames, IPCRequestInterface, IPCAppSettingsParamsType} from '../../shared';
import {IpcMainEvent} from 'electron';
import {storageHelper, debugHelper} from '../helpers';
import {application} from '../bootstrap';

export class AppSettingsChannel implements IPCChannelInterface<IPCAppSettingsParamsType> {
  getName(): string {
    return IPCChannelNames.AppSettingsChannel;
  }

  handle(event: IpcMainEvent, request: IPCRequestInterface<IPCAppSettingsParamsType>): void {
    if (!request.responseChannel) {
      request.responseChannel = `${this.getName()}_response`;
    }

    debugHelper.log('IPC', 'AppSettingsChannel', request);

    if (request.params) {
      const [action, newAppSettings] = request.params;
      const appSettings = storageHelper.get(StorageNames.AppSettings);

      if (action === 'get') {
        return event.sender.send(request.responseChannel, appSettings);
      }

      if (action === 'update') {
        const needReload = application.settings.runInMenubar !== newAppSettings?.runInMenubar;

        debugHelper.log('IPC', 'AppSettingsChannel', 'Update App Setting', newAppSettings);
        storageHelper.set(StorageNames.AppSettings, newAppSettings);

        if (needReload) {
          application.reload();
        } else {
          application.update();
          application.updateTray();
        }

        return event.sender.send(request.responseChannel, true);
      }
    }
    event.sender.send(request.responseChannel, false);
  }
}
