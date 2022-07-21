import stat from "../util/state";
import log4js from "../util/logs";
import {addtools} from "../dao/insertDao";
import {administrator} from "../entity/administrator";
import {queryCondition} from "../dao/queryDao";
const Logger = log4js.getLogger('error');
// 客户端添加
export async function qhjh(retrieve,werretrieve){

    let sel = await queryCondition(administrator,werretrieve);
    if(sel){
        return {state: stat.repetition};
    }else{
        try {
            //使用封装好的SQL语句对数据库进行操作，并拿到数据库的数据
            let add = await addtools(administrator, retrieve);
            //如果添加成功就给前端返回一个状态值
            if (add) {
                return {state: stat.succeed};
            } else {
                return {state: stat.defeated};
            }
        } catch (e) {
            //使用封装好的错误，以防报错
            Logger.error("----service  / Amendlaborcontract  /  qhjh ---------"+e);
            return {state: stat.defeated};
        }
    }

}