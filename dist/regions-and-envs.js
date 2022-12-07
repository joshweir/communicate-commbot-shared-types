"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regions = ["aus", "nova", "uk", "local"];
exports.appEnvironments = ["dev", "staging", "qa", "live", "local"];
exports.dataEnvironments = ["com-datastaging", "com-datalive", "local"];
const liveDataEnvProcessingEnvs = ["qa", "live", "com-datalive"];
exports.mapDataEnvsFromAllEnvs = (envs) => {
    const envsLowerCase = envs.map((s) => s.toLocaleLowerCase());
    if (envsLowerCase.indexOf("all") > -1) {
        return ["com-datastaging", "com-datalive"];
    }
    const dataEnvs = [];
    if (envsLowerCase.find((env) => {
        return liveDataEnvProcessingEnvs.find((p) => p === env);
    })) {
        dataEnvs.push("com-datalive");
    }
    if (envsLowerCase.find((env) => {
        return !liveDataEnvProcessingEnvs.find((p) => p === env);
    })) {
        dataEnvs.push("com-datastaging");
    }
    return dataEnvs;
};
//# sourceMappingURL=regions-and-envs.js.map