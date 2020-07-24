"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSendCommandToCommbot = void 0;
exports.buildSendCommandToCommbot = (sns, commbotTopicArn, localProcessingEnv) => async (command, args) => {
    const c = {
        command,
        args,
        localProcessingEnv,
        internalCommand: true,
    };
    await sns
        .publish({
        TopicArn: commbotTopicArn,
        Message: JSON.stringify(c),
    })
        .promise();
};
//# sourceMappingURL=send-command-to-commbot.js.map