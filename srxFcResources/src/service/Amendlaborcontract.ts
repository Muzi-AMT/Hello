// 数据管理中心的业务

import {queryCondition,Multinpsearch} from "../dao/queryDao";
import {updtools, updtoolsgs} from "../dao/updataDao";
import {addtools} from "../dao/insertDao";
import {del} from "../dao/deleteDao";
import {certificatelaborcontract} from "../entity/certificatelaborcontract";
import {employeeregistrationform} from "../entity/employeeregistrationform";
import {socialsecurityexpense} from "../entity/socialsecurityexpense";
import stat from "../util/state";
import log4js from "../util/logs";
import {housingprovidentfund} from "../entity/housingprovidentfund";
import {familymember} from "../entity/familymember";
import {medicalinsurance} from "../entity/medicalinsurance";
import {oldageinsurance} from "../entity/oldageinsurance";
import {unemploymentinsurance} from "../entity/unemploymentinsurance";
import {socialsecurityfee} from "../entity/socialsecurityfee";
import {approvalform} from "../entity/approvalform";
const Logger = log4js.getLogger('error');
// 解除劳动合同证明中的添加新证明
export async function certificate(retrieve, werretrieve) {
    try {
        // 根据身份证号查重  判断此人有无解除劳动合同证明
        let srxfcselcfterminationinformation = await queryCondition(certificatelaborcontract, retrieve);
        // 修改和添加解除劳动合同证明
        // 根据·社会保障号【默认 无】·合同期限（起、止）·终止（解除）劳动合同原因【原因和依据】!不可为空!·
        //      ·主要简历（参保时间【默认 无】）·终止（解除）劳动合同时间·
        //      ·甲方签章·乙方签章·操作记录（时间【点击确认提交时的时间】）
        //      ·备注【以下选项】
        //            自愿离职、协商解除、单位辞退、退休、死亡、转出
        if (srxfcselcfterminationinformation) {
            let srxfcaddcertificatelaborcontractj = await updtools(certificatelaborcontract, retrieve, werretrieve);
            if (srxfcaddcertificatelaborcontractj) {
                return {state: stat.succeed}
            } else {
                return {state: stat.defeated}
            }
            // 重复 返回2 提示：解除合同信息已有此人
            return {state: stat.repetition}
        } else {
            let srxfcaddcertificatelaborcontract = await addtools(certificatelaborcontract, retrieve);
            if (srxfcaddcertificatelaborcontract) {

                let srxfcdelemployeeregistrationform = await del(employeeregistrationform, werretrieve);
                if (srxfcdelemployeeregistrationform.affected == 1) {

                    let srxfcaddterminationinformation = await addtools(certificatelaborcontract, retrieve);
                    if (srxfcaddterminationinformation) {
                        return {state: stat.succeed}
                    } else {
                        return {state: stat.defeated}
                    }
                } else {
                    return {state: stat.defeated}
                }
            } else {
                return {state: stat.defeated}
            }
        }
    } catch (e) {
        Logger.error("----service  /  Amendlaborcontract  /  certificate ---------",e);
        return {state: stat.defeated}
    }
}

// 社保费用中的添加社保费用
export async function security(retrieve,werretrieve) {
    try {
        // 查询社保费用表里有没有值
        let srxfcselsoialsecurityexpense = await Multinpsearch(socialsecurityexpense, retrieve);
        if (srxfcselsoialsecurityexpense.length > 1) {
            // 如果社保费用表里有值，那么我们就进行修改
            let srxfcupdsoialsecurityexpense = await updtools(socialsecurityexpense, retrieve, werretrieve);
            if (srxfcupdsoialsecurityexpense.affected >= 1) {
                // 修改成功 返回 6
                return {state: stat.pdsucceed}
            } else {
                // 修改失败 返回 7
                return {state: stat.pddefeated}
            }
        } else {
            // 如果社保费用表里没有值，那么我就进行添加
            let srxfcaddsoialsecurityexpense = await addtools(socialsecurityexpense, retrieve);
            if (srxfcaddsoialsecurityexpense) {
                // 添加成功 返回 6
                return {state: stat.pdsucceed}
            } else {
                // 添加失败 返回 7
                return {state: stat.pddefeated}
            }
        }
    } catch (e) {
        Logger.error("----service  /  Amendlaborcontract  /  security ---------", e);
        return {state: stat.pddefeated}
    }
}


