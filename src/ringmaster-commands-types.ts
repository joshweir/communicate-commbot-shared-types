import { Dlq } from './dlq-types';
import { Commbot } from './commbot-commands-types';
import { DlqIgnoreRules } from './dlq-ignore-rules';

export const ringmasterCommands = [
  'DLQ_CREATE_IGNORE_RULE', 
  'DLQ_DELETE_IGNORE_RULE',
  'DLQ_DELETE_MESSAGE',
  'DLQ_REQUEUE_MESSAGE',
  'DLQ_BULK_REQUEUE',
  'DLQ_LIST',
  'DLQ_LIST_IGNORE_RULES',
  'DLQ_RESUME',
  'DLQ_PAUSE',
] as [
  'DLQ_CREATE_IGNORE_RULE',
  'DLQ_DELETE_IGNORE_RULE',
  'DLQ_DELETE_MESSAGE',
  'DLQ_REQUEUE_MESSAGE',
  'DLQ_BULK_REQUEUE',
  'DLQ_LIST',
  'DLQ_LIST_IGNORE_RULES',
  'DLQ_RESUME',
  'DLQ_PAUSE',
];

type TRingmasterCommandArgsCommon = {
  slackMessageTs: string;
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
    processingEnvironmentId: string;
  };

  DLQ_LIST: TRingmasterCommandArgsCommon & {
    dlqName: string;
    processingEnvironmentId: string;
  };

  DLQ_LIST_IGNORE_RULES: TRingmasterCommandArgsCommon & {
    dlqName: string;
    processingEnvironmentId: string;
  };

  DLQ_RESUME: TRingmasterCommandArgsCommon;

  DLQ_PAUSE: TRingmasterCommandArgsCommon;
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
