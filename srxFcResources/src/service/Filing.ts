//备案
import stat from "../util/state";
import {getConnection} from "typeorm";
import log4js from "../util/logs";
import {query} from "../dao/stopped";

const Logger = log4js.getLogger('error');
const {
    Calendar,
    CalendarTypes
} = require('calendar2');
//用人单位劳动关系人员基本情况备案表
export async function relation(werretrieve,wher,pageIndex,pageSize) {
    try {
        // 填表人
        let sqltbr = await query("SELECT filName FROM filler WHERE filType='备案'");

// 本月 法人代表/编码/开户行/账号/注册资金、职工人数/办公电话
        let sqljbxx = await query("SELECT \n" +
            "approvalformLawPerson,\n"+
            "approvalformBusinessLicenseCode,\n" +
            "approvalformBankOfDeposit,\n" +
            "approvalformBankAccount,\n" +
            "approvalformRegisterMoney,\n"+
            "approvalformCurrentHeadcount,\n"+
            "approvalformOfficeTel\n"+
            "FROM `approvalform` WHERE approvalformTradeName = '"+werretrieve+"' AND approvalformSubordinateToTheBlock ='盂县' ");

        let querydata = await query("SELECT e.htzzsj,e.workseniority,e.employeeregistrationformWorkTime,e.employeeregistrationformName,e.employeeregistrationformSex,e.employeeregistrationformIDNumber,e.employeeregistrationformTypeOfWork,r.fixedterm,r.fixedtermtion FROM employeeregistrationform e LEFT JOIN laborcontract r\n" +
            "ON e.employeeregistrationformFileNumber = r.employeeregistrationformFileNumber\n" +
            "LEFT JOIN socialsecurityexpense s ON r.employeeregistrationformFileNumber=s.employeeregistrationformFileNumber "+
            "LEFT JOIN `approvalform` a ON s.corporateInformationTradeName =a.approvalformTradeName\n"+
            "WHERE a.approvalformSubordinateToTheBlock = '盂县' AND e.employe=0 AND e.corporateInformationTradeName \n" +
            "IN (SELECT corporateInformationTradeName FROM `employeeregistrationform` WHERE  corporateInformationTradeName='"+werretrieve+"' AND s.socialsecurityexpenseDate = '"+wher+"' AND employeeregistrationformWorkTime LIKE '%"+wher+"%'"+") LIMIT " + (pageIndex-1)*pageSize + "," + pageSize);

        for (let i = 0; i < querydata.length; i++) {
            let etime = querydata[i].employeeregistrationformWorkTime;// 参加工作时间
            let rq = querydata[i].employeeregistrationformWorkTime //合同开始时间
            const cal = new Calendar(rq);
            cal.add(2, CalendarTypes.YEAR);
            cal.add(-1, CalendarTypes.DAY);

            let etimeyear = parseInt(etime.substring(0, 4));// 参加工作时间 年份
            let etimeyue = parseInt(etime.substring(5, 7));// 参加工作时间 月份

            if (etimeyear == d.getFullYear()) {// 在同一年入职并且离职的人
                query("UPDATE employeeregistrationform SET workseniority = '1',htzzsj = '"+cal.toFormat('yyyy-MM-dd')+"' WHERE employeeregistrationformIDNumber = '" + querydata[i].employeeregistrationformIDNumber + "'");

            } else if (d.getFullYear() - etimeyear == 1) {
                if ((12 - etimeyue) + (d.getMonth() + 1) < 12) {// 去年入职 今年离职但不满12个月的人
                    query("UPDATE employeeregistrationform SET workseniority = '1',htzzsj = '"+cal.toFormat('yyyy-MM-dd')+"' WHERE employeeregistrationformIDNumber = '" + querydata[i].employeeregistrationformIDNumber + "'");

                } else {
                    query("UPDATE employeeregistrationform SET workseniority = '2',htzzsj = '"+cal.toFormat('yyyy-MM-dd')+"' WHERE employeeregistrationformIDNumber = '" + querydata[i].employeeregistrationformIDNumber + "'");

                }
            } else {// 在一年以上入职的人
                if (((12 - etimeyue) + (d.getMonth() + 1)) > 12) {
                    query("UPDATE employeeregistrationform SET workseniority = '" +((d.getFullYear() - etimeyear) + 3) + "',htzzsj = '"+cal.toFormat('yyyy-MM-dd')+"' WHERE employeeregistrationformIDNumber = '" + querydata[i].employeeregistrationformIDNumber + "'");

                } else {
                    query("UPDATE employeeregistrationform SET workseniority = '" + ((d.getFullYear() - etimeyear)+1) + "',htzzsj = '"+cal.toFormat('yyyy-MM-dd')+"' WHERE employeeregistrationformIDNumber = '" + querydata[i].employeeregistrationformIDNumber + "'");

                }
            }

        }
        //总页数
        const pageCount = Math.ceil(querydata.length / pageSize);
        //总数据
        const Total = querydata.length;
        if(querydata.length>0){
            return {state: stat.succeed,data:querydata,page:pageCount, total: Total,sqltbr:sqltbr,sqljbxx:sqljbxx};
        }else{
            return {state: stat.defeated};
        }
    }catch (e) {
        Logger.error("----service  / Filing  /  relation ---------",e)
        return {state: stat.defeated};
    }

}
//(劳务派遣)用人单位劳动关系人员基本情况备案表
export async function relation1(werretrieve,wher,pageIndex,pageSize,area) {
    try {
        if (area==="市区"){
            // 本月 法人代表/编码/开户行/账号/注册资金、职工人数/办公电话
            let sqljbxx = await query("SELECT \n" +
                "approvalformLawPerson,\n"+
                "approvalformBusinessLicenseCode,\n" +
                "approvalformBankOfDeposit,\n" +
                "approvalformBankAccount,\n" +
                "approvalformRegisterMoney,\n"+
                "approvalformCurrentHeadcount,\n"+
                "approvalformSubordinateToTheBlock,\n"+
                "approvalformOfficeTel\n"+
                "FROM `approvalform` WHERE approvalformTradeName = '"+werretrieve+"' AND approvalformSubordinateToTheBlock <>'平定县' AND approvalformSubordinateToTheBlock <>'盂县' ");
            if (sqljbxx.length>0){
                // 填表人
                let sqltbr = await query("SELECT filName FROM filler WHERE filType='备案'");
                let querydata = await query("SELECT e.corporateInformationTradeName,e.employeeregistrationfromPhone,e.employeeregistrationform,e.employeeregistrationformPersentAddress,e.employeeregistrationformNationality,e.employeeregistrationformCategory,e.employeeregistrationformTypeOfWork,e.htzzsj,e.workseniority,e.employeeregistrationformWorkTime,e.employeeregistrationformName,e.employeeregistrationformSex,e.employeeregistrationformIDNumber,e.employeeregistrationformTypeOfWork,r.fixedterm,r.fixedtermtion FROM employeeregistrationform e LEFT JOIN laborcontract r \n" +
                    "ON e.employeeregistrationformFileNumber = r.employeeregistrationformFileNumber\n " +
                    "LEFT JOIN socialsecurityexpense s ON r.employeeregistrationformFileNumber=s.employeeregistrationformFileNumber "+
                    "LEFT JOIN `approvalform` a ON s.corporateInformationTradeName =a.approvalformTradeName\n"+
                    "WHERE e.employe=0 AND e.corporateInformationTradeName \n" +
                    "IN (SELECT corporateInformationTradeName FROM `employeeregistrationform` WHERE  corporateInformationTradeName='"+werretrieve+"' AND s.socialsecurityexpenseDate = '"+wher+"' AND employeeregistrationformWorkTime LIKE '%"+wher+"%'"+") LIMIT " + (pageIndex-1)*pageSize + "," + pageSize);
                for (let i = 0; i < querydata.length; i++) {
                    let etime = querydata[i].employeeregistrationformWorkTime;// 参加工作时间
                    let rq = querydata[i].employeeregistrationformWorkTime //合同开始时间
                    const cal = new Calendar(rq);
                    cal.add(2, CalendarTypes.YEAR);
                    cal.add(-1, CalendarTypes.DAY);

                    let etimeyear = parseInt(etime.substring(0, 4));// 参加工作时间 年份
                    let etimeyue = parseInt(etime.substring(5, 7));// 参加工作时间 月份

                    if (etimeyear == d.getFullYear()) {// 在同一年入职并且离职的人
                        query("UPDATE employeeregistrationform SET workseniority = '1',htzzsj = '"+cal.toFormat('yyyy-MM-dd')+"' WHERE employeeregistrationformIDNumber = '" + querydata[i].employeeregistrationformIDNumber + "'");

                    } else if (d.getFullYear() - etimeyear == 1) {
                        if ((12 - etimeyue) + (d.getMonth() + 1) < 12) {// 去年入职 今年离职但不满12个月的人
                            query("UPDATE employeeregistrationform SET workseniority = '1',htzzsj = '"+cal.toFormat('yyyy-MM-dd')+"' WHERE employeeregistrationformIDNumber = '" + querydata[i].employeeregistrationformIDNumber + "'");

                        } else {
                            query("UPDATE employeeregistrationform SET workseniority = '2',htzzsj = '"+cal.toFormat('yyyy-MM-dd')+"' WHERE employeeregistrationformIDNumber = '" + querydata[i].employeeregistrationformIDNumber + "'");

                        }
                    } else {// 在一年以上入职的人
                        if (((12 - etimeyue) + (d.getMonth() + 1)) > 12) {
                            query("UPDATE employeeregistrationform SET workseniority = '" +((d.getFullYear() - etimeyear) + 3) + "',htzzsj = '"+cal.toFormat('yyyy-MM-dd')+"' WHERE employeeregistrationformIDNumber = '" + querydata[i].employeeregistrationformIDNumber + "'");

                        } else {
                            query("UPDATE employeeregistrationform SET workseniority = '" + ((d.getFullYear() - etimeyear)+1) + "',htzzsj = '"+cal.toFormat('yyyy-MM-dd')+"' WHERE employeeregistrationformIDNumber = '" + querydata[i].employeeregistrationformIDNumber + "'");

                        }
                    }

                }
                //总页数
                const pageCount = Math.ceil(querydata.length / pageSize);
                //总数据
                const Total = querydata.length;
                if(querydata.length>0){
                    return {state: stat.succeed,data:querydata,page:pageCount, total: Total,sqltbr:sqltbr,sqljbxx:sqljbxx};
                }else{
                    return {state: stat.defeated};
                }
            }else{
                return {state: stat.defeated};
            }

        }else {
            return {state: stat.defeated};
        }

    }catch (e) {
        Logger.error("----service  / Filing  /  relation ---------",e)
        return {state: stat.defeated};
    }

}


