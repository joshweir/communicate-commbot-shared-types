import { DlqIgnoreRules } from './dlq-ignore-rules-types';
import { Dlq } from './dlq-types';
import { Commbot } from './commbot-commands-types';

export const interrogosaurusCommands = [
  'DLQ_CREATE_IGNORE_RULE', 
  'DLQ_DELETE_IGNORE_RULE',
  'DLQ_DELETE_MESSAGE',
  'DLQ_REQUEUE_MESSAGE',
] as [
  'DLQ_CREATE_IGNORE_RULE',
  'DLQ_DELETE_IGNORE_RULE',
  'DLQ_DELETE_MESSAGE',
  'DLQ_REQUEUE_MESSAGE',
];

export interface TInterrogosaurusCommandArgs {
  DLQ_CREATE_IGNORE_RULE: {
    dlqRuleRawRecord: DlqIgnoreRules.TDlqIgnoreRuleRawRecord;
    slackMessageTs: string;
  };

  DLQ_DELETE_IGNORE_RULE: {
    id: string;
    slackMessageTs: string;
  };

  DLQ_DELETE_MESSAGE: Dlq.TDlqMessageKey & {
    slackMessageTs: string;
  };

  DLQ_REQUEUE_MESSAGE: Dlq.TDlqMessageKey & {
    slackMessageTs: string;
  };
}

export type TInterrogosaurusCommandTypes = typeof interrogosaurusCommands;
export type TInterrogosaurusCommandType = TInterrogosaurusCommandTypes[number];

export type TInterrogosaurusCommand<A extends {} = {}> = {
  command: TInterrogosaurusCommandType;
  args: A;
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
