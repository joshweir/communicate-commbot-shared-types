import { RegionIncAll, DataEnvIncAll } from './regions-and-envs';
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
    const parseDlqIgnoreRuleRawRecord: (input: string) => TDlqIgnoreRuleRawRecord | undefined;
    type TIgnoreRuleKey = {
        id: string;
        region: RegionIncAll;
        dataEnv: DataEnvIncAll;
    };
    const isTIgnoreRuleKey: (thing: any) => thing is TIgnoreRuleKey;
    const parseIgnoreRuleKey: (input: string) => TIgnoreRuleKey | undefined;
}
export {};
//# sourceMappingURL=dlq-ignore-rules.d.ts.map