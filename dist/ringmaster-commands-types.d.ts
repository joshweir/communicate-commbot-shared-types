import { Dlq } from './dlq-types';
import { Commbot } from './commbot-commands-types';
import { DlqIgnoreRules } from './dlq-ignore-rules';
export declare const ringmasterCommands: ["DLQ_CREATE_IGNORE_RULE", "DLQ_DELETE_IGNORE_RULE", "DLQ_DELETE_MESSAGE", "DLQ_REQUEUE_MESSAGE", "DLQ_BULK_REQUEUE", "DLQ_LIST_IGNORE_RULES", "DLQ_RESUME", "DLQ_PAUSE", "DLQ_COUNT", "DLQ_HEAD", "DLQ_TAIL", "DLQ_PICK", "DLQ_CREATE_TRASH_RULE", "DLQ_DELETE_TRASH_RULE", "DLQ_LIST_TRASH_RULES", "DLQ_STATUS", "FARKEN_PAUSE", "FARKEN_RESUME", "QDB_PAUSE", "QDB_RESUME", "QDB_RESTART", "QDB_WARM_TO_HOT", "DATAMOD", "GET_ENTITY"];
declare type TRingmasterCommandArgsCommon = {
    slackMessageTs: string;
    slackChannelId: string;
};
declare type TQDBCommandArgsCommon = TRingmasterCommandArgsCommon & {
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
    DLQ_CREATE_TRASH_RULE: TRingmasterCommandArgsCommon & {
        dlqIgnoreRuleRawRecord: DlqIgnoreRules.TDlqIgnoreRuleRawRecord;
    };
    DLQ_DELETE_TRASH_RULE: TRingmasterCommandArgsCommon & DlqIgnoreRules.TIgnoreRuleKey;
    DLQ_LIST_TRASH_RULES: TRingmasterCommandArgsCommon & {
        dlqName: string;
        processingEnvironmentId: string;
    };
    DLQ_STATUS: TRingmasterCommandArgsCommon;
    FARKEN_RESUME: TRingmasterCommandArgsCommon;
    FARKEN_PAUSE: TRingmasterCommandArgsCommon;
    QDB_PAUSE: TQDBCommandArgsCommon;
    QDB_RESUME: TQDBCommandArgsCommon;
    QDB_RESTART: TQDBCommandArgsCommon;
    QDB_WARM_TO_HOT: TQDBCommandArgsCommon;
    DATAMOD: TRingmasterCommandArgsCommon & {
        dataMods: string;
    };
    GET_ENTITY: TRingmasterCommandArgsCommon & {
        uri: string;
    };
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