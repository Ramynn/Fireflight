import path from 'path';
import {app} from 'electron';
import {processHelper, debugHelper} from '../helpers';
import fs from 'fs';
import is from 'electron-is';
import {application} from '../bootstrap';

export class FirewallService {
  private static instance: FirewallService;
  protected readonly configPath = path.join(app.getPath('userData'), 'firewall');
  protected readonly templatePath = path.resolve('config/firewall-rules');

  constructor() {
    fs.mkdirSync(this.configPath, {recursive: true});
  }

  public static shared(): FirewallService {
    return this.instance || (this.instance = new FirewallService());
  }

  public async disable() {
    try {
      if (is.macOS()) {
        await this.disableOnMacOS();
      }
    } catch (error) {
      debugHelper.error(error);
      throw error;
    }
  }

  public async enable(): Promise<void> {
    const {isEnabled} = application.settings;

    if (isEnabled) {
      try {
        if (is.macOS()) {
          await this.enableOnMacOS();
        }
      } catch (error) {
        debugHelper.error(error);
        throw error;
      }
    }

    return Promise.resolve();
  }

  public async update() {
    try {
      await this.disable();
      await this.enable();
    } catch (error) {
      debugHelper.error(error);
      throw error;
    }
  }

  private async enableOnMacOS(): Promise<string> {
    try {
      const configFile = path.join(this.configPath, 'pf.conf');
      const templateFile = path.join(this.templatePath, 'macos.template');
      const configContent = await fs.promises.readFile(templateFile, 'utf8');
      const firewallRules = application.allowedIPs.map((allowedIPItem, index) => `pass from any to ${allowedIPItem} # Automatically generated, Rule ${index}`);
      const newConfigContent = configContent.replace('%__IP_ADDRESSES_RULES__%', firewallRules.join('\n'));

      await fs.promises.writeFile(configFile, newConfigContent, 'utf8');

      return processHelper.exec(`sudo pfctl -f "${configFile}" -e`);
    } catch (error) {
      debugHelper.error('FirewallService', 'Enable on macOS', error);
      throw error;
    }
  }

  private disableOnMacOS(): Promise<string> {
    const configFile = path.join(this.configPath, 'pf.conf');

    return processHelper.exec(`sudo pfctl -f "${configFile}" -d || true`);
  }
}

export const firewallService = FirewallService.shared();
