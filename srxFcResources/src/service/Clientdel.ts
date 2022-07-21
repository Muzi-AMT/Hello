// 客户端删除

import stat from "../util/state";
import log4js from "../util/logs";
import {del} from "../dao/deleteDao";
import {administrator} from "../entity/administrator";
const Logger = log4js.getLogger('error');

// 删除管理员
export async function srxfcdeldamink(werretrieve){
    try {
        //使用封装好的SQL语句对数据库进行操作，并拿到数据库的数据
        let dele = await del(administrator, werretrieve);
        //如果删除成功就给前端返回一个状态值
        if (dele.affected > 0) {
            return {state: stat.succeed};
        } else {
            return {state: stat.defeated};
        }
    } catch (e) {
        //使用封装好的错误，以防报错
        Logger.error("----service  / Amendlaborcontract  /  srxfcdeldamink ---------"+e);

        return {state: stat.defeated};
    }
}