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
    'GENERIC_ALERT',
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
    'DLQ_LIST_IGNORE_RULES_SUCCESS',
    'DLQ_LIST_IGNORE_RULES_FAILURE',
    'DLQ_RESUME_SUCCESS',
    'DLQ_RESUME_FAILURE',
    'DLQ_PAUSE_SUCCESS',
    'DLQ_PAUSE_FAILURE',
    'DLQ_COUNT_SUCCESS',
    'DLQ_COUNT_FAILURE',
    'DLQ_HEAD_SUCCESS',
    'DLQ_HEAD_FAILURE',
    'DLQ_TAIL_SUCCESS',
    'DLQ_TAIL_FAILURE',
    'DLQ_PICK_SUCCESS',
    'DLQ_PICK_FAILURE',
    'DLQ_CREATE_TRASH_RULE_SUCCESS',
    'DLQ_CREATE_TRASH_RULE_FAILURE',
    'DLQ_DELETE_TRASH_RULE_SUCCESS',
    'DLQ_DELETE_TRASH_RULE_FAILURE',
    'DLQ_LIST_TRASH_RULES_SUCCESS',
    'DLQ_LIST_TRASH_RULES_FAILURE',

    'QDB_COLD_TO_WARM_ALERT',
    'QDB_WARM_UP_TO_DATE',
    'QDB_ALERT',
    'QDB_PAUSE_SUCCESS',
    'QDB_PAUSE_FAILURE',
    'QDB_RESUME_SUCCESS',
    'QDB_RESUME_FAILURE',
    'QDB_RESTART_SUCCESS',
    'QDB_RESTART_FAILURE',
    'QDB_WARM_TO_HOT_SUCCESS',
    'QDB_WARM_TO_HOT_FAILURE',

    'DATAMOD_SUCCESS',
    'DATAMOD_FAILURE',
  ] as [
    'GENERIC_ALERT',
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
    'DLQ_LIST_IGNORE_RULES_SUCCESS',
    'DLQ_LIST_IGNORE_RULES_FAILURE',
    'DLQ_RESUME_SUCCESS',
    'DLQ_RESUME_FAILURE',
    'DLQ_PAUSE_SUCCESS',
    'DLQ_PAUSE_FAILURE',
    'DLQ_COUNT_SUCCESS',
    'DLQ_COUNT_FAILURE',
    'DLQ_HEAD_SUCCESS',
    'DLQ_HEAD_FAILURE',
    'DLQ_TAIL_SUCCESS',
    'DLQ_TAIL_FAILURE',
    'DLQ_PICK_SUCCESS',
    'DLQ_PICK_FAILURE',
    'DLQ_CREATE_TRASH_RULE_SUCCESS',
    'DLQ_CREATE_TRASH_RULE_FAILURE',
    'DLQ_DELETE_TRASH_RULE_SUCCESS',
    'DLQ_DELETE_TRASH_RULE_FAILURE',
    'DLQ_LIST_TRASH_RULES_SUCCESS',
    'DLQ_LIST_TRASH_RULES_FAILURE',

    'QDB_COLD_TO_WARM_ALERT',
    'QDB_WARM_UP_TO_DATE',
    'QDB_ALERT',
    'QDB_PAUSE_SUCCESS',
    'QDB_PAUSE_FAILURE',
    'QDB_RESUME_SUCCESS',
    'QDB_RESUME_FAILURE',
    'QDB_RESTART_SUCCESS',
    'QDB_RESTART_FAILURE',
    'QDB_WARM_TO_HOT_SUCCESS',
    'QDB_WARM_TO_HOT_FAILURE',

    'DATAMOD_SUCCESS',
    'DATAMOD_FAILURE',
  ];
  
  type TWithOrigSlackMsg = {
    slackMessageTs: string;
    slackChannelId: string;
  };

  type TFailureCommon = {
    error: string;
  }

  type TQDBCommandArgsCommon = {
    qdbName: string;
  }

  type TWithRegionAndDataEnv = {
    region: Region;
    dataEnv: DataEnv;
  }

  export interface TCommbotCommandArgs {
    GENERIC_ALERT: TWithRegionAndDataEnv & {
      content: string;
    };

    DLQ_ALERT: {
      dlqMessage: Dlq.TDlqMessage;
    };
  
    DLQ_CREATE_IGNORE_RULE_SUCCESS: TWithOrigSlackMsg & TWithRegionAndDataEnv & {
      dlqIgnoreRuleRawRecord: DlqIgnoreRules.TDlqIgnoreRuleRawRecord;
    };
  
    DLQ_CREATE_IGNORE_RULE_FAILURE: TFailureCommon & TWithOrigSlackMsg & TWithRegionAndDataEnv & {
      dlqIgnoreRuleRawRecord: DlqIgnoreRules.TDlqIgnoreRuleRawRecord;
    };
  
    DLQ_DELETE_IGNORE_RULE_SUCCESS: TWithOrigSlackMsg & DlqIgnoreRules.TIgnoreRuleKey;
  
    DLQ_DELETE_IGNORE_RULE_FAILURE: TFailureCommon & TWithOrigSlackMsg & DlqIgnoreRules.TIgnoreRuleKey;

    DLQ_REQUEUE_MESSAGE_SUCCESS: TWithOrigSlackMsg & {
      dlqMessageKey: Dlq.TDlqMessageKey;
    };

    DLQ_REQUEUE_MESSAGE_FAILURE: TFailureCommon & TWithOrigSlackMsg & {
      dlqMessageKey: Dlq.TDlqMessageKey;
    };

    DLQ_DELETE_MESSAGE_SUCCESS: TWithOrigSlackMsg & {
      dlqMessageKey: Dlq.TDlqMessageKey;
    };

    DLQ_DELETE_MESSAGE_FAILURE: TFailureCommon & TWithOrigSlackMsg & {
      dlqMessageKey: Dlq.TDlqMessageKey;
    };

    DLQ_BULK_REQUEUE_SUCCESS: TWithOrigSlackMsg & TWithRegionAndDataEnv & {
      dlqName: string;
      content: string;
    };

    DLQ_BULK_REQUEUE_FAILURE: TFailureCommon & TWithOrigSlackMsg & TWithRegionAndDataEnv & {
      dlqName: string;
    };

    DLQ_LIST_IGNORE_RULES_SUCCESS: TWithOrigSlackMsg & {
      dlqName: string;
      region: Region;
      processingEnvironmentId: string;
      content: string;
    };

    DLQ_LIST_IGNORE_RULES_FAILURE: TFailureCommon & TWithOrigSlackMsg & {
      dlqName: string;
      region: Region;
      processingEnvironmentId: string;
    };

    DLQ_RESUME_SUCCESS: TWithOrigSlackMsg & TWithRegionAndDataEnv;

    DLQ_RESUME_FAILURE: TFailureCommon & TWithOrigSlackMsg & TWithRegionAndDataEnv;

    DLQ_PAUSE_SUCCESS: TWithOrigSlackMsg & TWithRegionAndDataEnv;

    DLQ_PAUSE_FAILURE: TFailureCommon & TWithOrigSlackMsg & TWithRegionAndDataEnv;

    DLQ_COUNT_SUCCESS: TWithOrigSlackMsg & TWithRegionAndDataEnv & {
      dlqName: string;
      n: number;
      content: string;
      warning?: string;
    };

    DLQ_COUNT_FAILURE: TFailureCommon & TWithOrigSlackMsg & TWithRegionAndDataEnv & {
      dlqName: string;
      n: number;
    };

    DLQ_HEAD_SUCCESS: TWithOrigSlackMsg & TWithRegionAndDataEnv & {
      dlqName: string;
      content: string;
    };

    DLQ_HEAD_FAILURE: TFailureCommon & TWithOrigSlackMsg & TWithRegionAndDataEnv & {
      dlqName: string;
    };

    DLQ_TAIL_SUCCESS: TWithOrigSlackMsg & TWithRegionAndDataEnv & {
      dlqName: string;
      content: string;
    };

    DLQ_TAIL_FAILURE: TFailureCommon & TWithOrigSlackMsg & TWithRegionAndDataEnv & {
      dlqName: string;
    };

    DLQ_PICK_SUCCESS: TWithOrigSlackMsg & TWithRegionAndDataEnv & {
      operationIdOrMessageId: string;
      content: string;
    };

    DLQ_PICK_FAILURE: TFailureCommon & TWithOrigSlackMsg & TWithRegionAndDataEnv & {
      operationIdOrMessageId: string;
    };

    DLQ_CREATE_TRASH_RULE_SUCCESS: TWithOrigSlackMsg & TWithRegionAndDataEnv & {
      dlqIgnoreRuleRawRecord: DlqIgnoreRules.TDlqIgnoreRuleRawRecord;
    };
  
    DLQ_CREATE_TRASH_RULE_FAILURE: TFailureCommon & TWithOrigSlackMsg & TWithRegionAndDataEnv & {
      dlqIgnoreRuleRawRecord: DlqIgnoreRules.TDlqIgnoreRuleRawRecord;
    };
  
    DLQ_DELETE_TRASH_RULE_SUCCESS: TWithOrigSlackMsg & DlqIgnoreRules.TIgnoreRuleKey;
  
    DLQ_DELETE_TRASH_RULE_FAILURE: TFailureCommon & TWithOrigSlackMsg & DlqIgnoreRules.TIgnoreRuleKey;

    DLQ_LIST_TRASH_RULES_SUCCESS: TWithOrigSlackMsg & {
      dlqName: string;
      region: Region;
      processingEnvironmentId: string;
      content: string;
    };

    DLQ_LIST_TRASH_RULES_FAILURE: TFailureCommon & TWithOrigSlackMsg & {
      dlqName: string;
      region: Region;
      processingEnvironmentId: string;
    };

    QDB_COLD_TO_WARM_ALERT: TQDBCommandArgsCommon & TWithRegionAndDataEnv & {
      iteratorAge: number;
    };

    QDB_WARM_UP_TO_DATE: TQDBCommandArgsCommon & TWithRegionAndDataEnv;

    QDB_ALERT: TQDBCommandArgsCommon & TWithRegionAndDataEnv & {
      content: string;
    }

    QDB_PAUSE_SUCCESS: TQDBCommandArgsCommon & TWithOrigSlackMsg & TWithRegionAndDataEnv;

    QDB_PAUSE_FAILURE: TQDBCommandArgsCommon & TWithOrigSlackMsg & TFailureCommon & TWithRegionAndDataEnv;
    QDB_RESUME_SUCCESS: TQDBCommandArgsCommon & TWithOrigSlackMsg & TWithRegionAndDataEnv;
    QDB_RESUME_FAILURE: TQDBCommandArgsCommon & TWithOrigSlackMsg & TFailureCommon & TWithRegionAndDataEnv;
    QDB_RESTART_SUCCESS: TQDBCommandArgsCommon & TWithOrigSlackMsg & TWithRegionAndDataEnv;
    QDB_RESTART_FAILURE: TQDBCommandArgsCommon & TWithOrigSlackMsg & TFailureCommon & TWithRegionAndDataEnv;
    QDB_WARM_TO_HOT_SUCCESS: TQDBCommandArgsCommon & TWithOrigSlackMsg & TWithRegionAndDataEnv;
    QDB_WARM_TO_HOT_FAILURE: TQDBCommandArgsCommon & TWithOrigSlackMsg & TFailureCommon & TWithRegionAndDataEnv;

    DATAMOD_SUCCESS: TWithOrigSlackMsg & TWithRegionAndDataEnv;
    DATAMOD_FAILURE: TWithOrigSlackMsg & TWithRegionAndDataEnv & TFailureCommon;
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