//用人单位终止或解除劳动合同备案表
export async function liftBa(werretrieve,wher,pageIndex,pageSize) {
    try {

        // 根据公司查询公司编号
        let gsbh = await query("select approvalformMedicareNumber from approvalform \n" +
            "\twhere approvalformTradeName = '"+werretrieve+"' AND approvalformSubordinateToTheBlock ='盂县'");
        let querydata=[];
        if(gsbh.length>0){
            // 填表人
            let sqltbr = await query("SELECT filName FROM filler WHERE filType='备案'");

// 本月 法人代表/编码/开户行/账号/注册资金、职工人数/办公电话
            let sqljbxx = await query("SELECT \n" +
                "approvalformLawPerson,\n"+
                "approvalformBusinessLicenseCode,\n" +
                "approvalformBankOfDeposit,\n" +
                "approvalformBankAccount,\n" +
                "approvalformRegisterMoney,\n"+
                "approvalformCurrentHeadcount,\n"+
                "approvalformOfficeTel\n"+
                "FROM `approvalform` WHERE approvalformTradeName = '"+werretrieve+"'");
            querydata = await query("SELECT e.htzzsj,e.employeeregistrationformNativePlace,e.employeeregistrationformTypeOfWork,e.employeeregistrationformWorkTime,e.employeeregistrationformName,e.employeeregistrationformSex,e.employeeregistrationformIDNumber,e.workseniority,r.fixedterm,r.fixedtermtion,c.certificatelaborcontractTerminationTime,c.certificatelaborcontractContractPeriodStop,c.certificatelaborcontractContractPeriodRise FROM employeeregistrationform e LEFT JOIN laborcontract r\n" +
                "ON e.employeeregistrationformFileNumber = r.employeeregistrationformFileNumber \n" +
                "LEFT JOIN  `certificatelaborcontract` c\n" +
                "ON e.employeeregistrationformFileNumber = c.employeeregistrationformFileNumber\n" +
                "WHERE  e.employe=1 AND c.certificatelaborcontractTerminationTime LIKE '%"+wher+"%' AND e.corporateInformationTradeName='"+werretrieve+"' and e.corporateInformationTradeName IN ( SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber = '"+gsbh[0].approvalformMedicareNumber+"')" +
                "LIMIT " + (pageIndex - 1) * pageSize + "," + pageSize);
            //总页数
            const pageCount = Math.ceil(querydata.length / pageSize);
            //总数据
            const Total = querydata.length;
            //计算工作年限（月份）
            let nxy;
            //把月份放到数组内
            let yf = [];
            if(querydata.length>=1){
                for (let i = 0;i<=querydata.length-1;i++){
                    let rq = querydata[i].employeeregistrationformWorkTime //合同开始时间
                    const cal = new Calendar(rq);
                    cal.add(2, CalendarTypes.YEAR);
                    cal.add(-1, CalendarTypes.DAY);
                    //参加日期
                    let etime = querydata[i].employeeregistrationformWorkTime;// 参加工作时间


                    let etimeyear = parseInt(etime.substring(0, 4));// 参加工作时间 年份
                    let etimeyue = parseInt(etime.substring(5, 7));// 参加工作时间 月份

                    if (etimeyear == d.getFullYear()) {// 在同一年入职并且离职的人
                        query("UPDATE employeeregistrationform SET workseniority = '1',htzzsj = '"+cal.toFormat('yyyy-MM-dd')+"' WHERE employeeregistrationformIDNumber = '" + querydata[i].employeeregistrationformIDNumber + "'");


                    } else if (d.getFullYear() - etimeyear == 1) {
                        if ((12 - etimeyue) + (d.getMonth() + 1) < 12) {// 去年入职 今年离职但不满12个月的人
                            query("UPDATE employeeregistrationform SET workseniority = '1',htzzsj = '"+cal.toFormat('yyyy-MM-dd')+"' WHERE employeeregistrationformIDNumber = '" + querydata[i].employeeregistrationformIDNumber + "'");

                        } else {
                            query("UPDATE employeeregistrationform SET workseniority = '2',htzzsj = '"+cal.toFormat('yyyy-MM-dd')+"' WHERE employeeregistrationformIDNumber = '" + querydata[i].employeeregistrationformIDNumber + "'");

                        }
                    } else {// 在一年以上入职的人
                        if (((12 - etimeyue) + (d.getMonth() + 1)) > 12) {
                            query("UPDATE employeeregistrationform SET workseniority = '" +((d.getFullYear() - etimeyear) + 3) + "',htzzsj = '"+cal.toFormat('yyyy-MM-dd')+"' WHERE employeeregistrationformIDNumber = '" + querydata[i].employeeregistrationformIDNumber + "'");

                        } else {
                            query("UPDATE employeeregistrationform SET workseniority = '" + ((d.getFullYear() - etimeyear)+1) + "',htzzsj = '"+cal.toFormat('yyyy-MM-dd')+"' WHERE employeeregistrationformIDNumber = '" + querydata[i].employeeregistrationformIDNumber + "'");

                        }
                    }
                }
            }
            if(querydata.length>0){
                return {state: stat.succeed,data:querydata,page:pageCount, total: Total, yf:yf,sqltbr:sqltbr,sqljbxx:sqljbxx};
            }else{
                return {state: stat.defeated};
            }


        }else{
            return {state: stat.defeated};
        }


    }catch (e) {
        Logger.error("----service  / Filing  /  liftBa ---------",e)
        return {state: stat.defeated};
    }

}
//用人单位终止或解除劳动合同备案表 市区
export async function liftBa1(werretrieve,wher,pageIndex,pageSize,area) {
    try {
        if(area==="市区"){
            // 根据公司查询公司编号
            let gsbh = await query("select approvalformMedicareNumber from approvalform \n" +
                "\twhere approvalformTradeName = '"+werretrieve+"'  AND approvalformSubordinateToTheBlock <>'平定县' AND approvalformSubordinateToTheBlock <>'盂县'");
            let querydata=[];
            if(gsbh.length>0){
                // 填表人
                let sqltbr = await query("SELECT filName FROM filler WHERE filType='备案'");

// 本月 法人代表/编码/开户行/账号/注册资金、职工人数/办公电话
                let sqljbxx = await query("SELECT \n" +
                    "approvalformLawPerson,\n"+
                    "approvalformBusinessLicenseCode,\n" +
                    "approvalformBankOfDeposit,\n" +
                    "approvalformBankAccount,\n" +
                    "approvalformRegisterMoney,\n"+
                    "approvalformCurrentHeadcount,\n"+
                    "approvalformOfficeTel\n"+
                    "FROM `approvalform` WHERE approvalformTradeName = '"+werretrieve+"'");
                querydata = await query("SELECT e.htzzsj,e.employeeregistrationformNativePlace,e.employeeregistrationformTypeOfWork,e.employeeregistrationformWorkTime,e.employeeregistrationformName,e.employeeregistrationformSex,e.employeeregistrationformIDNumber,e.workseniority,r.fixedterm,r.fixedtermtion,c.certificatelaborcontractReasonTermination,c.certificatelaborcontractTerminationTime,c.certificatelaborcontractContractPeriodStop,c.certificatelaborcontractContractPeriodRise FROM employeeregistrationform e LEFT JOIN laborcontract r\n" +
                    "ON e.employeeregistrationformFileNumber = r.employeeregistrationformFileNumber \n" +
                    "LEFT JOIN  `certificatelaborcontract` c\n" +
                    "ON e.employeeregistrationformFileNumber = c.employeeregistrationformFileNumber\n" +
                    "WHERE  e.employe=1 AND c.certificatelaborcontractTerminationTime LIKE '%"+wher+"%' AND e.corporateInformationTradeName='"+werretrieve+"' and e.corporateInformationTradeName IN ( SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber = '"+gsbh[0].approvalformMedicareNumber+"')" +
                    "LIMIT " + (pageIndex - 1) * pageSize + "," + pageSize);
                //总页数
                const pageCount = Math.ceil(querydata.length / pageSize);
                //总数据
                const Total = querydata.length;
                //计算工作年限（月份）
                let nxy;
                //把月份放到数组内
                let yf = [];
                if(querydata.length>=1){
                    for (let i = 0;i<=querydata.length-1;i++){
                        let rq = querydata[i].employeeregistrationformWorkTime //合同开始时间
                        const cal = new Calendar(rq);
                        cal.add(2, CalendarTypes.YEAR);
                        cal.add(-1, CalendarTypes.DAY);
                        //参加日期
                        let etime = querydata[i].employeeregistrationformWorkTime;// 参加工作时间


                        let etimeyear = parseInt(etime.substring(0, 4));// 参加工作时间 年份
                        let etimeyue = parseInt(etime.substring(5, 7));// 参加工作时间 月份

                        if (etimeyear == d.getFullYear()) {// 在同一年入职并且离职的人
                            query("UPDATE employeeregistrationform SET workseniority = '1',htzzsj = '"+cal.toFormat('yyyy-MM-dd')+"' WHERE employeeregistrationformIDNumber = '" + querydata[i].employeeregistrationformIDNumber + "'");


                        } else if (d.getFullYear() - etimeyear == 1) {
                            if ((12 - etimeyue) + (d.getMonth() + 1) < 12) {// 去年入职 今年离职但不满12个月的人
                                query("UPDATE employeeregistrationform SET workseniority = '1',htzzsj = '"+cal.toFormat('yyyy-MM-dd')+"' WHERE employeeregistrationformIDNumber = '" + querydata[i].employeeregistrationformIDNumber + "'");

                            } else {
                                query("UPDATE employeeregistrationform SET workseniority = '2',htzzsj = '"+cal.toFormat('yyyy-MM-dd')+"' WHERE employeeregistrationformIDNumber = '" + querydata[i].employeeregistrationformIDNumber + "'");

                            }
                        } else {// 在一年以上入职的人
                            if (((12 - etimeyue) + (d.getMonth() + 1)) > 12) {
                                query("UPDATE employeeregistrationform SET workseniority = '" +((d.getFullYear() - etimeyear) + 3) + "',htzzsj = '"+cal.toFormat('yyyy-MM-dd')+"' WHERE employeeregistrationformIDNumber = '" + querydata[i].employeeregistrationformIDNumber + "'");

                            } else {
                                query("UPDATE employeeregistrationform SET workseniority = '" + ((d.getFullYear() - etimeyear)+1) + "',htzzsj = '"+cal.toFormat('yyyy-MM-dd')+"' WHERE employeeregistrationformIDNumber = '" + querydata[i].employeeregistrationformIDNumber + "'");

                            }
                        }
                    }
                }
                if(querydata.length>0){
                    return {state: stat.succeed,data:querydata,page:pageCount, total: Total, yf:yf,sqltbr:sqltbr,sqljbxx:sqljbxx};
                }else{
                    return {state: stat.defeated};
                }


            }else{
                return {state: stat.defeated};
            }
        }else{
            return {state: stat.defeated};
        }



    }catch (e) {
        Logger.error("----service  / Filing  /  liftBa ---------",e)
        return {state: stat.defeated};
    }

}

