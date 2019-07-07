import { RegionIncAll } from './regions-and-envs';
import { v4 } from 'uuid';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export namespace DlqIgnoreRules {
  export type TDlqIgnoreRule = string;

  export type TDlqIgnoreRules = TDlqIgnoreRule[];

  export const isTDlqIgnoreRules = (thing: any): thing is TDlqIgnoreRules =>
    thing instanceof Array && [...new Set(thing.map((t) => typeof t))] === ['string'];

  export type TDlqIgnoreRuleRecord = {
    id: string;
    env: string;
    region: RegionIncAll;
    dlqName: string;
    description: string;
    ignoreRules: TDlqIgnoreRules;
  };

  export const isTDlqIgnoreRuleRecord = (thing: any): thing is TDlqIgnoreRuleRecord =>
    typeof thing === 'object' &&
    typeof thing.id === 'string' &&
    typeof thing.env === 'string' &&
    typeof thing.region === 'string' &&
    ['aus', 'nova', 'all'].indexOf(thing.region) > -1 &&
    typeof thing.dlqName === 'string' &&
    typeof thing.description === 'string' &&
    isTDlqIgnoreRules(thing.ignoreRules);

  export type TDlqIgnoreRuleRegExpRecord = Omit<TDlqIgnoreRuleRecord, 'ignoreRules'> & {
    ignoreRules: RegExp[];
  };

  export type TDlqIgnoreRuleRawRecord = Omit<TDlqIgnoreRuleRecord, 'ignoreRules'> & {
    ignoreRules: string;
  };

  export const isTDlqIgnoreRuleRawRecord = (thing: any): thing is TDlqIgnoreRuleRawRecord =>
    typeof thing === 'object' &&
    typeof thing.id === 'string' &&
    typeof thing.env === 'string' &&
    typeof thing.region === 'string' &&
    ['AUS', 'NOVA', 'ALL'].indexOf(thing.region) > -1 &&
    typeof thing.dlqName === 'string' &&
    typeof thing.description === 'string' &&
    typeof thing.ignoreRules === 'string';
  
  export const parseMultiValueIgnoreRuleField = (input: string): string => {
    let result: string = input;
    if (typeof result === 'string') {
      if (['ALL',''].indexOf(result.toLocaleUpperCase()) === -1) {
        result = result.split(',').join(',');
      }
      result = result.toLocaleUpperCase();
    }

    return result;
  }

  export const parseDlqIgnoreRuleRawRecord = (input: string): TDlqIgnoreRuleRawRecord | undefined => {
    try {
      const record = JSON.parse(input);
      if (record) {
        if (typeof record.id !== 'string' || !record.id.length) {
          record.id = v4();
        }
        record.env = parseMultiValueIgnoreRuleField(record.env);
        record.region = parseMultiValueIgnoreRuleField(record.region);
        record.dlqName = parseMultiValueIgnoreRuleField(record.dlqName);

        if (isTDlqIgnoreRuleRawRecord(record)) {
          return record;
        }
      }
    } catch(e) {}

    return;
  };

  export type TIgnoreRuleKey = Pick<TDlqIgnoreRuleRecord, 'id' | 'region' | 'env'>;
  
  export const isTIgnoreRuleKey = (thing: any): thing is TIgnoreRuleKey => 
    typeof thing === 'object' &&
    typeof thing.id === 'string' &&
    typeof thing.region === 'string' &&
    ['AUS', 'NOVA', 'ALL'].indexOf(thing.region) > -1 &&
    typeof thing.env === 'string';
  
  export const parseIgnoreRuleKey = (input: string): TIgnoreRuleKey | undefined => {
    try {
      const record = JSON.parse(input);
      if (record) {
        record.env = parseMultiValueIgnoreRuleField(record.env);
        record.region = parseMultiValueIgnoreRuleField(record.region);
      }

      if (isTIgnoreRuleKey(record)) {
        return record;
      }
    } catch(e) {}
  
    return;
  };  
};
