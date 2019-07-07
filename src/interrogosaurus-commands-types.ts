import { Dlq } from './dlq-types';
import { Commbot } from './commbot-commands-types';
import { DlqIgnoreRules } from './dlq-ignore-rules';

export const interrogosaurusCommands = [
  'DLQ_CREATE_IGNORE_RULE', 
  'DLQ_DELETE_IGNORE_RULE',
  'DLQ_DELETE_MESSAGE',
  'DLQ_REQUEUE_MESSAGE',
  'DLQ_BULK_REQUEUE',
  'DLQ_LIST',
  'DLQ_LIST_IGNORE_RULES',
] as [
  'DLQ_CREATE_IGNORE_RULE',
  'DLQ_DELETE_IGNORE_RULE',
  'DLQ_DELETE_MESSAGE',
  'DLQ_REQUEUE_MESSAGE',
  'DLQ_BULK_REQUEUE',
  'DLQ_LIST',
  'DLQ_LIST_IGNORE_RULES',
];

export interface TInterrogosaurusCommandArgs {
  DLQ_CREATE_IGNORE_RULE: {
    dlqIgnoreRuleRawRecord: DlqIgnoreRules.TDlqIgnoreRuleRawRecord;
    slackMessageTs: string;
  };

  DLQ_DELETE_IGNORE_RULE: DlqIgnoreRules.TIgnoreRuleKey & {
    slackMessageTs: string;
  };

  DLQ_DELETE_MESSAGE: Dlq.TDlqMessageKey & {
    slackMessageTs: string;
  };

  DLQ_REQUEUE_MESSAGE: Dlq.TDlqMessageKey & {
    slackMessageTs: string;
  };

  DLQ_BULK_REQUEUE: {
    dlqName: string;
    processingEnvironmentId: string;
    slackMessageTs: string;
  };

  DLQ_LIST: {
    dlqName: string;
    processingEnvironmentId: string;
    slackMessageTs: string;
  };

  DLQ_LIST_IGNORE_RULES: {
    dlqName: string;
    processingEnvironmentId: string;
    slackMessageTs: string;
  };
}

export type TInterrogosaurusCommandTypes = typeof interrogosaurusCommands;
export type TInterrogosaurusCommandType = TInterrogosaurusCommandTypes[number];

export type TInterrogosaurusCommand<A extends {} = {}> = {
  command: TInterrogosaurusCommandType;
  args: A;
  localProcessingEnv?: string;
};

export const isInterrogosaurusCommand = (thing: any): thing is TInterrogosaurusCommand =>
  !!thing && interrogosaurusCommands.indexOf(thing.command) !== -1;

export type TInterrogosaurusCommandProcessor<C extends TInterrogosaurusCommandType> = (
  c: TInterrogosaurusCommand<TInterrogosaurusCommandArgs[C]>,
  {
    sendCommandToCommbot,
  }: {
    sendCommandToCommbot: Commbot.TSendCommandToCommbot;
  },
) => Promise<any>;
export type TInterrogosaurusCommandProcessors = {
  [c in TInterrogosaurusCommandType]: TInterrogosaurusCommandProcessor<c>
};
