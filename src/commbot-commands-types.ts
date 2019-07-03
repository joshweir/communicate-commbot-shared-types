import { SNS } from 'aws-sdk';
import { WebClient } from '@slack/web-api';
import { DlqIgnoreRules } from './dlq-ignore-rules';
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
    'DLQ_REQUEUE_MESSAGE_SUCCESS',
    'DLQ_REQUEUE_MESSAGE_FAILURE',
    'DLQ_DELETE_MESSAGE_SUCCESS',
    'DLQ_DELETE_MESSAGE_FAILURE',
  ] as [
    'DLQ_ALERT',
    'DLQ_CREATE_IGNORE_RULE_SUCCESS',
    'DLQ_CREATE_IGNORE_RULE_FAILURE',
    'DLQ_DELETE_IGNORE_RULE_SUCCESS',
    'DLQ_DELETE_IGNORE_RULE_FAILURE',
    'DLQ_REQUEUE_MESSAGE_SUCCESS',
    'DLQ_REQUEUE_MESSAGE_FAILURE',
    'DLQ_DELETE_MESSAGE_SUCCESS',
    'DLQ_DELETE_MESSAGE_FAILURE',
  ];
  
  export interface TCommbotCommandArgs {
    DLQ_ALERT: {
      dlqMessage: Dlq.TDlqMessage;
    };
  
    DLQ_CREATE_IGNORE_RULE_SUCCESS: {
      dlqIgnoreRuleRawRecord: DlqIgnoreRules.TDlqIgnoreRuleRawRecord;
      slackMessageTs: string;
    };
  
    DLQ_CREATE_IGNORE_RULE_FAILURE: {
      dlqIgnoreRuleRawRecord: DlqIgnoreRules.TDlqIgnoreRuleRawRecord;
      error: string;
      slackMessageTs: string;
    };
  
    DLQ_DELETE_IGNORE_RULE_SUCCESS: DlqIgnoreRules.TIgnoreRuleKey & {
      slackMessageTs: string;
    };
  
    DLQ_DELETE_IGNORE_RULE_FAILURE: DlqIgnoreRules.TIgnoreRuleKey & {
      error: string;
      slackMessageTs: string;
    };

    DLQ_REQUEUE_MESSAGE_SUCCESS: {
      dlqMessageKey: Dlq.TDlqMessageKey;
      slackMessageTs: string;
    };

    DLQ_REQUEUE_MESSAGE_FAILURE: {
      dlqMessageKey: Dlq.TDlqMessageKey;
      error: string;
      slackMessageTs: string;
    };

    DLQ_DELETE_MESSAGE_SUCCESS: {
      dlqMessageKey: Dlq.TDlqMessageKey;
      slackMessageTs: string;
    };

    DLQ_DELETE_MESSAGE_FAILURE: {
      dlqMessageKey: Dlq.TDlqMessageKey;
      error: string;
      slackMessageTs: string;
    };
  };
  
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
