// 查询退休员工
import stat from "../util/state";
import {getConnection} from "typeorm";
const CONNECTION = getConnection();
import log4js from "../util/logs";
import {AllEnquiries} from "../dao/queryDao";
import {isNumber} from "util";
import {socialsecurityexpense} from "../entity/socialsecurityexpense";
import {updsoc, autoaddso, autoaddsofee, dg} from "./socialsecuritycost"
import {Multinpsearch} from"../dao/queryDao"
import {socialsecurityfee} from "../entity/socialsecurityfee";
import {socialsecuritydetail} from "../entity/socialsecuritydetail";
import {query} from "../dao/stopped";

const Logger = log4js.getLogger('error');
const {
    Calendar,
    CalendarTypes
} = require('calendar2');


export async function selretire(gs,age){
    try {
        if (age == 1) {
            const queryRunner = getConnection().createQueryRunner();
            let querydata = await query("SELECT *,\n" +
                "(YEAR(NOW())-SUBSTRING(p.employeeregistrationformIDNumber,6,4)) age,\n" +
                "CASE IF(LENGTH(employeeregistrationformIDNumber)=18, CAST(SUBSTRING(employeeregistrationformIDNumber,17,1) AS UNSIGNED)%2,3) \n" +
                "WHEN 1 THEN '男' \n" +
                "END AS sex\n" +
                "FROM employeeregistrationform p WHERE p.corporateInformationTradeName = " + "'" + gs + "'" + "  HAVING sex = '男' AND age>=60 ORDER BY p.employeeregistrationformId DESC \n");
            //
            if (querydata.length > 0) {
                return {state: stat.succeed, data: querydata}
                //返回状态值1  查询成功  data分页数据   page 总页数  total总数据量   date 全部数据[Excel下载使用：下载全部数据]
            } else {
                //返回状态值0  查询失败
                return {state: stat.defeated}
            }
        } else if (age == 2) {
            const queryRunner = getConnection().createQueryRunner();
            let querydata = await query("SELECT *,\n" +
                "(YEAR(NOW())-SUBSTRING(p.employeeregistrationformIDNumber,6,4)) age,\n" +
                "CASE IF(LENGTH(employeeregistrationformIDNumber)=18, CAST(SUBSTRING(employeeregistrationformIDNumber,17,1) AS UNSIGNED)%2,3) \n" +
                "WHEN 0 THEN '女' \n" +
                "END AS sex\n" +
                "FROM employeeregistrationform p WHERE p.corporateInformationTradeName = " + "'" + gs + "'" + "  HAVING sex = '女' AND age>=55 ORDER BY p.employeeregistrationformId DESC \n");
            //
            if (querydata.length > 0) {
                return {state: stat.succeed, data: querydata}
                //返回状态值1  查询成功  data分页数据   page 总页数  total总数据量   date 全部数据[Excel下载使用：下载全部数据]
            } else {
                //返回状态值0  查询失败
                return {state: stat.defeated}
            }
        } else {
            const queryRunner = getConnection().createQueryRunner();
            let querydata = await query("SELECT *,\n" +
                "(YEAR(NOW())-SUBSTRING(p.employeeregistrationformIDNumber,6,4)) age,\n" +
                "CASE IF(LENGTH(employeeregistrationformIDNumber)=18, CAST(SUBSTRING(employeeregistrationformIDNumber,17,1) AS UNSIGNED)%2,3) \n" +
                "WHEN 0 THEN '女' \n" +
                "END AS sex\n" +
                "FROM employeeregistrationform p WHERE p.corporateInformationTradeName = " + "'" + gs + "'" + "  HAVING sex = '女' AND age>=50 ORDER BY p.employeeregistrationformId DESC \n");
            //
            if (querydata.length > 0) {
                return {state: stat.succeed, data: querydata}
                //返回状态值1  查询成功  data分页数据   page 总页数  total总数据量   date 全部数据[Excel下载使用：下载全部数据]
            } else {
                //返回状态值0  查询失败
                return {state: stat.defeated}
            }
        }
    } catch (e) {
    Logger.error("----service  / retiredworkers  /  selretire ---------",e)
    return {state: stat.defeated};
    }
}


