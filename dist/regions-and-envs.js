"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regions = ["aus", "nova", "lon", "local"];
exports.regionsUpper = ["AUS", "NOVA", "LON", "LOCAL"];
exports.appEnvironments = ["dev", "staging", "qa", "live", "local", "unittest"];
exports.dataEnvironments = ["com-datadev", "com-datastaging", "com-datalive", "local", "unittest"];
const liveDataEnvProcessingEnvs = ["qa", "live", "com-datalive"];
const devDataEnvProcessingEnvs = ["dev", "com-datadev"];
exports.mapDataEnvsFromAllEnvs = (envs) => {
    const envsLowerCase = envs.map((s) => s.toLocaleLowerCase());
    if (envsLowerCase.indexOf("all") > -1) {
        return ["com-datadev", "com-datastaging", "com-datalive"];
    }
    const dataEnvs = [];
    if (envsLowerCase.find((env) => {
        return liveDataEnvProcessingEnvs.find((p) => p === env);
    })) {
        dataEnvs.push("com-datalive");
    }
    if (envsLowerCase.find((env) => {
        return devDataEnvProcessingEnvs.find((p) => p === env);
    })) {
        dataEnvs.push("com-datadev");
    }
    if (envsLowerCase.find((env) => {
        return !liveDataEnvProcessingEnvs.find((p) => p === env) && !devDataEnvProcessingEnvs.find((p) => p === env);
    })) {
        dataEnvs.push("com-datastaging");
    }
    return dataEnvs;
};
//# sourceMappingURL=regions-and-envs.js.map