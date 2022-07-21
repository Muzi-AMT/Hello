// 续订合同
import {queryCondition,Multinpsearch} from "../dao/queryDao";
import {addtools} from "../dao/insertDao";
import stat from "../util/state";
import {renewchangelaborcontract} from "../entity/renewchangelaborcontract";
import log4js from "../util/logs";
const Logger = log4js.getLogger('error');

//添加续订合同
export async function addxdht(retrieve,werretrieve){

    try{
        // 查询续订变更劳动合同
        let selxdht = await Multinpsearch(renewchangelaborcontract,werretrieve);
        if(selxdht.length>0){
            // 重复
            return {state: stat.repetition}
        }else{
            let addxdht = await addtools(renewchangelaborcontract,retrieve);
            if(addxdht){
                return {state: stat.succeed}
            }else{
                return {state: stat.defeated}
            }
        }
    }catch (e){
        Logger.error("----service  /  Addcentl  /  addxdht ---------",e);
        return {state: stat.defeated}
    }

}

// 根据身份证号查询续订变更劳动合同
export async function selxdht(werretrieve,pageSize){

    try{
        // 查询续订变更劳动合同
        let selxdht = await Multinpsearch(renewchangelaborcontract,werretrieve);
        //总页数
        const pageCount = Math.ceil(selxdht.length / pageSize);
        //总数据
        const Total = selxdht.length;
        if(selxdht.length>0){
            return {state: stat.succeed,data:selxdht,page:pageCount,Total:Total};
        }else{
            return {state: stat.defeated};
        }
    }catch (e){
        Logger.error("----service  /  addcon  /  selxdht ---------",e);
        return {state: stat.defeated}
    }

}
