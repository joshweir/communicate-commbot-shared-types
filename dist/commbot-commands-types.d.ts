import { TDlqIgnoreRuleRawRecord } from './dlq-ignore-rules-types';
import { TSlackContext } from './common-types';
import { TDlqMessage } from './dlq-types';
export declare const commbotCommands: ["DLQ_ALERT", "DLQ_CREATE_IGNORE_RULE_SUCCESS", "DLQ_CREATE_IGNORE_RULE_FAILURE", "DLQ_DELETE_IGNORE_RULE_SUCCESS", "DLQ_DELETE_IGNORE_RULE_FAILURE"];
export interface TCommbotCommandArgs {
    DLQ_ALERT: {
        dlqMessage: TDlqMessage;
    };
    DLQ_CREATE_IGNORE_RULE_SUCCESS: {
        dlqRuleRawRecord: TDlqIgnoreRuleRawRecord;
    };
    DLQ_CREATE_IGNORE_RULE_FAILURE: {
        dlqRuleRawRecord: TDlqIgnoreRuleRawRecord;
        error: string;
    };
    DLQ_DELETE_IGNORE_RULE_SUCCESS: {
        id: string;
    };
    DLQ_DELETE_IGNORE_RULE_FAILURE: {
        id: string;
        error: string;
    };
}
export declare type TCommbotCommandTypes = typeof commbotCommands;
export declare type TCommbotCommandType = TCommbotCommandTypes[number];
export declare type TCommbotCommand<A extends {} = {}> = {
    internalCommand: true;
    command: TCommbotCommandType;
    args: A;
};
export declare const isCommbotCommand: (thing: any) => thing is TCommbotCommand<{}>;
export declare type TCommbotCommandProcessor<C extends TCommbotCommandType> = (c: TCommbotCommand<TCommbotCommandArgs[C]>, context: Pick<TSlackContext, 'client'>) => Promise<any>;
export declare type TCommbotCommandProcessors = {
    [c in TCommbotCommandType]: TCommbotCommandProcessor<c>;
};
//# sourceMappingURL=commbot-commands-types.d.ts.map