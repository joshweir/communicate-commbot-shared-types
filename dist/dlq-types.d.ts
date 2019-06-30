export declare type TDlqDynamoMessage = {
    sentTimestamp: number;
    envAndDlqName: string;
    operationId: string;
    messageId: string;
    ignoreRuleIds?: string[];
    payload: string;
};
export declare const isDlqDynamoMessage: (thing: any) => thing is TDlqDynamoMessage;
export declare type TDlqMessage = TDlqDynamoMessage & {
    processingEnvironmentId: string;
    dlqName: string;
};
//# sourceMappingURL=dlq-types.d.ts.map