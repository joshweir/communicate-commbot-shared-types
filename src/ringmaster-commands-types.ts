import { Dlq } from './dlq-types';
import { Commbot } from './commbot-commands-types';
import { DlqIgnoreRules } from './dlq-ignore-rules';

export const ringmasterCommands = [
  'DLQ_CREATE_IGNORE_RULE', 
  'DLQ_DELETE_IGNORE_RULE',
  'DLQ_DELETE_MESSAGE',
  'DLQ_REQUEUE_MESSAGE',
  'DLQ_BULK_REQUEUE',
  'DLQ_LIST_IGNORE_RULES',
  'DLQ_RESUME',
  'DLQ_PAUSE',
  'DLQ_COUNT',
  'DLQ_HEAD',
  'DLQ_TAIL',
  'DLQ_PICK',

  'QDB_PAUSE',
  'QDB_RESUME',
  'QDB_RESTART',
  'QDB_WARM_TO_HOT',
] as [
  'DLQ_CREATE_IGNORE_RULE',
  'DLQ_DELETE_IGNORE_RULE',
  'DLQ_DELETE_MESSAGE',
  'DLQ_REQUEUE_MESSAGE',
  'DLQ_BULK_REQUEUE',
  'DLQ_LIST_IGNORE_RULES',
  'DLQ_RESUME',
  'DLQ_PAUSE',
  'DLQ_COUNT',
  'DLQ_HEAD',
  'DLQ_TAIL',
  'DLQ_PICK',

  'QDB_PAUSE',
  'QDB_RESUME',
  'QDB_RESTART',
  'QDB_WARM_TO_HOT',
];

type TRingmasterCommandArgsCommon = {
  slackMessageTs?: string;
};

type TQDBCommandArgsCommon = TRingmasterCommandArgsCommon & {
  qdbName: string;
};

export interface TRingmasterCommandArgs {
  DLQ_CREATE_IGNORE_RULE: TRingmasterCommandArgsCommon & {
    dlqIgnoreRuleRawRecord: DlqIgnoreRules.TDlqIgnoreRuleRawRecord;
  };

  DLQ_DELETE_IGNORE_RULE: TRingmasterCommandArgsCommon & DlqIgnoreRules.TIgnoreRuleKey;

  DLQ_DELETE_MESSAGE: TRingmasterCommandArgsCommon & Dlq.TDlqMessageKey;

  DLQ_REQUEUE_MESSAGE: TRingmasterCommandArgsCommon & Dlq.TDlqMessageKey;

  DLQ_BULK_REQUEUE: TRingmasterCommandArgsCommon & {
    dlqName: string;
    n?: number;
  };

  DLQ_LIST_IGNORE_RULES: TRingmasterCommandArgsCommon & {
    dlqName: string;
    processingEnvironmentId: string;
  };

  DLQ_RESUME: TRingmasterCommandArgsCommon;

  DLQ_PAUSE: TRingmasterCommandArgsCommon;

  DLQ_COUNT: TRingmasterCommandArgsCommon & {
    dlqName: string;
    n: number;
  };

  DLQ_HEAD: TRingmasterCommandArgsCommon & {
    dlqName: string;
  };

  DLQ_TAIL: TRingmasterCommandArgsCommon & {
    dlqName: string;
  };

  DLQ_PICK: TRingmasterCommandArgsCommon & {
    operationIdOrMessageId: string;
  };

  QDB_PAUSE: TQDBCommandArgsCommon;
  QDB_RESUME: TQDBCommandArgsCommon;
  QDB_RESTART: TQDBCommandArgsCommon;
  QDB_WARM_TO_HOT: TQDBCommandArgsCommon;
}

export type TRingmasterCommandTypes = typeof ringmasterCommands;
export type TRingmasterCommandType = TRingmasterCommandTypes[number];

export type TRingmasterCommand<A extends {} = {}> = {
  command: TRingmasterCommandType;
  args: A;
  localProcessingEnv?: string;
};

export const isRingmasterCommand = (thing: any): thing is TRingmasterCommand =>
  !!thing && ringmasterCommands.indexOf(thing.command) !== -1;

export type TRingmasterCommandProcessor<C extends TRingmasterCommandType> = (
  c: TRingmasterCommand<TRingmasterCommandArgs[C]>,
  {
    sendCommandToCommbot,
  }: {
    sendCommandToCommbot: Commbot.TSendCommandToCommbot;
  },
) => Promise<any>;
export type TRingmasterCommandProcessors = {
  [c in TRingmasterCommandType]: TRingmasterCommandProcessor<c>
};
