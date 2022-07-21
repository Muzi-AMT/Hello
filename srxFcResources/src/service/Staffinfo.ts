//职工信息

import {MultinpsearchNo, queryCondition, queryConditionNo} from "../dao/queryDao";
import {employeeregistrationform} from "../entity/employeeregistrationform";
import stat from "../util/state";
import {addtools,addtoolss} from "../dao/insertDao";
import {oldageinsurance} from "../entity/oldageinsurance";
import {medicalinsurance} from "../entity/medicalinsurance";
import {unemploymentinsurance} from "../entity/unemploymentinsurance";
import {housingprovidentfund} from "../entity/housingprovidentfund";
import {familymember} from "../entity/familymember";
import log4js from "../util/logs";
import {loginmessage} from "../entity/loginmessage";
import {corporateinformation} from "../entity/corporateinformation";
import {hrdept} from "../entity/hrdept";
import {approvalform} from "../entity/approvalform";
import {selGshangzj} from "./Injury";
import {selcqzgsybx} from "./report";
const Logger = log4js.getLogger('error');

//添加职工信息
export async function addStaf(retrieve,werretrieve,wherer,gsmm) {
    try {
        let bh = {};

        //查询是否登录信息重复
        const repeat = await queryCondition(employeeregistrationform, werretrieve);
        // 查询出公司的档案编号
        const gsmianma = await queryCondition(approvalform,gsmm);
        let gsmmm = gsmm;
        let gsmms = JSON.parse(gsmmm);
        bh['corporateInformationTradeName']=gsmms.approvalformTradeName;
        const zggsmm = await MultinpsearchNo(employeeregistrationform,bh);
        // 接收截取出的职工档案编号
        let zgdabh = '';
        if(zggsmm.length>0){
            //@ts-ignore
            zgdabh = zggsmm[0].employeeregistrationformFileNumber.substring(gsmianma.approvalformEnterpriseNumber.length)
        }
        //创建一个键值对，存储拼接后的档案编号
        let dabh = {};
        // 自增档案编号
        let zjdabh = 1;

        // 查询公司编码
        const gsm = await queryCondition(approvalform,gsmm);
        let retrievee = retrieve;
        let retrieves = JSON.parse(retrievee);
        if(zgdabh=='0001'){

            zjdabh+=zggsmm.length;
            if(zjdabh<10){
                // @ts-ignore
                retrieves.employeeregistrationformFileNumber+=gsm.approvalformEnterpriseNumber+'000'+zjdabh;
            }else if(zjdabh>=10 && zjdabh<100){
                // @ts-ignore
                retrieves.employeeregistrationformFileNumber+=gsm.approvalformEnterpriseNumber+'00'+zjdabh;
            }else if(zjdabh>=100 && zjdabh<1000){
                // @ts-ignore
                retrieves.employeeregistrationformFileNumber+=gsm.approvalformEnterpriseNumber+'0'+zjdabh;
            }else{
                // @ts-ignore
                retrieves.employeeregistrationformFileNumber+=gsm.approvalformEnterpriseNumber+zjdabh;
            }
        }else{
            // @ts-ignore
            retrieves.employeeregistrationformFileNumber+=gsm.approvalformEnterpriseNumber+retrieves.employeeregistrationformFileNumber;
        }

        retrieves.employeeregistrationformFileNumber=retrieves.employeeregistrationformFileNumber.substring(retrieves.employeeregistrationformFileNumber.indexOf("D"));

        dabh['employeeregistrationformFileNumber']=retrieves.employeeregistrationformFileNumber

        const repeat1 = await queryConditionNo(employeeregistrationform, dabh);
        if(repeat){
            // @ts-ignore
            if(repeat.corporateInformationTradeName==retrieves.corporateInformationTradeName){
                return {state: stat.repetition}
            }else{
                // @ts-ignore
                if(repeat.employe==0){// 如果 员工是在职状态 就返回 在那个公司就职 不可以添加
                    return {state:stat.ygsz,repeat: repeat};
                }else{// 如果 员工是离职状态 就返回 在那个公司就职过 可以添加
                    //添加职工登记信息
                    let login = await addtoolss(employeeregistrationform, retrieves);
                    //给养老保险添加数据
                    const addhrd = await addtools(oldageinsurance, retrieve);
                    // 给医疗保险表添加数据
                    const medic = await addtools(medicalinsurance, retrieve);
                    // 给失业保险医疗保险表添加数据
                    const unemploy = await addtools(unemploymentinsurance, retrieve);
                    // 给住房公积金表添加数据
                    const hous = await addtools(housingprovidentfund, retrieve);
                    //添加家庭信息
                    let corp = await addtools(familymember, retrieve);
                    if (addhrd && medic && corp && login && unemploy && hous) {
                        let RR = JSON.parse(retrieve)
                        //添加成功 1
                        return {state: stat.yglz,data:RR.employeeregistrationformFileNumber,repeat:repeat};
                    } else {
                        //添加失败 0
                        return {state: stat.defeated,repeat:repeat};
                    }
                }
            }
        }else if(repeat1){
            return {state: stat.repetition,repeat:repeat}
        }else {
            //添加职工登记信息
            let login = await addtoolss(employeeregistrationform, retrieves);
            //给养老保险添加数据
            const addhrd = await addtools(oldageinsurance, retrieve);
            // 给医疗保险表添加数据
            const medic = await addtools(medicalinsurance, retrieve);
            // 给失业保险医疗保险表添加数据
            const unemploy = await addtools(unemploymentinsurance, retrieve);
            // 给住房公积金表添加数据
            const hous = await addtools(housingprovidentfund, retrieve);
            //添加家庭信息
            let corp = await addtools(familymember, retrieve);

            if (addhrd && medic && corp && login && unemploy && hous) {
                let RR = JSON.parse(retrieve)
                //添加成功 1
                return {state: stat.succeed,data:RR.employeeregistrationformFileNumber};
            } else {
                //添加失败 0
                return {state: stat.defeated};
            }

        }
    } catch (e) {
        Logger.error("----service  / Staffinfo  /  addStaf ---------", e);
        return {state: stat.defeated};
    }
}



//客户端 注册企业信息
export async function Registered(retrieve,werretrieve) {
    try {
        //查询是否登录信息重复
        const repeat = await queryCondition(loginmessage,werretrieve);
        if (repeat) {
            //状态码返回2  该登录用户已有
            return {state: stat.repetition}
        } else {
            //添加登录信息
            let login = await addtools(loginmessage,retrieve);
            //添加企业信息
            let corp = await addtools(corporateinformation,retrieve);
            //给hrdept表添加数据
            const addhrd= await addtools(hrdept,retrieve);
            // 给审批表添加数据
            const addapf = await addtools(approvalform,retrieve);
            if (addhrd && addapf && corp && login){
                //添加成功 1
               return {state:stat.succeed}
            }else{
                //添加失败 0
                return {state:stat.defeated}
            }
        }
    }catch (e) {
        Logger.error("----service  / Staffinfo  /  Registered ---------",e);
        return {state: stat.defeated};
    }

}

// 根据公司名称 查询公司
export async function selappval(werretrieve){
    try {
        const selgs = await queryCondition(approvalform,werretrieve);
        if(selgs){
            // 查询成功
            return {state: stat.succeed,data:selgs};
        }else{
            // 查询失败
            return {state: stat.defeated};
        }
    }catch (e) {
        Logger.error("----service  / Staffinfo  /  selappval ---------",e);
        return {state: stat.defeated};
    }

}