//修改社保基数
export async function updsbase(retrieve,werretrieve,base){
    try {
        const queryRunner = getConnection().createQueryRunner();
        let retriev = JSON.parse(retrieve);
        let werretriev = JSON.parse(werretrieve);
        //查询时间段的所有数据

        if (base == 1) {
            let up = await query("UPDATE socialsecurityexpense SET socialsecurityexpenseBaseAdjustment =" + retriev.socialsecurityexpenseBaseAdjustment + " WHERE socialsecurityexpenseAUAAMInsurance<>0  AND socialsecurityexpenseDate BETWEEN " + "'" + werretriev.time1 + "'" + " AND " + "'" + werretriev.time2 + "'" + "");
            //
            if (up) {
                //修改成功 返回1
                return {state: stat.succeed}
            } else {
                //返回状态值0  修改失败
                return {state: stat.defeated}
            }
        } else if (base == 2) {
            let up = await query("UPDATE socialsecurityexpense SET socialsecurityexpenseEIALater =" + retriev.socialsecurityexpenseEIALater + " WHERE socialsecurityexpenseAUAAMInsurance<>0  AND socialsecurityexpenseDate BETWEEN " + "'" + werretriev.time1 + "'" + " AND " + "'" + werretriev.time2 + "'" + "");
            //
            if (up) {
                //修改成功 返回1
                return {state: stat.succeed}
            } else {
                //返回状态值0  修改失败
                return {state: stat.defeated}
            }
        } else if (base == 3) {
            let up = await query("UPDATE socialsecurityexpense SET socialsecurityexpenseMIBAdjustment =" + retriev.socialsecurityexpenseMIBAdjustment + " WHERE socialsecurityexpenseAUAAMInsurance<>0  AND socialsecurityexpenseDate BETWEEN " + "'" + werretriev.time1 + "'" + " AND " + "'" + werretriev.time2 + "'" + "");
            //
            if (up) {
                //修改成功 返回1
                return {state: stat.succeed}
            } else {
                //返回状态值0  修改失败
                return {state: stat.defeated}
            }
        } else if (base == 4) {
            let up = await query("UPDATE socialsecurityexpense SET socialsecurityexpenseASIOABase =" + retriev.socialsecurityexpenseASIOABase + " WHERE socialsecurityexpenseAUAAMInsurance<>0  AND socialsecurityexpenseDate BETWEEN " + "'" + werretriev.time1 + "'" + " AND " + "'" + werretriev.time2 + "'" + "");
            //
            if (up) {
                //修改成功 返回1
                return {state: stat.succeed}
            } else {
                //返回状态值0  修改失败
                return {state: stat.defeated}
            }
        } else if (base == 5) {
            let up = await query("UPDATE socialsecurityexpense SET socialsecurityexpenseBIABAfter =" + retriev.socialsecurityexpenseBIABAfter + " WHERE socialsecurityexpenseAUAAMInsurance<>0  AND socialsecurityexpenseDate BETWEEN " + "'" + werretriev.time1 + "'" + " AND " + "'" + werretriev.time2 + "'" + "");
            //
            if (up) {
                //修改成功 返回1
                return {state: stat.succeed}
            } else {
                //返回状态值0  修改失败
                return {state: stat.defeated}
            }
        } else if (base == 6) {
            let up = await query("UPDATE socialsecurityexpense SET socialsecurityexpenseICIBAdjustment =" + retriev.socialsecurityexpenseICIBAdjustment + " WHERE socialsecurityexpenseAUAAMInsurance<>0  AND socialsecurityexpenseDate BETWEEN " + "'" + werretriev.time1 + "'" + " AND " + "'" + werretriev.time2 + "'" + "");
            //
            if (up) {
                //修改成功 返回1
                return {state: stat.succeed}
            } else {
                //返回状态值0  修改失败
                return {state: stat.defeated}
            }
        } else if (base == 7) {
            let up = await query("UPDATE socialsecurityexpense SET socialsecurityexpenseUIBWRBack =" + retriev.socialsecurityexpenseUIBWRBack + " WHERE socialsecurityexpenseAUAAMInsurance<>0  AND socialsecurityexpenseDate BETWEEN " + "'" + werretriev.time1 + "'" + " AND " + "'" + werretriev.time2 + "'" + "");
            //
            if (up) {
                //修改成功 返回1
                return {state: stat.succeed}
            } else {
                //返回状态值0  修改失败
                return {state: stat.defeated}
            }
        } else if (base == 8) {
            let up = await query("UPDATE socialsecurityexpense SET socialsecurityexpenseHRBAdjustment =" + retriev.socialsecurityexpenseHRBAdjustment + " WHERE socialsecurityexpenseAUAAMInsurance<>0  AND socialsecurityexpenseDate BETWEEN " + "'" + werretriev.time1 + "'" + " AND " + "'" + werretriev.time2 + "'" + "");
            //
            if (up) {
                //修改成功 返回1
                return {state: stat.succeed}
            } else {
                //返回状态值0  修改失败
                return {state: stat.defeated}
            }
        }
    } catch (e) {
        Logger.error("----service  / retiredworkers  /  updsbase ---------",e)
        return {state: stat.defeated};
    }

}
//修改社保比例
export async function updproportion(retrieve,werretrieve,base){
    try {
        let retriev = JSON.parse(retrieve);
        let werretriev = JSON.parse(werretrieve);
        //查询时间段的所有数据
        if (base == 1) {
            let up = await query("UPDATE socialsecurityexpense SET socialsecurityexpenseEIUPProportion =" + retriev.socialsecurityexpenseEIUPProportion + " WHERE socialsecurityexpenseEIUPProportion<>0 AND socialsecurityexpenseDate BETWEEN " + "'" + werretriev.time1 + "'" + " AND " + "'" + werretriev.time2 + "'" + "");
            let up1 = await query("UPDATE socialsecurityexpense SET socialsecurityexpensePEIPIndividual="+retriev.socialsecurityexpensePEIPIndividual+" WHERE  socialsecurityexpensePEIPIndividual<>0  AND socialsecurityexpenseDate BETWEEN " + "'" + werretriev.time1 + "'" + " AND " + "'" + werretriev.time2 + "'" + "");
            if (up||up1){
                return {state: stat.succeed}
            }else {
                return {state: stat.defeated}
            }
        } else if (base == 2) {
            let up = await query("UPDATE socialsecurityexpense SET socialsecurityexpenseMIUPProportion =" + retriev.socialsecurityexpenseMIUPProportion + " WHERE socialsecurityexpenseMIUPProportion<>0 AND socialsecurityexpenseDate BETWEEN " + "'" + werretriev.time1 + "'" + " AND " + "'" + werretriev.time2 + "'" + "");
            let up1 = await query("UPDATE socialsecurityexpense SET socialsecurityexpenseMIICRatio="+retriev.socialsecurityexpenseMIICRatio+" WHERE socialsecurityexpenseMIICRatio<>0  AND socialsecurityexpenseDate BETWEEN " + "'" + werretriev.time1 + "'" + " AND " + "'" + werretriev.time2 + "'" + "");
            if (up||up1){
                return {state: stat.succeed}
            }else {
                return {state: stat.defeated}
            }
        } else if (base == 3) {
            let up = await query("UPDATE socialsecurityexpense SET socialsecurityexpensePSIPUnit =" + retriev.socialsecurityexpensePSIPUnit + " WHERE socialsecurityexpensePSIPUnit<>0 AND socialsecurityexpenseDate BETWEEN " + "'" + werretriev.time1 + "'" + " AND " + "'" + werretriev.time2 + "'" + "");
            let up1 = await query("UPDATE socialsecurityexpense SET socialsecurityexpenseSIIPProportion="+retriev.socialsecurityexpenseSIIPProportion+" WHERE socialsecurityexpenseSIIPProportion<>0  AND socialsecurityexpenseDate BETWEEN " + "'" + werretriev.time1 + "'" + " AND " + "'" + werretriev.time2 + "'" + "");
            if (up||up1){
                return {state: stat.succeed}
            }else {
                return {state: stat.defeated}
            }
        } else if (base == 4) {
            let up = await query("UPDATE socialsecurityexpense SET socialsecurityexpensePMIUnits =" + retriev.socialsecurityexpensePMIUnits + "WHERE socialsecurityexpensePMIUnits<>0 AND socialsecurityexpenseDate BETWEEN " + "'" + werretriev.time1 + "'" + " AND " + "'" + werretriev.time2 + "'" + "");
            let up1 = await query("UPDATE socialsecurityexpense SET socialsecurityexpensePIPMInsurance="+retriev.socialsecurityexpensePIPMInsurance+" WHERE socialsecurityexpensePIPMInsurance<>0  AND socialsecurityexpenseDate BETWEEN " + "'" + werretriev.time1 + "'" + " AND " + "'" + werretriev.time2 + "'" + "");
            if (up||up1){
                return {state: stat.succeed}
            }else {
                return {state: stat.defeated}
            }
        } else if (base == 5) {
            let up = await query("UPDATE socialsecurityexpense SET socialsecurityexpensePICIUnits =" + retriev.socialsecurityexpensePICIUnits + " WHERE socialsecurityexpensePICIUnits<>0  AND socialsecurityexpenseDate BETWEEN " + "'" + werretriev.time1 + "'" + " AND " + "'" + werretriev.time2 + "'" + "");
            let up1 = await query("UPDATE socialsecurityexpense SET socialsecurityexpenseICIICRatio="+retriev.socialsecurityexpenseICIICRatio+" WHERE socialsecurityexpenseICIICRatio<>0  AND socialsecurityexpenseDate BETWEEN " + "'" + werretriev.time1 + "'" + " AND " + "'" + werretriev.time2 + "'" + "");
            if (up||up1){
                return {state: stat.succeed}
            }else {
                return {state: stat.defeated}
            }
        } else if (base == 6) {
            let up = await query("UPDATE socialsecurityexpense SET socialsecurityexpenseUIUPProportion =" + retriev.socialsecurityexpenseUIUPProportion + " WHERE socialsecurityexpenseUIUPProportion<>0 AND socialsecurityexpenseDate BETWEEN " + "'" + werretriev.time1 + "'" + " AND " + "'" + werretriev.time2 + "'" + "");
            let up1 = await query("UPDATE socialsecurityexpense SET socialsecurityexpenseUIICRatio="+retriev.socialsecurityexpenseUIICRatio+" WHERE socialsecurityexpenseUIICRatio<>0  AND socialsecurityexpenseDate BETWEEN " + "'" + werretriev.time1 + "'" + " AND " + "'" + werretriev.time2 + "'" + "");
            if (up||up1){
                return {state: stat.succeed}
            }else {
                return {state: stat.defeated}
            }
        } else if (base == 7) {
            let up = await query("UPDATE socialsecurityexpense SET socialsecurityexpensePPHUnits =" + retriev.socialsecurityexpensePPHUnits + " WHERE socialsecurityexpensePPHUnits<>0   AND socialsecurityexpenseDate BETWEEN " + "'" + werretriev.time1 + "'" + " AND " + "'" + werretriev.time2 + "'" + "");
            let up1 = await query("UPDATE socialsecurityexpense SET socialsecurityexpensePHRPIndividuals="+retriev.socialsecurityexpensePHRPIndividuals+" WHERE socialsecurityexpensePHRPIndividuals<>0  AND socialsecurityexpenseDate BETWEEN " + "'" + werretriev.time1 + "'" + " AND " + "'" + werretriev.time2 + "'" + "");
            if (up||up1){
                return {state: stat.succeed}
            }else {
                return {state: stat.defeated}
            }
        }
    } catch (e) {
        Logger.error("----service  / retiredworkers  /  updproportion ---------",e)
        return {state: stat.defeated};
    }

}
//修改工伤比例
export async function updproportion1(retrieve,werretrieve,base){
    try {
        let retriev = JSON.parse(retrieve);
        let werretriev = JSON.parse(werretrieve);
        //查询时间段的所有数据
         if (base == 1) {
            let up = await query("UPDATE socialsecurityexpense SET socialsecurityexpensePICIUnits =" + retriev.socialsecurityexpensePICIUnits + " WHERE socialsecurityexpensePICIUnits<>0 AND corporateInformationTradeName='" + werretriev.corporateInformationTradeName + "' AND socialsecurityexpenseDate BETWEEN " + "'" + werretriev.time1 + "'" + " AND " + "'" + werretriev.time2 + "'" + "");
            if (up){
                return {state: stat.succeed}
            }else {
                return {state: stat.defeated}
            }
        }
    } catch (e) {
        Logger.error("----service  / retiredworkers  /  updproportion ---------",e)
        return {state: stat.defeated};
    }

}
//修改工伤比例
export async function updso1(werretrieve) {

    try {
        let werretriev = JSON.parse(werretrieve);
        const selso = await CONNECTION
            .getRepository(socialsecurityexpense)
            .createQueryBuilder()
            .where("socialsecurityexpenseDate BETWEEN :start AND :end", {start: werretriev.time1, end: werretriev.time2})
            .andWhere({corporateInformationTradeName:werretriev.corporateInformationTradeName})
            .getMany();
        let a= dg(selso);
    } catch (e) {
        Logger.error("----service  / retiredworkers  /  upd ---------",e)
        return {state: stat.defeated};
    }

}
//修改社保比例
export async function updso(werretrieve) {

    try {
        let werretriev = JSON.parse(werretrieve);
        let selso = await CONNECTION
            .getRepository(socialsecurityexpense)
            .createQueryBuilder()
            .where("socialsecurityexpenseDate BETWEEN :start AND :end", {start: werretriev.time1, end: werretriev.time2})
            .getMany();
        let a= dg(selso)
    } catch (e) {
        Logger.error("----service  / retiredworkers  /  upd ---------",e)
        return {state: stat.defeated};
    }

}


