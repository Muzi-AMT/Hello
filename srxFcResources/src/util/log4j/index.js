"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const log4js = require("log4js");
//日志配置为异常记录到指定文件
log4js.configure({
    appenders: {
        ruleConsole: { type: 'console' },
        ruleFile: {
            type: 'dateFile',
            filename: 'logs/system_log',
            pattern: 'yyyy-MM-dd.log',
            maxLogSize: 10 * 1000 * 1000,
            numBackups: 3,
            alwaysIncludePattern: true
        }
    },
    categories: {
        default: { appenders: ['ruleConsole', 'ruleFile'], level: 'info' }
    }
});
exports.log = log4js.getLogger('log_file');
//# sourceMappingURL=index.js.map