import {IpcRenderer} from 'electron';
import {IPCRequestInterface} from '../../shared';
import {v1 as UUID} from 'uuid';

export class IPCService {
  private IPCRenderer!: IpcRenderer;

  public send(channel: string, request: IPCRequestInterface<any> = {}): Promise<any> {
    if (!this.IPCRenderer) {
      this.initializeIpcRenderer();
    }

    if (!request.responseChannel) {
      request.responseChannel = [channel, 'response', UUID()].join('_');
    }

    const ipcRenderer = this.IPCRenderer;

    ipcRenderer.send(channel, request);

    return new Promise((resolve) => {
      ipcRenderer.once(request.responseChannel as string, (event, response) => resolve(response));
    });
  }

  private initializeIpcRenderer() {
    if (!window || !window.process || !window.require) {
      throw new Error(`Unable to require renderer process`);
    }
    this.IPCRenderer = window.require('electron').ipcRenderer;
  }
}
