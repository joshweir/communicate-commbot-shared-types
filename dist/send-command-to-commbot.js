"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSendCommandToCommbot = void 0;
const client_sns_1 = require("@aws-sdk/client-sns");
exports.buildSendCommandToCommbot = (sns, commbotTopicArn, localProcessingEnv) => async (command, args) => {
    const c = {
        command,
        args,
        localProcessingEnv,
        internalCommand: true,
    };
    await sns.send(new client_sns_1.PublishCommand({
        TopicArn: commbotTopicArn,
        Message: JSON.stringify(c),
    }));
};
//# sourceMappingURL=send-command-to-commbot.js.map