export interface AppSettingsInterface {
  isEnabled: boolean;
  interval: number;
  openOnSystemStart: boolean;
  runInMenubar: boolean;
  allowPrivateIPs: boolean;
  storedItemsCount: number;
  newIPNotification: boolean;
  enableAnalytics: boolean;
  language: 'en';
  theme: 'dark' | 'light';
}
