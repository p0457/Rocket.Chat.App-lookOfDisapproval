import { IHttp, IModify, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { ISlashCommand, SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';

export class LookOfDisapprovalCommand implements ISlashCommand {
    public command: string = 'lookofdisapproval';
    public i18nParamsExample: string = 'Slash_Command_Params_Example';
    public i18nDescription: string = 'Slash_Command_Description';
    public providesPreview: boolean = false;

    public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp): Promise<void> {
        const icon = await read.getEnvironmentReader().getSettings().getValueById('lookofdisapproval_icon');
        const username = await read.getEnvironmentReader().getSettings().getValueById('lookofdisapproval_name');

        let response = 'ಠ_ಠ';
        let successful = true;

        if (context.getArguments().length >= 1) {
          const usernames = context.getArguments();
          usernames.forEach(username => {
            if (username.charAt(0) === '@') {
              response += ' ' + username;
            } else {
              response += ' @' + username;
            }
          });
        }
        // If arguments length is 0, no username, leave response alone

        const builder = modify.getCreator().startMessage()
          .setSender(context.getSender()).setRoom(context.getRoom())
          .setText(response).setUsernameAlias(username).setAvatarUrl(icon);

        await modify.getCreator().finish(builder);

        return;
    }
}
