import { SQSMessageAttribute } from "aws-lambda";
import { Region, regions } from "./regions-and-envs";

export namespace Dlq {
  export type SQSRecordAttributes = {
    ApproximateReceiveCount: string;
    SentTimestamp: string;
    SenderId: string;
    ApproximateFirstReceiveTimestamp: string;
    SequenceNumber?: string;
    MessageGroupId?: string;
    MessageDeduplicationId?: string;
  };

  export type TDlqMessage = {
    messageId: string;
    env: string;
    dlqName: string;
    sentTimestamp: number;
    region: Region;
    operationId?: string;
    payload: string;
    attributes?: SQSRecordAttributes;
    messageAttributes?: Record<string, SQSMessageAttribute>;
  };

  export const isSQSRecordAttributes = (thing: any): thing is SQSRecordAttributes =>
    typeof thing === 'object' &&
    typeof thing.ApproximateReceiveCount === 'string' &&
    typeof thing.SentTimestamp === 'string' &&
    typeof thing.SenderId === 'string' &&
    typeof thing.ApproximateFirstReceiveTimestamp === 'string';

  export const isDlqMessage = (thing: any): thing is TDlqMessage =>
    thing &&
    typeof thing.env === "string" &&
    typeof thing.dlqName === "string" &&
    typeof thing.messageId === "string" &&
    typeof thing.sentTimestamp === "number" &&
    typeof thing.region === "string" &&
    regions.indexOf(thing.region) > -1 &&
    ["string", "undefined"].indexOf(typeof thing.operationId) > -1 &&
    thing.payload &&
    (typeof thing.attributes === "undefined" || isSQSRecordAttributes(thing.attributes));

  export type TDlqMessageKey = Pick<
    TDlqMessage,
    "region" | "dlqName" | "env" | "messageId"
  >;
}
