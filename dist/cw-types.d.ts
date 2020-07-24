import { Region } from "./regions-and-envs";
export declare namespace Cw {
    type TCWAlert = {
        requestId: string;
        env: string;
        region: Region;
        alarmTimestamp: number;
        functionName: string;
        metricName: string;
        reason: string;
    };
    const isCWAlert: (thing: any) => thing is TCWAlert;
    type TCWAlertKey = Pick<TCWAlert, "region" | "functionName" | "env" | "requestId">;
}
//# sourceMappingURL=cw-types.d.ts.map