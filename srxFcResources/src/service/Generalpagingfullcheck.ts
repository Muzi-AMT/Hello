//通用分页

import {getConnection} from "typeorm";
import {
    AllEnquiries,
    Singlesearch,
    Pagination,
    zccxmh,
    Multinpsearch,
    mhcxmh,
    mhcxmhfy,
    mhcxmhzsjl,
    mhcxmhzsjll,
    mhcxmhfyy, Multisearch,Singlesearchh
} from "../dao/queryDao";
import stat from "../util/state";
import log4js from "../util/logs";
const Logger = log4js.getLogger('error');
import {approvalform} from "../entity/approvalform";
import {queryCondition} from "../dao/queryDao"
import { employeeregistrationform } from "../entity/employeeregistrationform";
import { familymember } from "../entity/familymember";
import { housingprovidentfund } from "../entity/housingprovidentfund";
import {medicalinsurance} from "../entity/medicalinsurance";
import {oldageinsurance} from "../entity/oldageinsurance";
import {unemploymentinsurance} from "../entity/unemploymentinsurance";
import {query} from "../dao/stopped";

//分页全查
export async function fullcheck(entity,pageSize,pageIndex) {

    try { //查询所有数据
        const data = await AllEnquiries(entity);
        //总页数
        const pageCount = Math.ceil(data.length / pageSize);
        //总数据
        const Total = data.length;


        //分页查询
        const ionform = await Pagination(entity, pageIndex, pageSize);
        if (ionform.length > 0) {
            return {state: stat.succeed, data: ionform, page: pageCount, total: Total, date: data}
            //返回状态值1  查询成功  data分页数据   page 总页数  total总数据量   date 全部数据[Excel下载使用：下载全部数据]
        } else {
            //返回状态值0  查询失败
            return {state: stat.defeated}
        }
    } catch (e) {
        Logger.error("----service  / Generalpagingfullcheck  /  fullcheck ---------",e)
        return {state: stat.defeated}
    }
}



//分页全查审核表专用  srxfcreportquery
export async function fullcheckee(entity,retrieve,pageSize,pageIndex) {


    try { //查询所有数据

        const data = await Multinpsearch(entity,retrieve);

        if(data){
            //总页数
            const pageCount = Math.ceil(data.length / pageSize);

            //总数据
            const Total = data.length;

            //分页查询
            const ionform = await Multisearch(entity, pageIndex, pageSize,retrieve);

            if (ionform.length > 0) {

                return {state: stat.succeed, data: ionform, page: pageCount, total: Total, date: data}
                //返回状态值1  查询成功  data分页数据   page 总页数  total总数据量   date 全部数据[Excel下载使用：下载全部数据]
            } else {
                //返回状态值0  查询失败
                return {state: stat.defeated}
            }
        }else {
            return {state: stat.defeated}
        }

    } catch (e) {
        Logger.error("----service  / Generalpagingfullcheck  /  fullcheck ---------",e);
        return {state: stat.defeated}

    }
}

//分页全查带条件
export async function werfullcheck(entity,pageSize,pageIndex,parameter) {

    try { //查询所有数据
        const data = await AllEnquiries(entity);
        //总页数
        const pageCount = Math.ceil(data.length / pageSize);
        //总数据
        const Total = data.length;
        //分页查询
        const ionform = await Singlesearch(entity, pageIndex, pageSize, parameter);
        if (ionform.length > 0) {
            return {state: stat.succeed, data: ionform, page: pageCount, total: Total, date: data}
            //返回状态值1  查询成功  data分页数据   page 总页数  total总数据量   date 全部数据[Excel下载使用：下载全部数据]
        } else {
            //返回状态值0  查询失败
            return {state: stat.defeated}
        }
    } catch (e) {
        Logger.error("----service  / Generalpagingfullcheck  /  werfullcheck ---------",e);
        return {state: stat.defeated}
    }
}

//分页模糊查询
export async  function fuzzy(entity,pageSize,pageIndex,retrieve) {
    try {
        //查询所有数据
        const data = await AllEnquiries(entity);
        //总页数
        const pageCount = Math.ceil(data.length / pageSize);
        //总数据
        const Total = data.length;

        let srxfcmuselterminationinformation = await zccxmh(entity, pageIndex, pageSize, retrieve);
        if (srxfcmuselterminationinformation.length > 0) {
            return {
                state: stat.succeed,
                data: srxfcmuselterminationinformation,
                page: pageCount,
                total: Total,
                date: data
            }
            //返回状态值1  查询成功
        } else {
            return {state: stat.defeated} //返回状态值0  查询失败
        }
    } catch (e) {
        Logger.error("----service  / Generalpagingfullcheck  /  fuzzy ---------", e);
        return {state: stat.defeated}
    }
}



