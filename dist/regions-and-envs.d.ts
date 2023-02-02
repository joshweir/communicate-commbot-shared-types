export declare const regions: readonly ["aus", "nova", "lon", "local"];
export declare const regionsUpper: readonly ["AUS", "NOVA", "LON", "LOCAL"];
export declare type Region = typeof regions[number];
export declare type RegionUpper = typeof regionsUpper[number];
export declare type RegionIncAll = Region | "all";
export declare type RegionUpperIncAll = RegionUpper | 'ALL';
export declare const appEnvironments: readonly ["dev", "staging", "qa", "live", "local", "unittest"];
export declare type AppEnv = typeof appEnvironments[number];
export declare const dataEnvironments: readonly ["com-datastaging", "com-datalive", "local", "unittest"];
export declare type DataEnv = typeof dataEnvironments[number];
export declare type DataEnvIncAll = DataEnv | "all";
export declare const mapDataEnvsFromAllEnvs: (envs: string[]) => ("local" | "unittest" | "com-datastaging" | "com-datalive")[];
//# sourceMappingURL=regions-and-envs.d.ts.map