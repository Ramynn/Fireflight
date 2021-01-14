import React from 'react';
import {FunctionComponent} from 'react';
import {I18nextProvider} from 'react-i18next';
import {LocalizationService} from '../services';

interface LocalizationProvider {}

export const LocalizationProvider: FunctionComponent<LocalizationProvider> = ({children}) => {
  return (
    <I18nextProvider key="LocalizationProvider" i18n={LocalizationService.shared().instance}>
      {children}
    </I18nextProvider>
  );
};
