import * as log4js from 'log4js';

const config = {
    appenders: {
        console: {
            type: 'console'
        },
        info: {
            type: 'dateFile',
            filename: 'logs/info.log',
            pattern: '-yyyy-MM-dd',
            IfLastModified:14,
        },
        //错误日志 type:过滤类型logLevelFilter,将过滤error日志写进指定文件
        error: {
            type: 'dateFile',
            filename: 'logs/error.log',
            pattern: '-yyyy-MM-dd'
        },
        // error: {
        //     type: "logLevelFilter",
        //     level: "error",
        //     appender: 'errorLog'
        // }
    },
    categories: {
        default: { appenders: ['console'], level: 'all' },
        info: {appenders: ['info'], level: 'info'},
        error: {appenders: ["error"], level: "error"}
    }
}



log4js.configure(config);
export default log4js;