import {
    IConfigurationExtend, IEnvironmentRead, ILogger,
  } from '@rocket.chat/apps-engine/definition/accessors';
  import { App } from '@rocket.chat/apps-engine/definition/App';
  import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
  import { SettingType } from '@rocket.chat/apps-engine/definition/settings';
  
  import { LookOfDisapprovalCommand } from './commands/LookOfDisapprovalCommand';
  
  export class LookOfDisapprovalApp extends App {
    constructor(info: IAppInfo, logger: ILogger) {
      super(info, logger);
    }
  
    protected async extendConfiguration(configuration: IConfigurationExtend, environmentRead: IEnvironmentRead): Promise<void> {
      await configuration.settings.provideSetting({
        id: 'lookofdisapproval_name',
        type: SettingType.STRING,
        packageValue: 'lookofdisapproval',
        required: true,
        public: false,
        i18nLabel: 'Customize_Name',
        i18nDescription: 'Customize_Name_Description',
      });
  
      await configuration.settings.provideSetting({
        id: 'lookofdisapproval_icon',
        type: SettingType.STRING,
        packageValue: 'https://raw.githubusercontent.com/tgardner851/Rocket.Chat.App-lookOfDisapproval/master/icon.gif',
        required: true,
        public: false,
        i18nLabel: 'Customize_Icon',
        i18nDescription: 'Customize_Icon_Description',
      });
  
      await configuration.slashCommands.provideSlashCommand(new LookOfDisapprovalCommand());
    }
  }
  