//用人单位劳动用工基本情况备案表
export async function empba(werretrieve,where) {
    try { // 填表人
        let sqltbr = await query("SELECT filName\n" +
            "FROM filler\n" +
            "WHERE filType = '备案' ");
        // 根据公司查询公司编号
        let gsbh = await query("select approvalformMedicareNumber from approvalform \n" +
            "\twhere approvalformTradeName = '"+werretrieve+"' AND approvalformSubordinateToTheBlock ='盂县'");
        if(gsbh.length>0){
            //数据
            let dxssj = await query("SELECT corporateInformationTradeName,corporateInformationBusinessLicenseCode,corporateInformationBusinessAddress,corporateInformationLawPerson," +
                "corporateInformationRegisteredAddress,\n" +
                "corporateInformationBusinessAddress,SocialSecurity FROM " +
                "corporateinformation WHERE corporateInformationTradeName ='"+werretrieve+"' and corporateInformationTradeName IN ( SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber = '"+gsbh[0].approvalformMedicareNumber+"')");
            if (dxssj.length>=1){
                //男女总数
                let nuzs= await query("SELECT partyBIdcar FROM `laborcontract` WHERE PartyName = " +
                    "'"+werretrieve+"' and fixedterm='"+where+"' and PartyName IN ( SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber = '"+gsbh[0].approvalformMedicareNumber+"')")
                //养老保险人数
                let oldagein =await query(" SELECT COUNT(*) as 'oldagein' FROM oldageinsurance WHERE corporateInformationTradeName=" +
                    "'"+werretrieve+"'\n"+" AND oldageinsuranceToDate='"+where+"' and corporateInformationTradeName IN ( SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber = '"+gsbh[0].approvalformMedicareNumber+"')")
                //医疗保险人数
                let medicalinsurance=await query(" SELECT COUNT(*) as'medicalinsurance' FROM medicalinsurance WHERE corporateInformationTradeName=" +
                    "'"+werretrieve+"'\n"+" AND BasicMedicalToDate='"+where+"' and corporateInformationTradeName IN ( SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber = '"+gsbh[0].approvalformMedicareNumber+"')")
                //工伤保险人数
                let EIIUnit=await query(" SELECT COUNT(*) as 'EIIUnit' FROM medicalinsurance WHERE corporateInformationTradeName=" +
                    "'"+werretrieve+"'\n"+" AND EIIToDate='"+where+"' and corporateInformationTradeName IN ( SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber = '"+gsbh[0].approvalformMedicareNumber+"')")
                //失业保险人数
                let unemploymentinsurance=await query(" SELECT COUNT(*) as 'unemploymentinsurance' FROM unemploymentinsurance WHERE corporateInformationTradeName=" +
                    "'"+werretrieve+"'\n"+" AND unemploymentinsuranceToDate='"+where+"' and corporateInformationTradeName IN ( SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber = '"+gsbh[0].approvalformMedicareNumber+"')")
                let nan=0;
                let nv=0;
                for (let i = 0; i<nuzs.length; i++){
                    if(nuzs[i].partyBIdcar.substring(16,17)%2==0){
                        nv +=1;
                    }else{
                        nan+=1;
                    }
                }
                if ( nuzs.length>0||oldagein>0||medicalinsurance>0||EIIUnit>0||unemploymentinsurance>0) {
                    return {state: stat.succeed, data: dxssj, sqltbr: sqltbr, nan:nan,nv:nv,oldagein:oldagein,medicalinsurance:medicalinsurance,EIIUnit:EIIUnit,unemploymentinsurance:unemploymentinsurance};
                } else {
                    return {state: stat.defeated};
                }
            } else {
                return {state: stat.defeated};
            }

        } else {
            return {state: stat.defeated};
        }
    } catch (e) {
        Logger.error("----service  / newreport  /  yrdwlwyg ---------", e)
        return {state: stat.defeated};
    }

}

