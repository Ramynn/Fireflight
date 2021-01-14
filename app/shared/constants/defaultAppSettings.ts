import {AppSettingsInterface} from '../index';

export const defaultAppSettings: AppSettingsInterface = {
  isEnabled: false,
  interval: 10000,
  openOnSystemStart: true,
  runInMenubar: true,
  allowPrivateIPs: true,
  storedItemsCount: 100,
  newIPNotification: true,
  enableAnalytics: true,
  language: 'en',
  theme: 'dark'
};
