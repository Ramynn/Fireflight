import {IPCService} from '../services';
import {IPCRequestInterface} from '../../shared';

export namespace IPCHelper {
  const IPC = new IPCService();

  export const send = <Request extends any[], Response extends any>(channel: string, request: IPCRequestInterface<Request> = {}): Promise<Response> => {
    return IPC.send(channel, request);
  };
}
