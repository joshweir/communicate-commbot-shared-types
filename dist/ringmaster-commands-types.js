"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ringmasterCommands = [
    'DLQ_CREATE_IGNORE_RULE',
    'DLQ_DELETE_IGNORE_RULE',
    'DLQ_DELETE_MESSAGE',
    'DLQ_REQUEUE_MESSAGE',
    'DLQ_BULK_REQUEUE',
    'DLQ_LIST',
    'DLQ_LIST_IGNORE_RULES',
    'DLQ_RESUME',
    'DLQ_PAUSE',
];
exports.isRingmasterCommand = (thing) => !!thing && exports.ringmasterCommands.indexOf(thing.command) !== -1;
//# sourceMappingURL=ringmaster-commands-types.js.map