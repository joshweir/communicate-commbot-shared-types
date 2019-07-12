import { Region } from './regions-and-envs';
export declare namespace Dlq {
    type TDlqMessage = {
        messageId: string;
        env: string;
        dlqName: string;
        sentTimestamp: number;
        region: Region;
        operationId?: string;
        payload: string;
    };
    const isDlqMessage: (thing: any) => thing is TDlqMessage;
    type TDlqMessageKey = Pick<TDlqMessage, 'region' | 'dlqName' | 'env' | 'messageId'>;
}
//# sourceMappingURL=dlq-types.d.ts.map