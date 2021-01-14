import ElectronStore from 'electron-store';
import {AppSettingsInterface, IPInfoInterface, StorageNames} from '../../shared';
import {defaultAllowedIPList, defaultAppSettings, defaultStoredIPList, defaultUserID} from '../constants';

interface StoreType {
  [StorageNames.StoredIPList]: IPInfoInterface[];
  [StorageNames.AllowedIPList]: string[];
  [StorageNames.AppSettings]: AppSettingsInterface;
  [StorageNames.UserID]: string;
}

export const storageHelper = new ElectronStore<StoreType>({
  defaults: {
    [StorageNames.UserID]: defaultUserID,
    [StorageNames.AppSettings]: defaultAppSettings,
    [StorageNames.StoredIPList]: defaultStoredIPList,
    [StorageNames.AllowedIPList]: defaultAllowedIPList
  }
});
