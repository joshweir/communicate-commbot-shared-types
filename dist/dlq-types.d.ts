import { Region } from './regions-and-envs';
export declare namespace Dlq {
    type TDlqDynamoMessage = {
        sentTimestamp: number;
        envAndDlqName: string;
        region: Region;
        operationId?: string;
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