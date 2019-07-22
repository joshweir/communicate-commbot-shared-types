import { Dlq } from './dlq-types';
import { Commbot } from './commbot-commands-types';
import { DlqIgnoreRules } from './dlq-ignore-rules';
export declare const ringmasterCommands: ["DLQ_CREATE_IGNORE_RULE", "DLQ_DELETE_IGNORE_RULE", "DLQ_DELETE_MESSAGE", "DLQ_REQUEUE_MESSAGE", "DLQ_BULK_REQUEUE", "DLQ_LIST", "DLQ_LIST_IGNORE_RULES", "DLQ_RESUME", "DLQ_PAUSE"];
declare type TRingmasterCommandArgsCommon = {
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
export declare type TRingmasterCommandTypes = typeof ringmasterCommands;
export declare type TRingmasterCommandType = TRingmasterCommandTypes[number];
export declare type TRingmasterCommand<A extends {} = {}> = {
    command: TRingmasterCommandType;
    args: A;
    localProcessingEnv?: string;
};
export declare const isRingmasterCommand: (thing: any) => thing is TRingmasterCommand<{}>;
export declare type TRingmasterCommandProcessor<C extends TRingmasterCommandType> = (c: TRingmasterCommand<TRingmasterCommandArgs[C]>, { sendCommandToCommbot, }: {
    sendCommandToCommbot: Commbot.TSendCommandToCommbot;
}) => Promise<any>;
export declare type TRingmasterCommandProcessors = {
    [c in TRingmasterCommandType]: TRingmasterCommandProcessor<c>;
};
export {};
//# sourceMappingURL=ringmaster-commands-types.d.ts.map