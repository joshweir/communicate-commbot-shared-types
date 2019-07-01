export declare namespace Dlq {
    type TRegion = 'AUS' | 'NOVA';
    type TDlqDynamoMessage = {
        sentTimestamp: number;
        envAndDlqName: string;
        region: TRegion;
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
    type TDlqMessageKey = Pick<TDlqMessage, 'region' | 'dlqName' | 'processingEnvironmentId' | 'messageId'>;
}
//# sourceMappingURL=dlq-types.d.ts.map