var d = new Date();

//盂县人力资源和社会保障局劳动合同备案表
export async function yxbahm(werretrieve, wher, pageIndex, pageSize) {
    try {

        // 工作年限
        let workSeniority = [];
        let jk = {};
        // 填表人
        let sqltbr = await query("SELECT filName FROM filler WHERE filType='备案(平定，盂县)'");

        // 本月 法人代表/编码/开户行/账号/注册资金、职工人数/办公电话
        let sqljbxx = await query("SELECT \n" +
            "approvalformLawPerson,\n" +
            "approvalformBusinessLicenseCode,\n" +
            "approvalformBankOfDeposit,\n" +
            "approvalformBankAccount,\n" +
            "approvalformRegisterMoney,\n" +
            "approvalformCurrentHeadcount,\n" +
            "approvalformOfficeTel\n" +
            "FROM `approvalform` WHERE approvalformTradeName = '" + werretrieve + "'AND approvalformSubordinateToTheBlock ='盂县'");

        // 根据公司查询公司编号
        let gsbh = await query("select approvalformMedicareNumber from approvalform \n" +
            "\twhere approvalformTradeName = '"+werretrieve+"' AND approvalformSubordinateToTheBlock ='盂县'");
        // 查询 姓名/性别/工种职务/合同开始时间/身份证号/籍贯
        let selldht=[];
        if (gsbh.length>0){
            selldht = await query("SELECT \n" +
                "e.employeeregistrationformName AS 'employeeregistrationformName',\n" +// 姓名
                "e.employeeregistrationformSex AS 'employeeregistrationformSex',\n" +// 性别
                "e.employeeregistrationformTypeOfWork AS 'employeeregistrationformTypeOfWork',\n" +// 工种职务
                "l.fixedterm AS 'fixedterm',\n" +// 合同开始时间
                "l.fixedtermtion AS 'fixedtermtion',\n" +// 合同终止时间
                "e.employeeregistrationformIDNumber AS 'employeeregistrationformIDNumber',\n" +// 身份证号
                "e.employeeregistrationformPlaceOfDomicile AS 'employeeregistrationformPlaceOfDomicile',\n" +// 籍贯
                "e.employeeregistrationformWorkTime AS 'employeeregistrationformWorkTime',\n" +// 参加工作时间
                "e.workseniority as 'workseniority',e.htzzsj as 'htzzsj',\n" +// 工作年限
                "e.employe AS 'employe'\n" +// 是否在职 0在职 1离职
                "FROM `employeeregistrationform` e \n" +
                "LEFT JOIN `laborcontract` l\n" +
                "ON e.employeeregistrationformIDNumber = l.PartyBIdcar " +
                "LEFT JOIN socialsecurityexpense s ON l.PartyBIdcar=s.employeeregistrationformIDNumber "+
                "LEFT JOIN `approvalform` a ON s.corporateInformationTradeName =a.approvalformTradeName\n"+
                "WHERE a.approvalformSubordinateToTheBlock ='盂县' AND  e.employeeregistrationformWorkTime LIKE'" + wher + "%' AND s.socialsecurityexpenseDate = '"+wher+"' AND  e.employe=0 and e.corporateInformationTradeName IN ( SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber = '"+gsbh[0].approvalformMedicareNumber+"' )  \n" +
                "LIMIT " + (pageIndex - 1) * pageSize + "," + pageSize);
            if (sqljbxx.length>=1&&selldht.length>=1){
                for (let i = 0; i < selldht.length; i++) {
                    if (selldht[i].employe == 0) {// 在职人员
                        let etime = selldht[i].employeeregistrationformWorkTime;// 参加工作时间
                        let rq = selldht[i].employeeregistrationformWorkTime //合同开始时间
                        const cal = new Calendar(rq);
                        cal.add(2, CalendarTypes.YEAR);
                        cal.add(-1, CalendarTypes.DAY);

                        let etimeyear = parseInt(etime.substring(0, 4));// 参加工作时间 年份
                        let etimeyue = parseInt(etime.substring(5, 7));// 参加工作时间 月份

                        if (etimeyear == d.getFullYear()) {// 在同一年入职并且离职的人
                            query("UPDATE employeeregistrationform SET workseniority = '1',htzzsj = " +
                                "'"+cal.toFormat('yyyy-MM-dd')+"' WHERE employeeregistrationformIDNumber = '" + selldht[i].employeeregistrationformIDNumber + "'");

                        } else if (d.getFullYear() - etimeyear == 1) {
                            if ((12 - etimeyue) + (d.getMonth() + 1) < 12) {// 去年入职 今年离职但不满12个月的人
                                query("UPDATE employeeregistrationform SET workseniority = '1',htzzsj = " +
                                    "'"+cal.toFormat('yyyy-MM-dd')+"' WHERE employeeregistrationformIDNumber = '" + selldht[i].employeeregistrationformIDNumber + "'");

                            } else {
                                query("UPDATE employeeregistrationform SET workseniority = '2',htzzsj = " +
                                    "'"+cal.toFormat('yyyy-MM-dd')+"' WHERE employeeregistrationformIDNumber = '" + selldht[i].employeeregistrationformIDNumber + "'");

                            }
                        } else {// 在一年以上入职的人
                            if (((12 - etimeyue) + (d.getMonth() + 1)) > 12) {
                                query("UPDATE employeeregistrationform SET workseniority = " +
                                    "'" +((d.getFullYear() - etimeyear) + 3) + "',htzzsj = '"+cal.toFormat('yyyy-MM-dd')+"' WHERE employeeregistrationformIDNumber = '" + selldht[i].employeeregistrationformIDNumber + "'");

                            } else {
                                query("UPDATE employeeregistrationform SET workseniority = " +
                                    "'" + ((d.getFullYear() - etimeyear)+1) + "',htzzsj = '"+cal.toFormat('yyyy-MM-dd')+"' WHERE employeeregistrationformIDNumber = '" + selldht[i].employeeregistrationformIDNumber + "'");

                            }
                        }
                    }
                }
                return {
                    state: stat.succeed,
                    data: selldht,
                    sqljbxx: sqljbxx,
                    sqltbr: sqltbr,
                    workSeniority: workSeniority,
                    jk: jk
                };

            }else{
                return {state: stat.defeated}
            }
        }else{
            return {state: stat.defeated}
        }
    } catch (e) {
        Logger.error("----service  / Filing  /  yxbahm ---------", e);
        return {state: stat.defeated};
    }

}