import { SQSMessageAttribute } from "aws-lambda";
import { Region } from "./regions-and-envs";
export declare namespace Dlq {
    type SQSRecordAttributes = {
        ApproximateReceiveCount: string;
        SentTimestamp: string;
        SenderId: string;
        ApproximateFirstReceiveTimestamp: string;
        SequenceNumber?: string;
        MessageGroupId?: string;
        MessageDeduplicationId?: string;
    };
    type TDlqMessage = {
        messageId: string;
        env: string;
        dlqName: string;
        sentTimestamp: number;
        region: Region;
        operationId?: string;
        payload: string;
        attributes?: SQSRecordAttributes;
        messageAttributes?: Record<string, SQSMessageAttribute>;
        awsAccountNumber?: number;
    };
    const isSQSRecordAttributes: (thing: any) => thing is SQSRecordAttributes;
    const isDlqMessage: (thing: any) => thing is TDlqMessage;
    type TDlqMessageKey = Pick<TDlqMessage, "region" | "dlqName" | "env" | "messageId">;
}
//# sourceMappingURL=dlq-types.d.ts.map