import { SNS } from 'aws-sdk';
import { WebClient } from '@slack/web-api';
import { TCommbotCommand } from './commbot-commands-types';

export type TSendCommandToCommbot = (
  command: TCommbotCommand['command'],
  args: TCommbotCommand['args'],
) => Promise<any>;

export type TBuildSendCommandToCommbot = (sns: SNS, commbotTopicArn: string) => TSendCommandToCommbot;

export type TSlackContext = {
  client: WebClient;
  channel: string;
  sender: string;
  botUser: string;
};