var szv=[];
export function  dgv(){
    let reqs=[]
    if (szv.length>500){
        for(var i=0;i<50;i++){
            let k=updsoc(szv[i],szv[i].socialsecurityexpenseDate);
            reqs.push(k);
            szv.splice(i,1);
            console.log(szv.length)
        }
        Promise.all(reqs).then((da)=>{
            dgv();
        });
    }else if (szv.length>0&&szv.length<500){

        for(var i=0;i<szv.length;i++){
            let k=updsoc(szv[i],szv[i].socialsecurityexpenseDate);
            reqs.push(k);
            szv.splice(i,1);
            console.log(szv.length,"-2");
        }
        Promise.all(reqs).then((da)=>{
            dgv();
            //return szv;
        });
    }
}
//修改社保基数
export async function upd(werretrieve) {

    try {
        let werretriev = JSON.parse(werretrieve);
        let selso = await CONNECTION
            .getRepository(socialsecurityexpense)
            .createQueryBuilder()
            .where("socialsecurityexpenseDate BETWEEN :start AND :end", {start: werretriev.time1, end: werretriev.time2})
            .getMany();
        szv=selso;
        dgv();
    } catch (e) {
        Logger.error("----service  / retiredworkers  /  upd ---------",e)
        return {state: stat.defeated};
    }

}


