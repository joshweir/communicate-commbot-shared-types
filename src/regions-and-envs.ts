export const regions = ['aus', 'nova'] as ['aus', 'nova'];
export type Region = (typeof regions)[number];
export type RegionIncAll = Region | 'all';
export const appEnvironments = ['dev', 'staging', 'qa', 'beta', 'live'] as ['dev', 'staging', 'qa', 'beta', 'live'];
export type AppEnv = (typeof appEnvironments)[number];
export const dataEnvironments = ['com-datastaging', 'com-datalive'] as ['com-datastaging', 'com-datalive'];
export type DataEnv = (typeof dataEnvironments)[number];
