import { RegionIncAll } from './regions-and-envs';
declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export declare namespace DlqIgnoreRules {
    type TDlqIgnoreRule = string;
    type TDlqIgnoreRules = TDlqIgnoreRule[];
    const isTDlqIgnoreRules: (thing: any) => thing is string[];
    type TDlqIgnoreRuleRecord = {
        id: string;
        env: string;
        region: RegionIncAll;
        dlqName: string;
        description: string;
        ignoreRules: TDlqIgnoreRules;
    };
    const isTDlqIgnoreRuleRecord: (thing: any) => thing is TDlqIgnoreRuleRecord;
    type TDlqIgnoreRuleRegExpRecord = Omit<TDlqIgnoreRuleRecord, 'ignoreRules'> & {
        ignoreRules: RegExp[];
    };
    type TDlqIgnoreRuleRawRecord = Omit<TDlqIgnoreRuleRecord, 'ignoreRules'> & {
        ignoreRules: string;
    };
    const isTDlqIgnoreRuleRawRecord: (thing: any) => thing is TDlqIgnoreRuleRawRecord;
}
export {};
//# sourceMappingURL=dlq-ignore-rules-types.d.ts.map