// 带条件查询
export async function querycondition(entity,werretrieve){
    try {
        let srxfcselniemp = await Multinpsearch(entity, werretrieve);
        if (srxfcselniemp) {
            // 查询成功 返回1
            return {state: stat.succeed,data: srxfcselniemp}
        } else {
            // 查询失败 返回0
            return {state: stat.defeated}
        }
    } catch (e) {
        Logger.error("----service  / Generalpagingfullcheck  /  querycondition ---------", e);
        return {state: stat.defeated}
    }
}

// 单个条件查询
export async function singlequery(retrieve){
    try {
        //查询所有数据
        const data = await getConnection()
            .getRepository(approvalform)
            .createQueryBuilder()
            .where({approvalformTradeName:retrieve})
            .getMany();
        if (data) {
            return {state: stat.succeed, data:data}
            //返回状态值1  查询成功 date 全部数据
        } else {
            return {state: stat.defeated}//返回状态值0  查询失败
        }

    } catch (e) {
        Logger.error("----service  / Generalpagingfullcheck  /  singlequery ---------",e)
        return {state: stat.defeated}
    }
}


// 查询单挑数据
export async function queryOnetion(entity,werretrieve){
    try {
        let srxfcselniemp = await queryCondition(entity, werretrieve);
        if (srxfcselniemp) {
            // 查询成功 返回1
            return {state: stat.succeed,data: srxfcselniemp}
        } else {
            // 查询失败 返回0
            return {state: stat.defeated}
        }
    } catch (e) {
        Logger.error("----service  / Generalpagingfullcheck  /  queryOnetion ---------", e);
        return {state: stat.defeated}
    }
}



//分页全查带条件  总数据量也带条件
export async function werfullpage(entity,pageSize,pageIndex,parameter) {

    try { //查询所有数据
        const data = await Multinpsearch(entity, parameter);
        //总页数ff
        const pageCount = Math.ceil(data.length / pageSize);
        //总数据
        const Total = data.length;


        //分页查询
        const ionform = await Singlesearch(entity, pageIndex, pageSize, parameter);

        if (ionform.length > 0) {
            return {state: stat.succeed, data: ionform, page: pageCount, total: Total, date: data}
            //返回状态值1  查询成功  data分页数据   page 总页数  total总数据量   date 全部数据[Excel下载使用：下载全部数据]
        } else {
            //返回状态值0  查询失败
            return {state: stat.defeated}
        }
    } catch (e) {
        Logger.error("----service  / Generalpagingfullcheck  /  werfullpage ---------",e)
        return {state: stat.defeated}
    }


}
export async function werfullpagee(entity,pageSize,pageIndex,parameter) {

    try { //查询所有数据
        const data = await Multinpsearch(entity, parameter);
        //总页数ff
        const pageCount = Math.ceil(data.length / pageSize);
        //总数据
        const Total = data.length;


        //分页查询
        const ionform = await Singlesearchh(entity, pageIndex, pageSize, parameter);
        console.log(ionform,"==-=-=-=-=-=-=-=-=ionform");
        if (ionform.length > 0) {
            return {state: stat.succeed, data: ionform, page: pageCount, total: Total, date: data}
            //返回状态值1  查询成功  data分页数据   page 总页数  total总数据量   date 全部数据[Excel下载使用：下载全部数据]
        } else {
            //返回状态值0  查询失败
            return {state: stat.defeated}
        }
    } catch (e) {
        Logger.error("----service  / Generalpagingfullcheck  /  werfullpage ---------",e)
        return {state: stat.defeated}
    }


}

//查询职工登记
export async function selemployee(werretrieve){
    try {
        let emp = await queryCondition(employeeregistrationform, werretrieve)
        let fam = await queryCondition(familymember, werretrieve)
        let hou = await queryCondition(housingprovidentfund, werretrieve)
        let med = await queryCondition(medicalinsurance, werretrieve)
        let old = await queryCondition(oldageinsurance, werretrieve)
        let une = await queryCondition(unemploymentinsurance, werretrieve)
        let a = {emp, fam, hou, med, old, une}
        if (emp || fam || hou || med || old || une) {
            return {state: stat.succeed, data: a}
        } else {
            return {state: stat.defeated}
        }
    } catch (e) {
        Logger.error("----service  / Generalpagingfullcheck  /  selemployee ---------",e)
        return {state: stat.defeated}
    }
}

