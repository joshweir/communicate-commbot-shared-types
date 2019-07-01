export namespace Dlq {
  export type TRegion = 'AUS' | 'NOVA';

  export type TDlqDynamoMessage = {
    sentTimestamp: number;
    envAndDlqName: string;
    region: TRegion;
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
    typeof thing.sentTimestamp === 'number' &&
    typeof thing.region === 'string' &&
    ['AUS', 'NOVA'].indexOf(thing.region) > -1 &&
    typeof thing.operationId === 'string' &&
    typeof thing.messageId === 'string' &&
    (typeof thing.ignoreRuleIds === 'undefined' || thing.ignoreRuleIds instanceof Array) &&
    thing.payload;

  export type TDlqMessage = TDlqDynamoMessage & {
    processingEnvironmentId: string;
    dlqName: string;
  };

  export type TDlqMessageKey = Pick<TDlqMessage, 
    'region' | 
    'dlqName' | 
    'processingEnvironmentId' | 
    'messageId'
  >;
};
