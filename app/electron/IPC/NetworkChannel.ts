import {IPCChannelInterface, IPCChannelNames, IPCRequestInterface, IPCNetworkParamsType} from '../../shared';
import {IpcMainEvent} from 'electron';
import {debugHelper} from '../helpers';
import hash from 'object-hash';
import os from 'os';

export class NetworkChannel implements IPCChannelInterface<IPCNetworkParamsType> {
  getName(): string {
    return IPCChannelNames.NetworkChannel;
  }

  handle(event: IpcMainEvent, request: IPCRequestInterface<IPCNetworkParamsType>): void {
    if (!request.responseChannel) {
      request.responseChannel = `${this.getName()}_response`;
    }

    debugHelper.log('IPC', 'NetworkChannel', request);

    if (request.params) {
      const [action] = request.params;

      if (action === 'get-interface-name') {
        const networkHash = hash(os.networkInterfaces());

        return event.sender.send(request.responseChannel, networkHash);
      }
    }
  }
}
