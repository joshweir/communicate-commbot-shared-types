"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interrogosaurusCommands = [
    'DLQ_CREATE_IGNORE_RULE',
    'DLQ_DELETE_IGNORE_RULE',
    'DLQ_DELETE_MESSAGE',
    'DLQ_REQUEUE_MESSAGE',
    'DLQ_BULK_REQUEUE',
    'DLQ_LIST',
];
exports.isInterrogosaurusCommand = (thing) => !!thing && exports.interrogosaurusCommands.indexOf(thing.command) !== -1;
//# sourceMappingURL=interrogosaurus-commands-types.js.map