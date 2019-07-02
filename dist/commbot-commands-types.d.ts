import { SNS } from 'aws-sdk';
import { WebClient } from '@slack/web-api';
import { DlqIgnoreRules } from './dlq-ignore-rules-types';
import { Dlq } from './dlq-types';
export declare namespace Commbot {
    type TSendCommandToCommbot = (command: TCommbotCommand['command'], args: TCommbotCommand['args']) => Promise<any>;
    type TBuildSendCommandToCommbot = (sns: SNS, commbotTopicArn: string) => TSendCommandToCommbot;
    type TSlackContext = {
        client: WebClient;
        channel: string;
        sender: string;
        botUser: string;
    };
    const commbotCommands: ["DLQ_ALERT", "DLQ_CREATE_IGNORE_RULE_SUCCESS", "DLQ_CREATE_IGNORE_RULE_FAILURE", "DLQ_DELETE_IGNORE_RULE_SUCCESS", "DLQ_DELETE_IGNORE_RULE_FAILURE", "DLQ_REQUEUE_MESSAGE_SUCCESS", "DLQ_REQUEUE_MESSAGE_FAILURE", "DLQ_DELETE_MESSAGE_SUCCESS", "DLQ_DELETE_MESSAGE_FAILURE"];
    interface TCommbotCommandArgs {
        DLQ_ALERT: {
            dlqMessage: Dlq.TDlqMessage;
        };
        DLQ_CREATE_IGNORE_RULE_SUCCESS: {
            dlqRuleRawRecord: DlqIgnoreRules.TDlqIgnoreRuleRawRecord;
            slackMessageTs: string;
        };
        DLQ_CREATE_IGNORE_RULE_FAILURE: {
            dlqRuleRawRecord: DlqIgnoreRules.TDlqIgnoreRuleRawRecord;
            error: string;
            slackMessageTs: string;
        };
        DLQ_DELETE_IGNORE_RULE_SUCCESS: {
            id: string;
            slackMessageTs: string;
        };
        DLQ_DELETE_IGNORE_RULE_FAILURE: {
            id: string;
            error: string;
            slackMessageTs: string;
        };
        DLQ_REQUEUE_MESSAGE_SUCCESS: {
            dlqMessageKey: Dlq.TDlqMessageKey;
            slackMessageTs: string;
        };
        DLQ_REQUEUE_MESSAGE_FAILURE: {
            dlqMessageKey: Dlq.TDlqMessageKey;
            error: string;
            slackMessageTs: string;
        };
        DLQ_DELETE_MESSAGE_SUCCESS: {
            dlqMessageKey: Dlq.TDlqMessageKey;
            slackMessageTs: string;
        };
        DLQ_DELETE_MESSAGE_FAILURE: {
            dlqMessageKey: Dlq.TDlqMessageKey;
            error: string;
            slackMessageTs: string;
        };
    }
    type TCommbotCommandTypes = typeof commbotCommands;
    type TCommbotCommandType = TCommbotCommandTypes[number];
    type TCommbotCommand<A extends {} = {}> = {
        internalCommand: true;
        command: TCommbotCommandType;
        args: A;
    };
    const isCommbotCommand: (thing: any) => thing is TCommbotCommand<{}>;
    type TCommbotCommandProcessor<C extends TCommbotCommandType> = (c: TCommbotCommand<TCommbotCommandArgs[C]>, context: Pick<Commbot.TSlackContext, 'client'>) => Promise<any>;
    type TCommbotCommandProcessors = {
        [c in TCommbotCommandType]: TCommbotCommandProcessor<c>;
    };
}
//# sourceMappingURL=commbot-commands-types.d.ts.map