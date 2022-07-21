//登录

import {dl, queryCondition} from "../dao/queryDao";
import {loginmessage} from "../entity/loginmessage";
import stat from "../util/state";
import log4js from "../util/logs";
const Logger = log4js.getLogger('error');

// 客户端中代理界面 登录 （登录名称 登录密码）
export async function employLogin(retrieve) {

    try {
        // 查询有无此用户
        const seluser = await queryCondition(loginmessage,retrieve);
        // 查询状态码

        const seluserr = await dl(loginmessage,retrieve);
        if (seluser) {
            // 如果登录状态为1 可以登录 返回1
            // @ts-ignore
            if (seluserr.loginMessageLoggingStatus == 1) {
                return {state: stat.succeed}
            } else {
                // 登录状态不为1 不可以登录 返回3
                return {state: stat.jurisdiction}
            }

        } else {
            // 此用户不存在 返回0 先去注册
            return {state: stat.defeated}
        }
    } catch (e) {
        Logger.error("----service  / Login  /  employLogin ---------",e);
        return {state: stat.defeated};
    }

}