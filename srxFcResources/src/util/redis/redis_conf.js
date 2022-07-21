"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conf = void 0;
exports.conf = {
    host: '127.0.0.1',
    port: 6379,
    max_clients: 30,
    perform_checks: false,
    database: 0,
    options: {
        auth_pass: '123456' ///在redis安装目录下 进行 设置 requirepass  123456
    }
};
//# sourceMappingURL=redis_conf.js.map