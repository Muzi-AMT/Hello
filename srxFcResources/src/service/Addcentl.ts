import stat from "../util/state";
import log4js from "../util/logs";
import {del} from "../dao/deleteDao";
import {socialsecurityexpense} from "../entity/socialsecurityexpense";
import {addtools} from "../dao/insertDao";
import {updtools} from "../dao/updataDao";
import {renewchangelaborcontract} from "../entity/renewchangelaborcontract";
import {queryCondition} from "../dao/queryDao";
const Logger = log4js.getLogger('error');

//添加劳务合同
export async function addData(entity,retrieve,werretrieve) {
    try {
        let cfmod = await queryCondition(entity,werretrieve);
        if(cfmod){
            return{state:stat.repetition}
        }else{
            const  addLabo=await addtools(entity,retrieve);

            if (addLabo){
                return {state:stat.succeed}
            }else {
                return {state:stat.defeated}
            }
        }
    } catch (e) {
        Logger.error("----service  /  Addcentl  /  addData ---------",e);
        return {state:stat.defeated}

    }
}

//修改劳务合同
export async function udpData(entity,retrieve,werretrieve) {
    try {
        const  addLabo=await updtools(entity,retrieve,werretrieve);

        if (addLabo.affected>0){
            return {state:stat.succeed}
        }else {
            return {state:stat.defeated}
        }
    } catch (e) {
        Logger.error("----service  /  Addcentl  /  udpData ---------",e);
        return {state:stat.defeated}
    }
}

// 根据身份证号修改续订变更合同
export async function updxdht(retrieve,werretrieve){
    try{
        let updxdht = await updtools(renewchangelaborcontract,retrieve,werretrieve)
        if(updxdht.affected>0){
            return {state: stat.succeed}
        }else{
            return {state: stat.defeated}
        }

    }catch (e) {
        Logger.error("----service  /  Addcentl  /  updxdht  ---------",e);
        return {state:stat.defeated}
    }
}
