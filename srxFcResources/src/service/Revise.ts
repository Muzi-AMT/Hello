

import stat from "../util/state";
import Log4js from "../util/logs";
import {updtools} from "../dao/updataDao";
import {addtools} from "../dao/insertDao";
import {queryCondition} from "../dao/queryDao";
const Logger = Log4js.getLogger('error');
// 修改单表信息
export async function Modifysingleinformation(entity, retrieve, werretrieve){
    try {

        let srxfcupdcertificatelaborcontract = await updtools(entity, retrieve, werretrieve);
        if (srxfcupdcertificatelaborcontract.affected == 1) {
            // 修改成功 返回 1s
            return {state: stat.succeed}
        } else {
            // 修改失败 返回 2
            return {state: stat.defeated}
        }
    } catch (e) {
        Logger.error("----service  / Revise  /  Modifysingleinformation ---------",e);
        return {state: stat.defeated};
    }
}

//解除劳务合同职工信息
export async function modrescind(entity, retrieve,werretrieve){
    try {

        let cfmod = await queryCondition(entity,werretrieve);
        if(cfmod){
            return{state:stat.repetition}
        }else {
            let srxfcupdcertificatelaborcontract = await addtools(entity, retrieve);
            if (srxfcupdcertificatelaborcontract) {
                // 修改成功 返回 1s
                return {state: stat.succeed}
            } else {
                // 修改失败 返回 0
                return {state: stat.defeated}
            }
        }

    } catch (e) {
        Logger.error("----service  / Revise  /  modrescind ---------",e);
        return {state: stat.defeated};
    }
}