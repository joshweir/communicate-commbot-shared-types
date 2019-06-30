export namespace Dlq {
  export type TDlqDynamoMessage = {
    sentTimestamp: number;
    envAndDlqName: string;
    operationId: string;
    messageId: string;
    ignoreRuleIds?: string[];
    payload: string;
  };

  export const isDlqDynamoMessage = (thing: any): thing is TDlqDynamoMessage =>
    thing &&
    thing.envAndDlqName &&
    typeof thing.envAndDlqName === 'string' &&
    thing.envAndDlqName.split('|').length === 2 &&
    thing.sentTimestamp &&
    typeof thing.sentTimestamp === 'number' &&
    thing.operationId &&
    typeof thing.operationId === 'string' &&
    thing.messageId &&
    typeof thing.messageId === 'string' &&
    (typeof thing.ignoreRuleIds === 'undefined' || thing.ignoreRuleIds instanceof Array) &&
    thing.payload;

  export type TDlqMessage = TDlqDynamoMessage & {
    processingEnvironmentId: string;
    dlqName: string;
  };
};
