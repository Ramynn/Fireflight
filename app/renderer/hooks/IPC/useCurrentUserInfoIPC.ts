import {IPCUserInfoParamsType, IPCChannelNames, UserInfoInterface} from '../../types';
import {IPCHelper} from '../../helpers';
import {useCurrentUserInfoState} from '../states';

type UseCurrentUserInfoIPC = [() => Promise<void>];

export function useCurrentUserInfoIPC(): UseCurrentUserInfoIPC {
  const [, setCurrentUserInfo] = useCurrentUserInfoState();

  async function get(): Promise<void> {
    try {
      const currentUserInfo = await IPCHelper.send<IPCUserInfoParamsType, UserInfoInterface>(IPCChannelNames.UserInfoChannel, {params: ['get']});

      setCurrentUserInfo(currentUserInfo);
    } catch (error) {
      throw error;
    }
  }

  return [get];
}
