import { SNS } from 'aws-sdk';
import { WebClient } from '@slack/web-api';
import { DlqIgnoreRules } from './dlq-ignore-rules-types';
import { Dlq } from './dlq-types';

export namespace Commbot {
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

  export const commbotCommands = [
    'DLQ_ALERT',
    'DLQ_CREATE_IGNORE_RULE_SUCCESS',
    'DLQ_CREATE_IGNORE_RULE_FAILURE',
    'DLQ_DELETE_IGNORE_RULE_SUCCESS',
    'DLQ_DELETE_IGNORE_RULE_FAILURE',
  ] as [
    'DLQ_ALERT',
    'DLQ_CREATE_IGNORE_RULE_SUCCESS',
    'DLQ_CREATE_IGNORE_RULE_FAILURE',
    'DLQ_DELETE_IGNORE_RULE_SUCCESS',
    'DLQ_DELETE_IGNORE_RULE_FAILURE'
  ];
  
  export interface TCommbotCommandArgs {
    DLQ_ALERT: {
      dlqMessage: Dlq.TDlqMessage;
    };
  
    DLQ_CREATE_IGNORE_RULE_SUCCESS: {
      dlqRuleRawRecord: DlqIgnoreRules.TDlqIgnoreRuleRawRecord;
    };
  
    DLQ_CREATE_IGNORE_RULE_FAILURE: {
      dlqRuleRawRecord: DlqIgnoreRules.TDlqIgnoreRuleRawRecord;
      error: string;
    };
  
    DLQ_DELETE_IGNORE_RULE_SUCCESS: {
      id: string;
    };
  
    DLQ_DELETE_IGNORE_RULE_FAILURE: {
      id: string;
      error: string;
    };
  }
  
  export type TCommbotCommandTypes = typeof commbotCommands;
  export type TCommbotCommandType = TCommbotCommandTypes[number];
  
  export type TCommbotCommand<A extends {} = {}> = {
    internalCommand: true;
    command: TCommbotCommandType;
    args: A;
  };
  
  export const isCommbotCommand = (thing: any): thing is TCommbotCommand =>
    !!thing && !!thing.internalCommand && commbotCommands.indexOf(thing.command) !== -1;
  
  export type TCommbotCommandProcessor<C extends TCommbotCommandType> = (
    c: TCommbotCommand<TCommbotCommandArgs[C]>,
    context: Pick<Commbot.TSlackContext, 'client'>,
  ) => Promise<any>;
  export type TCommbotCommandProcessors = { [c in TCommbotCommandType]: TCommbotCommandProcessor<c> };  
};