//自动生成下个月的社保缴费
export async function autogeneration(corporateInformationTradeName,socialsecurityexpenseDate){
    try {
        //获取上月时间
        let rq = socialsecurityexpenseDate
        const cal = new Calendar(rq);
        cal.add(-1, CalendarTypes.MONTH)
        let sangyu=cal.toFormat('yyyy-MM')
        const queryRunner = getConnection().createQueryRunner();
        //根据上个月和公司查询社保费用表
        let soci = await query("SELECT * FROM `socialsecurityexpense` s \n" +
            "INNER JOIN `employeeregistrationform` e ON s.employeeregistrationformIDNumber = e.employeeregistrationformIDNumber \n" +
            "WHERE e.employe='0' AND s.corporateInformationTradeName='" + corporateInformationTradeName + "' AND s.socialsecurityexpenseDate='" + sangyu + "'");

        //根据上个月和公司查询社保费用补差表
        let fee = await query("SELECT * FROM `socialsecurityfee` s \n" +
            "INNER JOIN `employeeregistrationform` e ON s.employeeregistrationformIDNumber = e.employeeregistrationformIDNumber \n" +
            "WHERE e.employe='0' AND s.corporateInformationTradeName='" + corporateInformationTradeName + "' AND s.socialsecurityexpenseDate='" + sangyu + "'");

        //查重日期
        let selfee = await CONNECTION
            .getRepository(socialsecurityfee)
            .createQueryBuilder()
            .where({socialsecurityexpenseDate: socialsecurityexpenseDate})
            .getOne();
        let pense = await CONNECTION
            .getRepository(socialsecurityexpense)
            .createQueryBuilder()
            .where({socialsecurityexpenseDate: socialsecurityexpenseDate})
            .getOne();

        if (selfee && pense) {
            //日期重复返回11
            return {state: stat.dat}
        } else {
            if (soci || fee.length > 0) {
                for (var i = 0; i < soci.length && fee.length; i++) {
                    let soc = await autoaddso(soci[i], socialsecurityexpenseDate);
                    let fe = await autoaddsofee(fee[i], socialsecurityexpenseDate);
                }

                return {state: stat.succeed}
            } else {
                //返回状态值0  查询失败
                return {state: stat.defeated}
            }
        }
    } catch (e) {
        Logger.error("----service  / retiredworkers  /  autogeneration ---------",e)
        return {state: stat.defeated};
    }

}
//社保费用明细表添加
export async function Socialadd(retrieve){
    try {
        let re = JSON.parse(retrieve);
        //养老保险合计缴费金额
        let socialsecurityexpenseAOICEOtotal=(parseFloat(re.s3)+parseFloat(re.s4))
        socialsecurityexpenseAOICEOtotal=Number(socialsecurityexpenseAOICEOtotal.toFixed(2))
        // 医疗保险合计缴费金额
       let socialsecurityexpenseAICMIntotal=(parseFloat(re.s7) + parseFloat(re.s8))
       socialsecurityexpenseAICMIntotal=Number(socialsecurityexpenseAICMIntotal.toFixed(2))
        // 大病合计缴费金额
        let socialsecurityexpenseMIPIPtotal=(parseFloat(re.s9) + parseFloat(re.s10))
        socialsecurityexpenseMIPIPtotal=Number(socialsecurityexpenseMIPIPtotal.toFixed(2))
        // 失业保险合计缴费金额
        let socialsecurityexpenseUIICtotal=(parseFloat(re.s14)+parseFloat(re.s15))
        socialsecurityexpenseUIICtotal=Number(socialsecurityexpenseUIICtotal.toFixed(2))
        // 住房公积金合计缴费金额
        let socialsecurityexpenseAPIHtotal=(parseFloat(re.s17)+parseFloat(re.s18))
        socialsecurityexpenseAPIHtotal=Number(socialsecurityexpenseAPIHtotal.toFixed(2))
        //医保
        let medicalinsurance=(socialsecurityexpenseAICMIntotal+socialsecurityexpenseMIPIPtotal)
        medicalinsurance=Number(medicalinsurance.toFixed(2))
        //收费合计
        let chargetotal=(socialsecurityexpenseAOICEOtotal+medicalinsurance+parseFloat(re.s11)+socialsecurityexpenseUIICtotal+socialsecurityexpenseAPIHtotal+parseFloat(re.s23))
        chargetotal=Number(chargetotal.toFixed(2))
        let seldetail = await CONNECTION
            .getRepository(socialsecuritydetail)
            .createQueryBuilder()
            .where({socialsecurityexpenseDate: re.s26})
            .getOne();
        if (seldetail) {
            const upd = await CONNECTION
                .createQueryBuilder()
                .update(socialsecuritydetail)
                .set({
                    corporateInformationTradeName: re.s25,
                    socialsecurityexpenseEICbase: re.s2,
                    socialsecurityexpenseAICEInsurance: re.s3,
                    socialsecurityexpenseAOICEOInsurance: re.s4,
                    socialsecurityexpenseAOICEOtotal:socialsecurityexpenseAOICEOtotal,
                    socialsecurityexpenseACWageBase: re.s5,
                    socialsecurityexpenseMICBase: re.s6,
                    socialsecurityexpenseAPMIUnit: re.s7,
                    socialsecurityexpenseAICMInsurance: re.s8,
                    socialsecurityexpenseAICMIntotal:socialsecurityexpenseAICMIntotal,
                    socialsecurityexpenseAPMDCUnit: re.s9,
                    socialsecurityexpenseMIPIPAmount: re.s10,
                    socialsecurityexpenseMIPIPtotal:socialsecurityexpenseMIPIPtotal,
                    socialsecurityexpenseAPIIIIUnit: re.s11,
                    socialsecurityexpenseAPBMIUnit: re.s12,
                    socialsecurityexpenseUICBase: re.s13,
                    socialsecurityexpenseAPUIUnit: re.s14,
                    socialsecurityexpenseUIICAmount: re.s15,
                    socialsecurityexpenseUIICtotal:socialsecurityexpenseUIICtotal,
                    socialsecurityexpenseHRBAdjustment: re.s16,
                    socialsecurityexpenseHAFPAmount: re.s17,
                    socialsecurityexpenseAPIHReserves: re.s18,
                    socialsecurityexpenseAPIHtotal:socialsecurityexpenseAPIHtotal,
                    socialsecurityexpenseTAPUit: re.s19,
                    socialsecurityexpenseTAPIndividuals: re.s20,
                    socialsecurityexpenseASSWage: re.s21,
                    socialsecurityexpensePFSalary: re.s22,
                    socialsecurityexpenseAMFPUnit: re.s23,
                    dettotal: re.s24,
                    medicalinsurance:medicalinsurance,
                    chargetotal:chargetotal
                })
                .where("socialsecurityexpenseDate = :socialsecurityexpenseDate ", {socialsecurityexpenseDate: re.s26})
                .execute();
            if (upd) {
                //修改成功 返回1
                return {state: stat.succeed}
            } else {
                //返回状态值0  修改失败
                return {state: stat.defeated}
            }
        } else {
            const addsfee = await CONNECTION
                .createQueryBuilder()
                .insert()
                .into(socialsecuritydetail)
                .values([{
                    corporateInformationTradeName: re.s25,
                    socialsecurityexpenseDate: re.s26,
                    socialsecurityexpenseEICbase: re.s2,
                    socialsecurityexpenseAICEInsurance: re.s3,
                    socialsecurityexpenseAOICEOInsurance: re.s4,
                    socialsecurityexpenseAOICEOtotal:socialsecurityexpenseAOICEOtotal,
                    socialsecurityexpenseACWageBase: re.s5,
                    socialsecurityexpenseMICBase: re.s6,
                    socialsecurityexpenseAPMIUnit: re.s7,
                    socialsecurityexpenseAICMInsurance: re.s8,
                    socialsecurityexpenseAICMIntotal:socialsecurityexpenseAICMIntotal,
                    socialsecurityexpenseAPMDCUnit: re.s9,
                    socialsecurityexpenseMIPIPAmount: re.s10,
                    socialsecurityexpenseMIPIPtotal:socialsecurityexpenseMIPIPtotal,
                    socialsecurityexpenseAPIIIIUnit: re.s11,
                    socialsecurityexpenseAPBMIUnit: re.s12,
                    socialsecurityexpenseUICBase: re.s13,
                    socialsecurityexpenseAPUIUnit: re.s14,
                    socialsecurityexpenseUIICAmount: re.s15,
                    socialsecurityexpenseUIICtotal:socialsecurityexpenseUIICtotal,
                    socialsecurityexpenseHRBAdjustment: re.s16,
                    socialsecurityexpenseHAFPAmount: re.s17,
                    socialsecurityexpenseAPIHReserves: re.s18,
                    socialsecurityexpenseAPIHtotal:socialsecurityexpenseAPIHtotal,
                    socialsecurityexpenseTAPUit: re.s19,
                    socialsecurityexpenseTAPIndividuals: re.s20,
                    socialsecurityexpenseASSWage: re.s21,
                    socialsecurityexpensePFSalary: re.s22,
                    socialsecurityexpenseAMFPUnit: re.s23,
                    dettotal: re.s24,
                    medicalinsurance:medicalinsurance,
                    chargetotal:chargetotal
                }])
                .execute();

            if (addsfee) {
                //修改成功 返回1
                return {state: stat.succeed}
            } else {
                //返回状态值0  修改失败
                return {state: stat.defeated}
            }
        }
    } catch (e) {
        Logger.error("----service  / retiredworkers  /  Socialadd ---------",e)
        return {state: stat.defeated};
    }

}
