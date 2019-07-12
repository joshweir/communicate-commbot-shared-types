import { Region, regions } from './regions-and-envs';

export namespace Dlq {
  export type TDlqMessage = {
    messageId: string;
    processingEnvironmentId: string;
    dlqName: string;
    sentTimestamp: number;
    region: Region;
    operationId?: string;
    payload: string;
  };

  export const isDlqMessage = (thing: any): thing is TDlqMessage =>
    thing &&
    typeof thing.env === 'string' &&
    typeof thing.dlqName === 'string' &&
    typeof thing.messageId === 'string' &&
    typeof thing.sentTimestamp === 'number' &&
    typeof thing.region === 'string' &&
    regions.indexOf(thing.region) > -1 &&
    ['string', 'undefined'].indexOf(typeof thing.operationId) > -1 &&
    thing.payload;

  export type TDlqMessageKey = Pick<TDlqMessage, 
    'region' | 
    'dlqName' | 
    'processingEnvironmentId' | 
    'messageId'
  >;
};
