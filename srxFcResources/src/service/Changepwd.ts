import {updtools} from "../dao/updataDao";
import stat from "../util/state";
import log4js from "../util/logs";
const Logger = log4js.getLogger('error');

//客户端企业修改登录密码
export async function chegpwd(entity, retrieve, werretrieve) {
    try {
        let updpwd = await updtools(entity,retrieve,werretrieve);
        if (updpwd.affected == 1) {
            //返回1  修改成功
            return {state: stat.succeed}
        } else {
            //返回0  修改失败
            return {state: stat.defeated}
        }
    } catch (e) {
        Logger.error("----service  / Amendlaborcontract  /  chegpwd ---------",e);
        return {state: stat.defeated}
    }

}