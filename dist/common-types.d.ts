import { SNS } from 'aws-sdk';
import { WebClient } from '@slack/web-api';
import { TCommbotCommand } from './commbot-commands-types';
export declare type TSendCommandToCommbot = (command: TCommbotCommand['command'], args: TCommbotCommand['args']) => Promise<any>;
export declare type TBuildSendCommandToCommbot = (sns: SNS, commbotTopicArn: string) => TSendCommandToCommbot;
export declare type TSlackContext = {
    client: WebClient;
    channel: string;
    sender: string;
    botUser: string;
};
//# sourceMappingURL=common-types.d.ts.map