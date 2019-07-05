import { Dlq } from './dlq-types';
import { Commbot } from './commbot-commands-types';
import { DlqIgnoreRules } from './dlq-ignore-rules';
export declare const interrogosaurusCommands: ["DLQ_CREATE_IGNORE_RULE", "DLQ_DELETE_IGNORE_RULE", "DLQ_DELETE_MESSAGE", "DLQ_REQUEUE_MESSAGE", "DLQ_BULK_REQUEUE", "DLQ_LIST"];
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
}
export declare type TInterrogosaurusCommandTypes = typeof interrogosaurusCommands;
export declare type TInterrogosaurusCommandType = TInterrogosaurusCommandTypes[number];
export declare type TInterrogosaurusCommand<A extends {} = {}> = {
    command: TInterrogosaurusCommandType;
    args: A;
    localProcessingEnv?: string;
};
export declare const isInterrogosaurusCommand: (thing: any) => thing is TInterrogosaurusCommand<{}>;
export declare type TInterrogosaurusCommandProcessor<C extends TInterrogosaurusCommandType> = (c: TInterrogosaurusCommand<TInterrogosaurusCommandArgs[C]>, { sendCommandToCommbot, }: {
    sendCommandToCommbot: Commbot.TSendCommandToCommbot;
}) => Promise<any>;
export declare type TInterrogosaurusCommandProcessors = {
    [c in TInterrogosaurusCommandType]: TInterrogosaurusCommandProcessor<c>;
};
//# sourceMappingURL=interrogosaurus-commands-types.d.ts.map