//模糊分页  总数据量也带条件
export async function wermhfullpage(entity,pageSize,pageIndex,parameter) {

    try { //查询所有数据
        const data = await mhcxmh(entity, parameter);
        //总页数
        const pageCount = Math.ceil(data.length / pageSize);
        //总数据
        const Total = data.length;


        //分页查询
        const ionform = await zccxmh(entity, pageIndex, pageSize, parameter);
        if (ionform.length > 0) {
            return {state: stat.succeed, data: ionform, page: pageCount, total: Total, date: data}
            //返回状态值1  查询成功  data分页数据   page 总页数  total总数据量   date 全部数据[Excel下载使用：下载全部数据]
        } else {
            //返回状态值0  查询失败
            return {state: stat.defeated}
        }
    } catch (e) {
        Logger.error("----service  / Generalpagingfullcheck  /  wermhfullpage ---------",e)
        return {state: stat.defeated}
    }


}



//模糊分页  总数据量也带条件(带单个where条件)
export async function wermhfullonepage(entity,pageSize,pageIndex,werpara,parameter) {

    try { //查询所有数据
        const data = await mhcxmhzsjl(entity, werpara, parameter);
        //总页数
        const pageCount = Math.ceil(data.length / pageSize);
        //总数据
        const Total = data.length;
        //分页查询
        const ionform = await mhcxmhfy(entity, pageIndex, pageSize, werpara, parameter);
        if (ionform.length > 0) {
            return {state: stat.succeed, data: ionform, page: pageCount, total: Total, date: data}
            //返回状态值1  查询成功  data分页数据   page 总页数  total总数据量   date 全部数据[Excel下载使用：下载全部数据]
        } else {
            //返回状态值0  查询失败
            return {state: stat.defeated}
        }
    } catch (e) {
        Logger.error("----service  / Generalpagingfullcheck  /  wermhfullpage ---------",e)
        return {state: stat.defeated}
    }


}

// 原生
export async function selsp(pageSize,pageIndex){
    const queryRunner = getConnection().createQueryRunner();
    let ionform = await query("SELECT * FROM approvalform WHERE approvalformApprovalStatus = 1 LIMIT "+(pageIndex-1)*pageSize+","+pageSize );
    //总页数
    const pageCount = Math.ceil(ionform.length / pageSize);
    //总数据
    const Total = ionform.length;
    if(ionform){
        return {state: stat.succeed, data: ionform, page: pageCount, total: Total}
    }else{
        return {state: stat.defeated}
    }
}

export async function selwsp(pageSize,pageIndex){
    const queryRunner = getConnection().createQueryRunner();
    let ionform = await query("SELECT * FROM approvalform LIMIT "+(pageIndex-1)*pageSize+","+pageSize );
    //总页数
    const pageCount = Math.ceil(ionform.length / pageSize);
    //总数据
    const Total = ionform.length;

    if(ionform){
        return {state: stat.succeed, data: ionform, page: pageCount, total: Total}
    }else{
        return {state: stat.defeated}
    }
}

//模糊分页  总数据量也带条件(带单个where条件)
export async function wermhfullonepagee(entity,pageSize,pageIndex,werpara,parameter) {

    try {
        //查询所有数据
        const data = await mhcxmhzsjll(entity, werpara, parameter);
        //总页数
        const pageCount = Math.ceil(data.length / pageSize);
        //总数据
        const Total = data.length;
        //分页查询
        const ionform = await mhcxmhfyy(entity, pageIndex, pageSize, werpara, parameter);
        if (ionform.length > 0) {
            return {state: stat.succeed, data: ionform, page: pageCount, total: Total, date: data}
            //返回状态值1  查询成功  data分页数据   page 总页数  total总数据量   date 全部数据[Excel下载使用：下载全部数据]
        } else {
            //返回状态值0  查询失败
            return {state: stat.defeated}
        }
    } catch (e) {
        Logger.error("----service  / Generalpagingfullcheck  /  wermhfullpagee ---------",e)
        return {state: stat.defeated}
    }


}