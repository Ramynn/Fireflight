import {useAppSettingsState} from '../states';

export function useAnalytics() {
  const [appSettingsState] = useAppSettingsState();

  const sendEvent = (name: string, ...params: any[]) => {
    if (appSettingsState.enableAnalytics) {
      console.log('sendEvent', name, params);
    }
  };

  return {
    sendEvent
  };
}
