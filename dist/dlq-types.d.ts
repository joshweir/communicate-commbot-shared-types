export declare namespace Dlq {
    type TDlqDynamoMessage = {
        sentTimestamp: number;
        envAndDlqName: string;
        operationId: string;
        messageId: string;
        ignoreRuleIds?: string[];
        payload: string;
    };
    const isDlqDynamoMessage: (thing: any) => thing is TDlqDynamoMessage;
    type TDlqMessage = TDlqDynamoMessage & {
        processingEnvironmentId: string;
        dlqName: string;
    };
}
//# sourceMappingURL=dlq-types.d.ts.map