// 客户端修改

import stat from "../util/state";
import log4js from "../util/logs";
import {updtools} from "../dao/updataDao";
import {superadministrator} from "../entity/superadministrator";
import {administrator} from "../entity/administrator";
const Logger = log4js.getLogger('error');

//个人中心 根据邮箱，修改密码
export async function srxfcchangepasswordq(retrieve,werretrieve){
    try {
        let srxfcchangepassword = await updtools(superadministrator, retrieve, werretrieve);
        if (srxfcchangepassword.affected == 1) {
            // 修改成功 返回 1s
            return {state: stat.succeed};
        } else {
            // 修改失败 返回 2
            return {state: stat.defeated};
        }
    }catch (e) {
        Logger.error("----service  / Clientupd  /  srxfcchangepasswordq ---------",e);
        return {state: stat.defeated};
    }
}
//修改管理员
export async function srxfcsuperadmin(werretrieve,retrieve){
    try {
        //对数据库进行操作，结果用一个变量接收，第一个参数写表名，第二个参数是修改前，第三个参数是修改后
        let srxfcsuperadministratork = await updtools(administrator, retrieve, werretrieve)
        //判断如果这个变量有值那么就是有东西，也就是删除成功，affected是受影响的行数>0的话就是成功
        if (srxfcsuperadministratork.affected > 0) {
            //给前端返回一个状态值，这个状态值来自于封装好的状态值
            return{state: stat.succeed};
        } else {
            return {state: stat.defeated};
        }
    } catch (e) {
        //如果报错的话就catch捕捉到，方便定位报错
        Logger.error("----service  / Clientupd  /  srxfcsuperadmin ---------" + e)
        return {state: stat.defeated};
    }
}