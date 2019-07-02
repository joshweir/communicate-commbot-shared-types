import { RegionIncAll } from './regions-and-envs';

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
    ['aus', 'nova', 'all'].indexOf(thing.region) > -1 &&
    typeof thing.dlqName === 'string' &&
    typeof thing.description === 'string' &&
    typeof thing.ignoreRules === 'string';
};
