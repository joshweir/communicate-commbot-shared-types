import { Dlq } from './dlq-types';
import { Commbot } from './commbot-commands-types';
import { DlqIgnoreRules } from './dlq-ignore-rules';
export declare const interrogosaurusCommands: ["DLQ_CREATE_IGNORE_RULE", "DLQ_DELETE_IGNORE_RULE", "DLQ_DELETE_MESSAGE", "DLQ_REQUEUE_MESSAGE", "DLQ_BULK_REQUEUE", "DLQ_LIST", "DLQ_LIST_IGNORE_RULES", "DLQ_RESUME", "DLQ_PAUSE"];
declare type TInterrogosaurusCommandArgsCommon = {
    slackMessageTs: string;
};
export interface TInterrogosaurusCommandArgs {
    DLQ_CREATE_IGNORE_RULE: TInterrogosaurusCommandArgsCommon & {
        dlqIgnoreRuleRawRecord: DlqIgnoreRules.TDlqIgnoreRuleRawRecord;
    };
    DLQ_DELETE_IGNORE_RULE: TInterrogosaurusCommandArgsCommon & DlqIgnoreRules.TIgnoreRuleKey;
    DLQ_DELETE_MESSAGE: TInterrogosaurusCommandArgsCommon & Dlq.TDlqMessageKey;
    DLQ_REQUEUE_MESSAGE: TInterrogosaurusCommandArgsCommon & Dlq.TDlqMessageKey;
    DLQ_BULK_REQUEUE: TInterrogosaurusCommandArgsCommon & {
        dlqName: string;
        processingEnvironmentId: string;
    };
    DLQ_LIST: TInterrogosaurusCommandArgsCommon & {
        dlqName: string;
        processingEnvironmentId: string;
    };
    DLQ_LIST_IGNORE_RULES: TInterrogosaurusCommandArgsCommon & {
        dlqName: string;
        processingEnvironmentId: string;
    };
    DLQ_RESUME: TInterrogosaurusCommandArgsCommon;
    DLQ_PAUSE: TInterrogosaurusCommandArgsCommon;
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
export {};
//# sourceMappingURL=interrogosaurus-commands-types.d.ts.map