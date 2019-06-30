import { DlqIgnoreRules } from './dlq-ignore-rules-types';
import { Commbot } from './commbot-commands-types';
export declare const interrogosaurusCommands: ["DLQ_CREATE_IGNORE_RULE", "DLQ_DELETE_IGNORE_RULE"];
export interface TInterrogosaurusCommandArgs {
    DLQ_CREATE_IGNORE_RULE: {
        dlqRuleRawRecord: DlqIgnoreRules.TDlqIgnoreRuleRawRecord;
    };
    DLQ_DELETE_IGNORE_RULE: {
        id: string;
    };
}
export declare type TInterrogosaurusCommandTypes = typeof interrogosaurusCommands;
export declare type TInterrogosaurusCommandType = TInterrogosaurusCommandTypes[number];
export declare type TInterrogosaurusCommand<A extends {} = {}> = {
    command: TInterrogosaurusCommandType;
    args: A;
};
export declare const isInterrogosaurusCommand: (thing: any) => thing is TInterrogosaurusCommand<{}>;
export declare type TInterrogosaurusCommandProcessor<C extends TInterrogosaurusCommandType> = (c: TInterrogosaurusCommand<TInterrogosaurusCommandArgs[C]>, { sendCommandToCommbot, }: {
    sendCommandToCommbot: Commbot.TSendCommandToCommbot;
}) => Promise<any>;
export declare type TInterrogosaurusCommandProcessors = {
    [c in TInterrogosaurusCommandType]: TInterrogosaurusCommandProcessor<c>;
};
//# sourceMappingURL=interrogosaurus-commands-types.d.ts.map