// 社保费用中 删除个人社保费用信息
export async function delsec(retrieve) {
    try {
        //根据身份证号删除社保信息
        const  dlesec=await del(socialsecurityexpense,retrieve);
        const  delsecifee=await del(socialsecurityfee,retrieve);
        if (dlesec.affected==1 && delsecifee.affected==1){
            return {state:stat.succeed}
        }else {
            return {state:stat.defeated}
        }
    } catch (e) {
        Logger.error("----service  / Amendlaborcontract  /  delsec ---------",e);
        return {state:stat.defeated}
    }
}


//职工基本信息删除（同时操作6个表）
export async function delClienSexT(werretrieve) {
    try {
        //删除职工信息表
        let delcenl = await del(employeeregistrationform,werretrieve);
        //住房公积金
        let delhous = await del(housingprovidentfund,werretrieve);
        //家庭成员
        let delfamily = await del(familymember,werretrieve);
        // 医疗保险
        let delmedic = await del(medicalinsurance,werretrieve);
        //养老保险
        let delold =await del(oldageinsurance,werretrieve);
        //失业保险
        let delunemp = await del(unemploymentinsurance,werretrieve);
        if(delcenl.affected==1&&delhous.affected==1&&delfamily.affected==1&&delmedic.affected==1&&delold.affected==1&&delunemp.affected==1){
            return {state:stat.succeed}
        }else {
            return {state:stat.defeated}
        }
    } catch (e) {
        Logger.error("----service  / Amendlaborcontract  /  delClienSexT ---------",e);
        return {state:stat.defeated}
    }
}

//修改职工信息表
export async function udpClienSexT(retrieve,retrieve1,retrieve2,retrieve3,retrieve4,retrieve5,werretrieve) {
    try {
        let delcenl = await updtools(employeeregistrationform,retrieve,werretrieve);
        //住房公积金
        let delhous = await updtools(housingprovidentfund,retrieve1,werretrieve);
        //家庭成员
        let delfamily = await updtools(familymember,retrieve2,werretrieve);
        // 医疗保险
        let delmedic = await updtools(medicalinsurance,retrieve3,werretrieve);
        //养老保险
        let delold =await updtools(oldageinsurance,retrieve4,werretrieve);
        //失业保险
        let delunemp = await updtools(unemploymentinsurance,retrieve5,werretrieve);

        if(delcenl.affected==1||delhous.affected==1||delfamily.affected==1||delmedic.affected==1||delold.affected==1||delunemp.affected==1){
            return {state:stat.succeed}
        }else {
            return {state:stat.defeated}
        }
    } catch (e) {
        Logger.error("----service  / Amendlaborcontract  /  udpClienSexT ---------",e);
        return {state:stat.defeated}
    }
}


//解除劳动合同删除
export async function delreschon(werretrieve,retrieve) {
    try {
        //根据身份证号和企业名称删除
        const  dlresc=await del(certificatelaborcontract,werretrieve);
        //删除成功之后进行修改职工状态码为0
        const upresc = await updtools(employeeregistrationform,retrieve,werretrieve);
        if (dlresc.affected==1 && upresc.affected == 1){
            return {state:stat.succeed}
        }else {
            return {state:stat.defeated}
        }
    } catch (e) {
        Logger.error("----service  / Amendlaborcontract  /  delreschon ---------",e);
        return {state:stat.defeated}
    }
}