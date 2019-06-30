import { DlqIgnoreRules } from './dlq-ignore-rules-types';
import { Commbot } from './commbot-commands-types';

export const interrogosaurusCommands = ['DLQ_CREATE_IGNORE_RULE', 'DLQ_DELETE_IGNORE_RULE'] as [
  'DLQ_CREATE_IGNORE_RULE',
  'DLQ_DELETE_IGNORE_RULE'
];

export interface TInterrogosaurusCommandArgs {
  DLQ_CREATE_IGNORE_RULE: {
    dlqRuleRawRecord: DlqIgnoreRules.TDlqIgnoreRuleRawRecord;
  };

  DLQ_DELETE_IGNORE_RULE: {
    id: string;
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
