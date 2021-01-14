import {menubar, Menubar} from 'menubar';
import {app, BrowserWindow, ipcMain, Tray} from 'electron';
import {basename, resolve} from 'path';
import URL from 'url';
import {AppSettingsInterface, IPCChannelInterface, StorageNames} from '../../shared';
import {firewallService} from '../services/FirewallService';
import {debugHelper, storageHelper} from '../helpers';
import {application} from '../bootstrap';
import {privateIPList} from '../constants';
import {dev} from 'electron-is';

export class Main {
  private readonly pathNames = {
    build: resolve(__dirname, '../../'),
    icons: [resolve(__dirname, '../../public/IconTemplate.png'), resolve(__dirname, '../../public/IconDisableTemplate.png')],
    baseFile: resolve(__dirname, '../../app/index.html')
  };
  public readonly isDevelopment: boolean = dev();
  public readonly execPath: string = basename(process.execPath);
  public tray!: Tray;
  public window: BrowserWindow | undefined;
  public menubar: Menubar | undefined;

  public init(IPCChannels: IPCChannelInterface<any>[]): Main {
    this.onInit();

    app.on('ready', () => this.create());
    app.on('window-all-closed', () => this.onWindowAllClosed());
    app.on('activate', () => this.onActivate());

    this.registerIPCChannels(IPCChannels);
    this.update();

    return this;
  }

  public update(): Main {
    this.setLoginItemSettings();
    firewallService.update();

    return this;
  }

  public updateTray(): Main {
    const {runInMenubar} = this.settings;

    if (runInMenubar && this.menubar && this.tray) {
      const [latestStoredIP] = storageHelper.get(StorageNames.StoredIPList);
      const icon = this.getIcon();

      this.tray.setImage(icon);

      if (latestStoredIP) {
        this.tray.setTitle(` ${latestStoredIP.IP}`);
      } else {
        this.tray.setTitle('');
      }
    }

    return this;
  }

  public reload(): Main {
    this.create();
    this.update();

    return this;
  }

  public get settings(): AppSettingsInterface {
    return storageHelper.get(StorageNames.AppSettings);
  }

  public get version(): string {
    return '1.0.0';
  }

  public get allowedIPs() {
    const {allowPrivateIPs} = application.settings;
    const allowedIPList = storageHelper.get(StorageNames.AllowedIPList);

    if (allowPrivateIPs) {
      return [...allowedIPList, ...privateIPList];
    }

    return [...allowedIPList];
  }

  private onInit() {
    const gotTheLock = app.requestSingleInstanceLock();

    if (!gotTheLock) {
      app.quit();
    } else {
      app.on('second-instance', (event) => {
        event.preventDefault();

        return;
      });
    }
  }

  private setLoginItemSettings() {
    const {openOnSystemStart = true} = this.settings;

    app.setLoginItemSettings({
      openAsHidden: false,
      args: ['--processStart', `"${this.execPath}"`],
      openAtLogin: openOnSystemStart,
      path: app.getPath('exe')
    });
  }

  private onWindowAllClosed() {
    try {
      if (this.menubar) {
        app.dock.hide();
        if (this.menubar && process.platform !== 'darwin') {
          app.quit();
        }
      }
    } catch (error) {
      debugHelper.error('Main', 'On Window All Closed', error);
    }
  }

  private onActivate() {
    if (!this.window && !this.menubar) {
      this.create();
    }
  }

  private createTray() {
    const icon = this.getIcon();

    this.tray = new Tray(icon);
  }

  private create() {
    const {runInMenubar} = this.settings;
    // const needRelaunch = this.window || this.menubar;

    if (this.window) {
      this.window.hide();
    }

    if (this.menubar) {
      this.menubar.hideWindow();
      this.menubar.app.hide();
      // this.menubar.app.quit();
    }

    this.menubar = undefined;
    this.window = undefined;

    if (runInMenubar) {
      this.createMenubar();
    } else {
      this.createWindow();
    }

    // if (needRelaunch) {
    //   app.relaunch();
    // }
  }

  private createMenubar() {
    this.createTray();

    this.menubar = menubar({
      tray: this.tray,
      index: this.isDevelopment
        ? 'http://localhost:3000/index.html'
        : URL.format({
            pathname: this.pathNames.baseFile,
            protocol: 'file:',
            slashes: true
          }),
      icon: this.getIcon(),
      browserWindow: this.getWindowOptions(),
      tooltip: 'FireFlight',
      showOnAllWorkspaces: false
    });

    this.menubar.showWindow().catch((error) => debugHelper.error('Main', 'Create menubar', error));

    setTimeout(() => this.menubar?.showWindow(), 4000);

    this.menubar.on('after-create-window', () => {
      if (this.isDevelopment) {
        this.menubar?.window?.webContents.openDevTools();
      }
    });
  }

  private createWindow() {
    this.window = new BrowserWindow({
      ...this.getWindowOptions(),
      titleBarStyle: 'hidden',
      movable: true
    });

    if (this.isDevelopment) {
      this.window.loadURL('http://localhost:3000/index.html');
    } else {
      this.window.loadFile(
        URL.format({
          pathname: this.pathNames.baseFile,
          protocol: 'file:',
          slashes: true
        })
      );
    }

    this.window.show();

    this.window.on('show', () => {
      if (this.isDevelopment) {
        this.menubar?.window?.webContents.openDevTools();
      }
    });
  }

  private getWindowOptions() {
    return {
      icon: this.getIcon(),
      width: 420,
      height: 680,
      minimizable: true,
      resizable: false,
      fullscreenable: false,
      closable: true,
      alwaysOnTop: this.isDevelopment,
      transparent: false,
      backgroundColor: '#171529',
      webPreferences: {
        backgroundThrottling: false,
        nodeIntegration: true
      }
    };
  }

  private registerIPCChannels(IPCChannels: IPCChannelInterface<any>[]) {
    IPCChannels.forEach((channel) => {
      ipcMain.on(channel.getName() as string, (event, request) => channel.handle(event, request));
    });
  }

  private getIcon(): string {
    const {isEnabled} = this.settings;
    const [safeIcon, unsafeIcon] = this.pathNames.icons;

    return isEnabled ? safeIcon : unsafeIcon;
  }
}
