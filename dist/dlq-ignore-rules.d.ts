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
    const parseMultiValueIgnoreRuleField: (input: string) => string;
    const parseDlqIgnoreRuleRawRecord: (input: string) => TDlqIgnoreRuleRawRecord | undefined;
    type TIgnoreRuleKey = Pick<TDlqIgnoreRuleRecord, 'id' | 'region' | 'env'>;
    const isTIgnoreRuleKey: (thing: any) => thing is Pick<TDlqIgnoreRuleRecord, "region" | "id" | "env">;
    const parseIgnoreRuleKey: (input: string) => Pick<TDlqIgnoreRuleRecord, "region" | "id" | "env"> | undefined;
}
export {};
//# sourceMappingURL=dlq-ignore-rules.d.ts.map