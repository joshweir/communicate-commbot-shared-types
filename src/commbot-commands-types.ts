import { SNS } from 'aws-sdk';
import { WebClient } from '@slack/web-api';
import { DlqIgnoreRules } from './dlq-ignore-rules';
import { Dlq } from './dlq-types';
import { DataEnv, Region } from './regions-and-envs';

export namespace Commbot {
  export type TSendCommandToCommbot = (
    command: TCommbotCommand['command'],
    args: TCommbotCommand['args'],
  ) => Promise<any>;

  export type TBuildSendCommandToCommbot = (sns: SNS, commbotTopicArn: string, localProcessingEnv?: string) => TSendCommandToCommbot;

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
    'DLQ_BULK_REQUEUE_SUCCESS',
    'DLQ_BULK_REQUEUE_FAILURE',
    'DLQ_LIST_SUCCESS',
    'DLQ_LIST_FAILURE',
    'DLQ_LIST_IGNORE_RULES_SUCCESS',
    'DLQ_LIST_IGNORE_RULES_FAILURE',
    'DLQ_RESUME_SUCCESS',
    'DLQ_RESUME_FAILURE',
    'DLQ_PAUSE_SUCCESS',
    'DLQ_PAUSE_FAILURE',
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
    'DLQ_BULK_REQUEUE_SUCCESS',
    'DLQ_BULK_REQUEUE_FAILURE',
    'DLQ_LIST_SUCCESS',
    'DLQ_LIST_FAILURE',
    'DLQ_LIST_IGNORE_RULES_SUCCESS',
    'DLQ_LIST_IGNORE_RULES_FAILURE',
    'DLQ_RESUME_SUCCESS',
    'DLQ_RESUME_FAILURE',
    'DLQ_PAUSE_SUCCESS',
    'DLQ_PAUSE_FAILURE',
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

    DLQ_BULK_REQUEUE_SUCCESS: {
      dlqName: string;
      processingEnvironmentId: string;
      slackMessageTs: string;
    };

    DLQ_BULK_REQUEUE_FAILURE: {
      dlqName: string;
      processingEnvironmentId: string;
      error: string;
      slackMessageTs: string;
    };

    DLQ_LIST_SUCCESS: {
      dlqName: string;
      processingEnvironmentId: string;
      content: string;
      slackMessageTs: string;
    };

    DLQ_LIST_FAILURE: {
      dlqName: string;
      processingEnvironmentId: string;
      error: string;
      slackMessageTs: string;
    };

    DLQ_LIST_IGNORE_RULES_SUCCESS: {
      dlqName: string;
      processingEnvironmentId: string;
      content: string;
      slackMessageTs: string;
    };

    DLQ_LIST_IGNORE_RULES_FAILURE: {
      dlqName: string;
      processingEnvironmentId: string;
      error: string;
      slackMessageTs: string;
    };

    DLQ_RESUME_SUCCESS: {
      region: Region;
      dataEnv: DataEnv;
      slackMessageTs: string;
    };

    DLQ_RESUME_FAILURE: {
      region: Region;
      dataEnv: DataEnv;
      slackMessageTs: string;
      error: string;
    };

    DLQ_PAUSE_SUCCESS: {
      region: Region;
      dataEnv: DataEnv;
      slackMessageTs: string;
    };

    DLQ_PAUSE_FAILURE: {
      region: Region;
      dataEnv: DataEnv;
      slackMessageTs: string;
      error: string;
    };
  };
  
  export type TCommbotCommandTypes = typeof commbotCommands;
  export type TCommbotCommandType = TCommbotCommandTypes[number];
  
  export type TCommbotCommand<A extends {} = {}> = {
    internalCommand: true;
    localProcessingEnv?: string;
    command: TCommbotCommandType;
    args: A;
  };
  
  export const isCommbotCommand = (thing: any): thing is TCommbotCommand =>
    !!thing && !!thing.internalCommand && commbotCommands.indexOf(thing.command) !== -1;
  
  export type TCommbotCommandProcessor<C extends TCommbotCommandType> = (
    c: TCommbotCommand<TCommbotCommandArgs[C]>,
    context: Pick<Commbot.TSlackContext, 'client'> & { userclient: WebClient },
  ) => Promise<any>;
  export type TCommbotCommandProcessors = { [c in TCommbotCommandType]: TCommbotCommandProcessor<c> };  
};
