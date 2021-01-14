import i18n from 'i18next';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import {initReactI18next} from 'react-i18next';
import {debugHelper} from '../helpers';
import english from '../locales/en.json';

export class LocalizationService {
  private static instance: LocalizationService;
  private key: string = 'en';

  public readonly instance = i18n.use(intervalPlural).use(initReactI18next);

  constructor() {
    this.init();
  }

  public static shared(): LocalizationService {
    return this.instance || (this.instance = new LocalizationService());
  }

  public get languageKey(): string {
    return this.key;
  }

  public async changeLanguage(language: string): Promise<void> {
    if (this.instance.language !== language) {
      try {
        this.key = language;
        await this.instance.changeLanguage(language);

        return;
      } catch (error) {
        debugHelper.error('LocalizationService', error);
      }
    }
  }

  private init(): void {
    this.instance.init({
      lng: this.languageKey,
      fallbackLng: undefined,
      debug: false,
      resources: {
        en: {
          translation: english
        }
      },
      react: {
        wait: true,
        nsMode: 'fallback'
      }
    });
  }
}
