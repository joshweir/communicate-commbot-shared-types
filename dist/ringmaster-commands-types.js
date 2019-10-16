"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ringmasterCommands = [
    'DLQ_CREATE_IGNORE_RULE',
    'DLQ_DELETE_IGNORE_RULE',
    'DLQ_DELETE_MESSAGE',
    'DLQ_REQUEUE_MESSAGE',
    'DLQ_BULK_REQUEUE',
    'DLQ_LIST_IGNORE_RULES',
    'DLQ_RESUME',
    'DLQ_PAUSE',
    'DLQ_COUNT',
    'DLQ_HEAD',
    'DLQ_TAIL',
    'DLQ_PICK',
    'DLQ_CREATE_TRASH_RULE',
    'DLQ_DELETE_TRASH_RULE',
    'DLQ_LIST_TRASH_RULES',
    'DLQ_STATUS',
    'QDB_PAUSE',
    'QDB_RESUME',
    'QDB_RESTART',
    'QDB_WARM_TO_HOT',
    'DATAMOD',
];
exports.isRingmasterCommand = (thing) => !!thing && exports.ringmasterCommands.indexOf(thing.command) !== -1;
//# sourceMappingURL=ringmaster-commands-types.js.map