// 报表查询
import stat from "../util/state";
import {getConnection} from "typeorm";
import log4js from "../util/logs";
import {query} from "../dao/stopped";
import {employeeregistrationform} from "../entity/employeeregistrationform";
import {renewchangelaborcontract} from "../entity/renewchangelaborcontract";

const Logger = log4js.getLogger('error');

const {
    Calendar,
    CalendarTypes
} = require('calendar2');

//工伤保险费人员增减变动
export async function selGshangzj(werretrieve, wher, pageIndex, pageSize, area,decrease) {
    try {
        //获取上月时间
        let rq = wher
        const cal = new Calendar(rq);
        cal.add(-1, CalendarTypes.MONTH)
        let sangyu = cal.toFormat('yyyy-MM')
        if(area==="市区"){
            // 根据公司查询公司编号
            let gsbh = await query("select approvalformMedicareNumber from approvalform \n" +
                "\twhere approvalformTradeName = '" + werretrieve + "'AND approvalformSubordinateToTheBlock <>'平定县' AND approvalformSubordinateToTheBlock <>'盂县' ");
            if (gsbh.length > 0) {
                // 填表人
                let sqltbr = await query("SELECT filName\n" +
                    "FROM filler\n" +
                    "WHERE filType = '工伤(市区，城区，矿区,郊区)' ");
// 本月 法人代表/编码/开户行/账号/注册资金、职工人数/办公电话
                let sqljbxx = await query("SELECT \n" +
                    "approvalformLawPerson,\n" +
                    "approvalformBusinessLicenseCode,\n" +
                    "approvalformBankOfDeposit,\n" +
                    "approvalformBankAccount,\n" +
                    "approvalformRegisterMoney,\n" +
                    "approvalformCurrentHeadcount,\n" +
                    "approvalformOfficeTel\n" +
                    "FROM `approvalform` WHERE approvalformTradeName = '" + werretrieve + "'");
                if (sqltbr.length > 0 && sqljbxx.length > 0) {
                    if(decrease==="增加"){
                        //增加
                        let querydata = await query("SELECT DISTINCT " +
                            "s.socialsecurityexpenseICIBAdjustment," +//缴费工资
                            "e.employeeregistrationformIDNumber," +//身份证号
                            "e.employeeregistrationformName," +//姓名
                            "e.employeeregistrationformSex," +//性别
                            "e.employeeregistrationformNationality," +//民族
                            "e.employeeregistrationformDateOfBirth,\n" +//出生年月
                            "e.employeeregistrationformWorkTime," +//参加工作时间
                            "e.employeeregistrationfromPhone," +//电话
                            "e.employeeregistrationformCategory," +//户口性质
                            "e.employeeregistrationformEmploymentForm," +//用工形式
                            "e.employeeregistrationformRemarks\n" +//原因
                            "FROM employeeregistrationform e\n" +
                            "LEFT JOIN socialsecurityexpense s ON e.employeeregistrationformIDNumber=s.employeeregistrationformIDNumber\n" +
                            "LEFT JOIN medicalinsurance m ON s.employeeregistrationformIDNumber=m.employeeregistrationformIDNumber\n" +
                            "WHERE m.EIIToDate LIKE '"+wher+"%' OR m.EIITgoDate LIKE '"+wher+"%' AND e.corporateInformationTradeName IN (SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber = '" + gsbh[0].approvalformMedicareNumber + "')  GROUP BY e.employeeregistrationformId LIMIT " + (pageIndex - 1) * pageSize + "," + pageSize)
                        //总页数
                        const pageCount = Math.ceil(querydata.length / pageSize);
                        //总数据
                        const Total = querydata.length;
                        // ();
                        if (querydata.length > 0) {
                            return {
                                state: stat.succeed,
                                data: querydata,
                                page: pageCount,
                                total: Total,
                                sqltbr: sqltbr,
                                sqljbxx: sqljbxx
                            };
                        } else {
                            return {state: stat.defeated};
                        }
                    }else if(decrease==="减少"){
                        //减少
                        let querye = await query("SELECT DISTINCT s.socialsecurityexpenseICIBAdjustment, \n" +
                            "c.certificatelaborcontractName as'employeeregistrationformName',\n" +
                            "c.employeeregistrationformIDNumber as'employeeregistrationformIDNumber',\n" +
                            "c.certificatelaborcontractSex as 'employeeregistrationformSex',\n" +
                            "e.employeeregistrationformWorkTime,\n" +
                            "c.certificatelaborcontractReasonTermination ,\n" +
                            "e.employeeregistrationformWorkTime as 'employeeregistrationformRemarks',\n" +
                            "e.employeeregistrationformNationality,\n" +
                            "e.employeeregistrationformDateOfBirth,\n" +
                            "e.employeeregistrationfromPhone," +
                            "e.employeeregistrationformCategory,\n" +
                            "e.employeeregistrationformEmploymentForm\n" +
                            "FROM certificatelaborcontract c \n" +
                            "LEFT JOIN socialsecurityexpense s ON c.employeeregistrationformIDNumber=s.employeeregistrationformIDNumber\n" +
                            "LEFT JOIN employeeregistrationform e ON s.employeeregistrationformIDNumber=e.employeeregistrationformIDNumber\n" +
                            "WHERE c.certificatelaborcontractTerminationTime LIKE '"+wher+"%' AND s.socialsecurityexpenseDate='"+sangyu+"' AND c.corporateInformationTradeName IN (SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber = '" + gsbh[0].approvalformMedicareNumber + "')  GROUP BY e.employeeregistrationformId LIMIT " + (pageIndex - 1) * pageSize + "," + pageSize)

                        //总页数
                        const pageCount = Math.ceil(querye.length / pageSize);
                        //总数据
                        const Total = querye.length;
                        // ();
                        if (querye.length > 0) {
                            return {
                                state: stat.succeed,
                                data: querye,
                                page: pageCount,
                                total: Total,
                                sqltbr: sqltbr,
                                sqljbxx: sqljbxx
                            };
                        } else {
                            return {state: stat.defeated};
                        }
                    }
                } else {
                    return {state: stat.defeated};
                }

            } else {
                return {state: stat.defeated};
            }
        }else{
            // 根据公司查询公司编号
            let gsbh = await query("select approvalformMedicareNumber from approvalform \n" +
                "\twhere approvalformTradeName = '" + werretrieve + "'AND approvalformSubordinateToTheBlock ='" + area + "'");
            if (gsbh.length > 0) {
                // 填表人
                let sqltbr = await query("SELECT filName\n" +
                    "FROM filler\n" +
                    "WHERE filType = '工伤(市区，城区，矿区,郊区)' ");
// 本月 法人代表/编码/开户行/账号/注册资金、职工人数/办公电话
                let sqljbxx = await query("SELECT \n" +
                    "approvalformLawPerson,\n" +
                    "approvalformBusinessLicenseCode,\n" +
                    "approvalformBankOfDeposit,\n" +
                    "approvalformBankAccount,\n" +
                    "approvalformRegisterMoney,\n" +
                    "approvalformCurrentHeadcount,\n" +
                    "approvalformOfficeTel\n" +
                    "FROM `approvalform` WHERE approvalformTradeName = '" + werretrieve + "'");
                if (sqltbr.length > 0 && sqljbxx.length > 0) {
                    if(decrease==="增加"){
                        //增加
                        let querydata = await query("SELECT DISTINCT s.socialsecurityexpenseICIBAdjustment,e.employeeregistrationformIDNumber,e.employeeregistrationformName,e.employeeregistrationformSex,e.employeeregistrationformNationality,e.employeeregistrationformDateOfBirth,\n" +
                            "e.employeeregistrationformWorkTime,e.employeeregistrationfromPhone,e.employeeregistrationformCategory,e.employeeregistrationformEmploymentForm,e.employeeregistrationformRemarks\n" +
                            "FROM employeeregistrationform e\n" +
                            "LEFT JOIN socialsecurityexpense s ON e.employeeregistrationformIDNumber=s.employeeregistrationformIDNumber\n" +
                            "LEFT JOIN medicalinsurance m ON s.employeeregistrationformIDNumber=m.employeeregistrationformIDNumber\n" +
                            "WHERE e.corporateInformationTradeName IN (SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber = '" + gsbh[0].approvalformMedicareNumber + "') AND m.EIIToDate LIKE '"+wher+"%' OR m.EIITgoDate LIKE '"+wher+"%' GROUP BY e.employeeregistrationformId LIMIT " + (pageIndex - 1) * pageSize + "," + pageSize)
                        //总页数
                        const pageCount = Math.ceil(querydata.length / pageSize);
                        //总数据
                        const Total = querydata.length;
                        // ();
                        if (querydata.length > 0) {
                            return {
                                state: stat.succeed,
                                data: querydata,
                                page: pageCount,
                                total: Total,
                                sqltbr: sqltbr,
                                sqljbxx: sqljbxx
                            };
                        } else {
                            return {state: stat.defeated};
                        }
                    }else if(decrease==="减少"){
                        //减少
                        let querye = await query("SELECT DISTINCT s.socialsecurityexpenseICIBAdjustment, \n" +
                            "c.certificatelaborcontractName as'employeeregistrationformName',\n" +
                            "c.employeeregistrationformIDNumber as'employeeregistrationformIDNumber',\n" +
                            "c.certificatelaborcontractSex as 'employeeregistrationformSex',\n" +
                            "e.employeeregistrationformWorkTime,\n" +
                            "c.certificatelaborcontractReasonTermination ,\n" +
                            "e.employeeregistrationformWorkTime as 'employeeregistrationformRemarks',\n" +
                            "e.employeeregistrationformNationality,\n" +
                            "e.employeeregistrationformDateOfBirth,\n" +
                            "e.employeeregistrationfromPhone," +
                            "e.employeeregistrationformCategory,\n" +
                            "e.employeeregistrationformEmploymentForm\n" +
                            "FROM certificatelaborcontract c \n" +
                            "LEFT JOIN socialsecurityexpense s ON c.employeeregistrationformIDNumber=s.employeeregistrationformIDNumber\n" +
                            "LEFT JOIN employeeregistrationform e ON s.employeeregistrationformIDNumber=e.employeeregistrationformIDNumber\n" +
                            "WHERE c.certificatelaborcontractTerminationTime LIKE '"+wher+"%' AND s.socialsecurityexpenseDate='"+sangyu+"' AND c.corporateInformationTradeName IN (SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber = '" + gsbh[0].approvalformMedicareNumber + "')  GROUP BY e.employeeregistrationformId LIMIT " + (pageIndex - 1) * pageSize + "," + pageSize)
                        //总页数
                        const pageCount = Math.ceil(querye.length / pageSize);
                        //总数据
                        const Total = querye.length;
                        if (querye.length > 0) {
                            return {
                                state: stat.succeed,
                                data: querye,
                                page: pageCount,
                                total: Total,
                                sqltbr: sqltbr,
                                sqljbxx: sqljbxx
                            };
                        } else {
                            return {state: stat.defeated};
                        }
                    }
                } else {
                    return {state: stat.defeated};
                }
            } else {
                return {state: stat.defeated};
            }
        }
    } catch (e) {
        Logger.error("----service  / lnjury  /  selGshangzj ---------", e)
        return {state: stat.defeated};
    }
}
//工伤保险费人员增减变动
export async function selyqgssbb(werretrieve, wher, area) {
    try {
        //获取上月时间
        let rq = wher
        const cal = new Calendar(rq);
        cal.add(-1, CalendarTypes.MONTH)
        let sangyu = cal.toFormat('yyyy-MM')
        if(area==="市区"){
            // 根据公司查询公司编号
            let gsbh = await query("select approvalformMedicareNumber from approvalform \n" +
                "\twhere approvalformTradeName = '" + werretrieve + "'AND approvalformSubordinateToTheBlock <>'平定县' AND approvalformSubordinateToTheBlock <>'盂县'");
            if (gsbh.length > 0) {
                // 填表人
                let sqltbr = await query("SELECT filName\n" +
                    "FROM filler\n" +
                    "WHERE filType = '工伤(市区，城区，矿区,郊区)' ");

// 本月 法人代表/编码/开户行/账号/注册资金、职工人数/办公电话
                let sqljbxx = await query("SELECT \n" +
                    "approvalformLawPerson,\n" +
                    "approvalformBusinessLicenseCode,\n" +
                    "approvalformBankOfDeposit,\n" +
                    "approvalformBankAccount,\n" +
                    "approvalformRegisterMoney,\n" +
                    "approvalformCurrentHeadcount,\n" +
                    "approvalformOfficeTel\n" +
                    "FROM `approvalform` WHERE approvalformTradeName = '" + werretrieve + "'");
                if (sqltbr.length > 0 && sqljbxx.length > 0) {
                    //本月的缴费基数,金额
                    let benyue = await query("select socialsecurityexpenseMICBase,socialsecurityexpenseAPIIIIUnit " +
                        "from socialsecuritydetail where corporateInformationTradeName ='" + werretrieve + "' AND socialsecurityexpenseDate='" + wher + "' and corporateInformationTradeName IN ( SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber = '" + gsbh[0].approvalformMedicareNumber + "') ")

                    // 本月 单位缴费比例
                    let dwgrjf = await query("select socialsecurityexpensePICIUnits from socialsecurityexpense where corporateInformationTradeName" +
                        "= '" + werretrieve + "' AND socialsecurityexpenseDate = '" + wher + "'");

                    //上月的缴费基数,金额
                    let shangyue = await query("select socialsecurityexpenseMICBase,socialsecurityexpenseAPIIIIUnit " +
                        "from socialsecuritydetail where corporateInformationTradeName ='" + werretrieve + "' AND socialsecurityexpenseDate='" + sangyu + "' and corporateInformationTradeName IN ( SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber = '" + gsbh[0].approvalformMedicareNumber + "') ")

                    // 上月单位缴费比例
                    let sydwgrjf = await query("select socialsecurityexpensePICIUnits from socialsecurityexpense where corporateInformationTradeName" +
                        "= '" + werretrieve + "' AND socialsecurityexpenseDate = '" + sangyu + "'");
                    //上月的职工人数
                    let shangpepo = await query("SELECT DISTINCT COUNT(*) as'shangpepo' FROM socialsecurityexpense WHERE socialsecurityexpenseDate=" +
                        "'"+sangyu+"' AND corporateInformationTradeName IN (SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber = '" + gsbh[0].approvalformMedicareNumber + "')")
                    //本月人数
                    let benpeop = await query("SELECT DISTINCT COUNT(*) as 'benpeop' FROM socialsecurityexpense WHERE socialsecurityexpenseDate=" +
                        "'"+wher+"' AND corporateInformationTradeName IN (SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber = '" + gsbh[0].approvalformMedicareNumber + "')")

                    //增加 基数，金额
                    let jishuzj = await query("SELECT DISTINCT s.socialsecurityexpenseICIBAdjustment,s.socialsecurityexpenseAPIIIIUnit FROM employeeregistrationform e\n" +
                        "LEFT JOIN socialsecurityexpense s  ON s.employeeregistrationformIDNumber=e.employeeregistrationformIDNumber\n" +
                        "LEFT JOIN medicalinsurance m ON s.employeeregistrationformIDNumber=m.employeeregistrationformIDNumber\n" +
                        "WHERE e.corporateInformationTradeName IN (SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber = '" + gsbh[0].approvalformMedicareNumber + "')  AND m.EIIToDate LIKE '" + wher + "%' OR m.EIITgoDate LIKE '" + wher + "%'")
                    //减少 基数，金额
                    let jishujs= await query("SELECT DISTINCT s.employeeregistrationformName, s.socialsecurityexpenseICIBAdjustment,s.socialsecurityexpenseAPIIIIUnit FROM socialsecurityexpense s\n" +
                        "LEFT JOIN certificatelaborcontract c ON s.employeeregistrationformIDNumber=c.employeeregistrationformIDNumber\n" +
                        "WHERE c.certificatelaborcontractTerminationTime LIKE '" + wher + "%' AND s.socialsecurityexpenseDate='"+sangyu+"' AND c.corporateInformationTradeName IN (SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber = '" + gsbh[0].approvalformMedicareNumber + "')\n")
                    //职工的增加
                    let zgzj = (jishuzj.length)
                    //职工减少
                    let zgjs = (jishujs.length)
                    if (benyue.length > 0) {
                        return {
                            state: stat.succeed,
                            data: sqltbr,//填表人
                            sqljbxx: sqljbxx,//公司信息
                            benyue: benyue,//本月的基数，金额
                            dwgrjf: dwgrjf,//本月个人和单位比例
                            jishuzj: jishuzj,//增加的 基数和金额
                            jishujs:jishujs,//减少的 基数和金额
                            shangyue: shangyue,//上月的基数，金额
                            sydwgrjf: sydwgrjf,// 上月个人缴费比例 单位缴费比例
                            zgzj: zgzj,//职工的增加
                            zgjs: zgjs,//职工减少
                            shangpepo: shangpepo,//上月人数
                            benpeop: benpeop//本月人数
                        };
                    } else {
                        return {state: stat.defeated};
                    }

                } else {
                    return {state: stat.defeated};
                }
            } else {
                return {state: stat.defeated};
            }
        }else {
            // 根据公司查询公司编号
            let gsbh = await query("select approvalformMedicareNumber from approvalform \n" +
                "\twhere approvalformTradeName = '" + werretrieve + "'AND approvalformSubordinateToTheBlock ='" + area + "'");
            if (gsbh.length > 0) {
                // 填表人
                let sqltbr = await query("SELECT filName\n" +
                    "FROM filler\n" +
                    "WHERE filType = '工伤(市区，城区，矿区,郊区)' ");

// 本月 法人代表/编码/开户行/账号/注册资金、职工人数/办公电话
                let sqljbxx = await query("SELECT \n" +
                    "approvalformLawPerson,\n" +
                    "approvalformBusinessLicenseCode,\n" +
                    "approvalformBankOfDeposit,\n" +
                    "approvalformBankAccount,\n" +
                    "approvalformRegisterMoney,\n" +
                    "approvalformCurrentHeadcount,\n" +
                    "approvalformOfficeTel\n" +
                    "FROM `approvalform` WHERE approvalformTradeName = '" + werretrieve + "'");
                if (sqltbr.length > 0 && sqljbxx.length > 0) {
                //本月的缴费基数,金额
                let benyue = await query("select socialsecurityexpenseMICBase,socialsecurityexpenseAPIIIIUnit " +
                    "from socialsecuritydetail where corporateInformationTradeName ='" + werretrieve + "' AND socialsecurityexpenseDate='" + wher + "' and corporateInformationTradeName IN ( SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber = '" + gsbh[0].approvalformMedicareNumber + "') ")

                // 本月单位缴费比例
                let dwgrjf = await query("select socialsecurityexpensePICIUnits from socialsecurityexpense where corporateInformationTradeName" +
                    "= '" + werretrieve + "' AND socialsecurityexpenseDate = '" + wher + "'");

                //上月的缴费基数,金额
                let shangyue = await query("select socialsecurityexpenseMICBase,socialsecurityexpenseAPIIIIUnit " +
                    "from socialsecuritydetail where corporateInformationTradeName ='" + werretrieve + "' AND socialsecurityexpenseDate='" + sangyu + "' and corporateInformationTradeName IN ( SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber = '" + gsbh[0].approvalformMedicareNumber + "') ")

                // 上月单位缴费比例
                let sydwgrjf = await query("select socialsecurityexpensePICIUnits from socialsecurityexpense where corporateInformationTradeName" +
                    "= '" + werretrieve + "' AND socialsecurityexpenseDate = '" + sangyu + "'");
                //上月的职工人数
                let shangpepo = await query("SELECT DISTINCT COUNT(*) as'shangpepo' FROM socialsecurityexpense WHERE socialsecurityexpenseDate=" +
                    "'"+sangyu+"' AND corporateInformationTradeName IN (SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber = '" + gsbh[0].approvalformMedicareNumber + "')")
                //本月人数
                let benpeop = await query("SELECT DISTINCT COUNT(*) as 'benpeop' FROM socialsecurityexpense WHERE socialsecurityexpenseDate=" +
                    "'"+wher+"' AND corporateInformationTradeName IN (SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber = '" + gsbh[0].approvalformMedicareNumber + "')")

                //增加 基数，金额
                let jishuzj = await query("SELECT DISTINCT s.socialsecurityexpenseICIBAdjustment,s.socialsecurityexpenseAPIIIIUnit FROM employeeregistrationform e\n" +
                    "LEFT JOIN socialsecurityexpense s  ON s.employeeregistrationformIDNumber=e.employeeregistrationformIDNumber\n" +
                    "LEFT JOIN medicalinsurance m ON s.employeeregistrationformIDNumber=m.employeeregistrationformIDNumber\n" +
                    "WHERE e.corporateInformationTradeName IN (SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber = '" + gsbh[0].approvalformMedicareNumber + "')  AND m.EIIToDate LIKE '" + wher + "%' OR m.EIITgoDate LIKE '" + wher + "%'")
                //减少 基数，金额
                let jishujs= await query("SELECT DISTINCT s.employeeregistrationformName, s.socialsecurityexpenseICIBAdjustment,s.socialsecurityexpenseAPIIIIUnit FROM socialsecurityexpense s\n" +
                    "LEFT JOIN certificatelaborcontract c ON s.employeeregistrationformIDNumber=c.employeeregistrationformIDNumber\n" +
                    "WHERE c.certificatelaborcontractTerminationTime LIKE '" + wher + "%' AND s.socialsecurityexpenseDate='"+sangyu+"' AND c.corporateInformationTradeName IN (SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber = '" + gsbh[0].approvalformMedicareNumber + "')\n")
                //职工的增加
                let zgzj = (jishuzj.length)
                //职工减少
                let zgjs = (jishujs.length)
                if (benyue.length > 0) {
                    return {
                        state: stat.succeed,
                        data: sqltbr,//填表人
                        sqljbxx: sqljbxx,//公司信息
                        benyue: benyue,//本月的基数，金额
                        dwgrjf: dwgrjf,//本月个人和单位比例
                        jishuzj: jishuzj,//增加的 基数和金额
                        jishujs:jishujs,//减少的 基数和金额
                        shangyue: shangyue,//上月的基数，金额
                        sydwgrjf: sydwgrjf,// 上月个人缴费比例 单位缴费比例
                        zgzj: zgzj,//职工的增加
                        zgjs: zgjs,//职工减少
                        shangpepo: shangpepo,//上月人数
                        benpeop: benpeop//本月人数
                    };
                } else {
                    return {state: stat.defeated};
                }

            } else {
                return {state: stat.defeated};
            }
            } else {
                return {state: stat.defeated};
            }
        }



    } catch (e) {
        Logger.error("----service  / lnjury  /  selyqgssbb ---------", e)
        return {state: stat.defeated};
    }

}

export async function selyqgssbbb(werretrieve, wher, area) {
    try {
        //获取上月时间
        let rq = wher;
        const cal = new Calendar(rq);
        cal.add(-1, CalendarTypes.MONTH);
        let sangyu = cal.toFormat('yyyy-MM');
        if(area==="平定县"){
            // 根据公司查询公司编号
            let gsbh = await query("select approvalformMedicareNumber from approvalform \n" +
                "\twhere approvalformTradeName = '" + werretrieve + "'AND approvalformSubordinateToTheBlock = '平定县'");
            if (gsbh.length > 0) {
                // 填表人
                let sqltbr = await query("SELECT filName\n" +
                    "FROM filler\n" +
                    "WHERE filType = '工伤(市区，城区，矿区,郊区)' ");

                // 本月 法人代表/编码/开户行/账号/注册资金、职工人数/办公电话
                let sqljbxx = await query("SELECT \n" +
                    "approvalformLawPerson,\n" +
                    "approvalformBusinessLicenseCode,\n" +
                    "approvalformBankOfDeposit,\n" +
                    "approvalformBankAccount,\n" +
                    "approvalformRegisterMoney,\n" +
                    "approvalformCurrentHeadcount,\n" +
                    "approvalformOfficeTel\n" +
                    "FROM `approvalform` WHERE approvalformTradeName = '" + werretrieve + "'");
                if (sqltbr.length > 0 && sqljbxx.length > 0) {
                    //本月 缴费社会保险费合计、基本医疗保险、单位缴纳金额、个人缴纳金额、大病统筹、大病单位缴纳、大病个人缴纳
                    let byyl = await query("SELECT\n" +
                        "\tsocialsecurityexpenseAPMIUnit,\n" +// 医疗保险单位缴费金额
                        "\tsocialsecurityexpenseAICMInsurance,\n" +// 医疗保险个人缴费金额
                        "\tsocialsecurityexpenseAICMIntotal,\n" +// 医疗保险合计缴费金额
                        "\tsocialsecurityexpenseAPMDCUnit,\n" +// 大病单位缴费金额
                        "\tsocialsecurityexpenseMIPIPAmount,\n" +// 大病个人缴费金额
                        "\tsocialsecurityexpenseMIPIPtotal,\n" +// 大病合计缴费金额
                        "\t(socialsecurityexpenseAICMIntotal+socialsecurityexpenseMIPIPtotal) AS 'hj'\n" +// 缴纳社会保险费合计
                        "FROM\n" +
                        "\tsocialsecuritydetail \n" +
                        "WHERE\n" +
                        "\tsocialsecurityexpenseDate = '"+wher+"' \n" +
                        "\tAND corporateInformationTradeName IN (\n" +
                        "\tSELECT\n" +
                        "\t\tapprovalformTradeName \n" +
                        "\tFROM\n" +
                        "\t\tapprovalform \n" +
                        "\tWHERE\n" +
                        "\tapprovalformMedicareNumber = '"+gsbh[0].approvalformMedicareNumber+"')");

                    //上月 缴费社会保险费合计、基本医疗保险、单位缴纳金额、个人缴纳金额、大病统筹、大病单位缴纳、大病个人缴纳
                    let syyl = await query("SELECT\n" +
                        "\tsocialsecurityexpenseAPMIUnit,\n" +// 医疗保险单位缴费金额
                        "\tsocialsecurityexpenseAICMInsurance,\n" +// 医疗保险个人缴费金额
                        "\tsocialsecurityexpenseAICMIntotal,\n" +// 医疗保险合计缴费金额
                        "\tsocialsecurityexpenseAPMDCUnit,\n" +// 大病单位缴费金额
                        "\tsocialsecurityexpenseMIPIPAmount,\n" +// 大病个人缴费金额
                        "\tsocialsecurityexpenseMIPIPtotal,\n" +// 大病合计缴费金额
                        "\t(socialsecurityexpenseAICMIntotal+socialsecurityexpenseMIPIPtotal) AS 'hj'\n" +// 缴纳社会保险费合计
                        "FROM\n" +
                        "\tsocialsecuritydetail \n" +
                        "WHERE\n" +
                        "\tsocialsecurityexpenseDate = '"+sangyu+"' \n" +
                        "\tAND corporateInformationTradeName IN (\n" +
                        "\tSELECT\n" +
                        "\t\tapprovalformTradeName \n" +
                        "\tFROM\n" +
                        "\t\tapprovalform \n" +
                        "\tWHERE\n" +
                        "\tapprovalformMedicareNumber = '"+gsbh[0].approvalformMedicareNumber+"')");
                    // 增加
                    let zj = await query("SELECT\n" +
                        "\tsocialsecurityexpenseAPMIUnit,\n" +// 医疗保险单位缴费金额
                        "\tsocialsecurityexpenseAICMInsurance,\n" +// 医疗保险个人缴费金额
                        "\tsocialsecurityexpenseAICMIntotal,\n" +// 医疗保险合计缴费金额
                        "\tsocialsecurityexpenseAPMDCUnit,\n" +// 大病单位缴费金额
                        "\tsocialsecurityexpenseMIPIPAmount,\n" +// 大病个人缴费金额
                        "\tsocialsecurityexpenseMIPIPtotal,\n" +// 大病合计缴费金额
                        "\t(socialsecurityexpenseAICMIntotal+socialsecurityexpenseMIPIPtotal) AS 'hj'\n" +// 缴纳社会保险费合计
                        "FROM\n" +
                        "\tsocialsecuritydetail s\n" +
                        "\tLEFT JOIN medicalinsurance m ON s.corporateInformationTradeName = m.corporateInformationTradeName \n" +
                        "WHERE\n" +
                        "\ts.socialsecurityexpenseDate = '"+wher+"' \n" +
                        "\tAND s.corporateInformationTradeName IN ( SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber = '"+gsbh[0].approvalformMedicareNumber+"' ) \n" +
                        "\tAND m.EIIToDate LIKE '"+wher+"%' \n" +
                        "\tOR m.EIITgoDate LIKE '"+wher+"%'");
                    // 减少
                    let js = await query("SELECT\n" +
                        "\tsocialsecurityexpenseAPMIUnit,\n" +// 医疗保险单位缴费金额
                        "\tsocialsecurityexpenseAICMInsurance,\n" +// 医疗保险个人缴费金额
                        "\tsocialsecurityexpenseAICMIntotal,\n" +// 医疗保险合计缴费金额
                        "\tsocialsecurityexpenseAPMDCUnit,\n" +// 大病单位缴费金额
                        "\tsocialsecurityexpenseMIPIPAmount,\n" +// 大病个人缴费金额
                        "\tsocialsecurityexpenseMIPIPtotal,\n" +// 大病合计缴费金额
                        "\t(socialsecurityexpenseAICMIntotal+socialsecurityexpenseMIPIPtotal) AS 'hj'\n" +// 缴纳社会保险费合计
                        "FROM\n" +
                        "\tsocialsecuritydetail s\n" +
                        "\tLEFT JOIN certificatelaborcontract c ON s.corporateInformationTradeName = c.corporateInformationTradeName \n" +
                        "WHERE\n" +
                        "\ts.socialsecurityexpenseDate = '"+wher+"' \n" +
                        "\tAND s.corporateInformationTradeName IN ( SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber = '"+gsbh[0].approvalformMedicareNumber+"' ) \n" +
                        "\tAND c.certificatelaborcontractTerminationTime LIKE '"+wher+"%' \n" +
                        "\tAND s.socialsecurityexpenseDate='"+sangyu+"'");

                    // 本月 医疗单位和个人的缴费比例
                    let byylbl = await query("SELECT\n" +
                        "\tsocialsecurityexpenseMIUPProportion,\n" +// 医疗保险单位代缴比例
                        "\tsocialsecurityexpenseMIICRatio\n" +// 医疗保险个人代缴比例
                        "FROM\n" +
                        "\tsocialsecurityexpense \n" +
                        "WHERE\n" +
                        "\tsocialsecurityexpenseDate = '"+wher+"' \n" +
                        "\tAND corporateInformationTradeName IN (\n" +
                        "\tSELECT\n" +
                        "\t\tapprovalformTradeName \n" +
                        "\tFROM\n" +
                        "\t\tapprovalform \n" +
                        "\tWHERE\n" +
                        "\tapprovalformMedicareNumber = '"+gsbh[0].approvalformMedicareNumber+"')");
                    // 上月 医疗单位和个人的缴费比例
                    let syylbl = await query("SELECT\n" +
                        "\tsocialsecurityexpenseMIUPProportion,\n" +// 医疗保险单位代缴比例
                        "\tsocialsecurityexpenseMIICRatio\n" +// 医疗保险个人代缴比例
                        "FROM\n" +
                        "\tsocialsecurityexpense \n" +
                        "WHERE\n" +
                        "\tsocialsecurityexpenseDate = '"+sangyu+"' \n" +
                        "\tAND corporateInformationTradeName IN (\n" +
                        "\tSELECT\n" +
                        "\t\tapprovalformTradeName \n" +
                        "\tFROM\n" +
                        "\t\tapprovalform \n" +
                        "\tWHERE\n" +
                        "\tapprovalformMedicareNumber = '"+gsbh[0].approvalformMedicareNumber+"')");
                    //比例增加
                    let zjylbl = await query("SELECT\n" +
                        "\ts.socialsecurityexpenseMIUPProportion,\n" +// 医疗保险单位代缴比例
                        "\ts.socialsecurityexpenseMIICRatio\n" +// 医疗保险个人代缴比例
                        "FROM\n" +
                        "\tsocialsecurityexpense s\n" +
                        "\tLEFT JOIN medicalinsurance m ON s.employeeregistrationformIDNumber = m.employeeregistrationformIDNumber \n" +
                        "WHERE\n" +
                        "\ts.socialsecurityexpenseDate = '2022-05' \n" +
                        "\tAND s.corporateInformationTradeName IN (\n" +
                        "\tSELECT\n"+
                        "\t\tapprovalformTradeName \n"+
                        "\tFROM\n"+
                        "\t\tapprovalform \n"+
                        "\tWHERE\n"+
                        "\tapprovalformMedicareNumber = '91123016UHGF')\n" +
                        "\tAND m.EIIToDate LIKE '2022-05%' \n"+
                        "\tOR m.EIITgoDate LIKE '2022-05%'");
                    // 比例减少
                    let jsylbl = await query("SELECT\n" +
                        "\ts.socialsecurityexpenseMIUPProportion,\n" +// 医疗保险单位代缴比例
                        "\ts.socialsecurityexpenseMIICRatio\n" +// 医疗保险个人代缴比例
                        "\t\n" +
                        "FROM\n" +
                        "\tsocialsecurityexpense s\n" +
                        "\tLEFT JOIN certificatelaborcontract c ON s.corporateInformationTradeName = c.corporateInformationTradeName \n" +
                        "WHERE\n" +
                        "\ts.socialsecurityexpenseDate = '2022-05' \n" +
                        "\tAND s.corporateInformationTradeName IN ( SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber = '91123016UHGF' ) \n" +
                        "\tAND c.certificatelaborcontractTerminationTime LIKE '"+wher+"%' \n" +
                        "\tAND s.socialsecurityexpenseDate = '"+sangyu+"'");

                    //本月的缴费基数,金额
                    let benyue = await query("select socialsecurityexpenseMICBase,socialsecurityexpenseAPIIIIUnit " +
                        "from socialsecuritydetail where corporateInformationTradeName ='" + werretrieve + "' AND socialsecurityexpenseDate='" + wher + "' and corporateInformationTradeName IN ( SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber = '" + gsbh[0].approvalformMedicareNumber + "') ")

                    //上月的缴费基数,金额
                    let shangyue = await query("select socialsecurityexpenseMICBase,socialsecurityexpenseAPIIIIUnit " +
                        "from socialsecuritydetail where corporateInformationTradeName ='" + werretrieve + "' AND socialsecurityexpenseDate='" + sangyu + "' and corporateInformationTradeName IN ( SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber = '" + gsbh[0].approvalformMedicareNumber + "') ")
                    //上月的职工人数
                    let shangpepo = await query("SELECT DISTINCT COUNT(*) as'shangpepo' FROM socialsecurityexpense WHERE socialsecurityexpenseDate=" +
                        "'"+sangyu+"' AND corporateInformationTradeName IN (SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber = '" + gsbh[0].approvalformMedicareNumber + "')")
                    //本月人数
                    let benpeop = await query("SELECT DISTINCT COUNT(*) as 'benpeop' FROM socialsecurityexpense WHERE socialsecurityexpenseDate=" +
                        "'"+wher+"' AND corporateInformationTradeName IN (SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber = '" + gsbh[0].approvalformMedicareNumber + "')")

                    //增加 基数，金额
                    let jishuzj = await query("SELECT DISTINCT s.socialsecurityexpenseICIBAdjustment,s.socialsecurityexpenseAPIIIIUnit FROM employeeregistrationform e\n" +
                        "LEFT JOIN socialsecurityexpense s  ON s.employeeregistrationformIDNumber=e.employeeregistrationformIDNumber\n" +
                        "LEFT JOIN medicalinsurance m ON s.employeeregistrationformIDNumber=m.employeeregistrationformIDNumber\n" +
                        "WHERE e.corporateInformationTradeName IN (SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber = '" + gsbh[0].approvalformMedicareNumber + "')  AND m.EIIToDate LIKE '" + wher + "%' OR m.EIITgoDate LIKE '" + wher + "%'")
                    //减少 基数，金额
                    let jishujs= await query("SELECT DISTINCT s.employeeregistrationformName, s.socialsecurityexpenseICIBAdjustment,s.socialsecurityexpenseAPIIIIUnit FROM socialsecurityexpense s\n" +
                        "LEFT JOIN certificatelaborcontract c ON s.employeeregistrationformIDNumber=c.employeeregistrationformIDNumber\n" +
                        "WHERE c.certificatelaborcontractTerminationTime LIKE '" + wher + "%' AND s.socialsecurityexpenseDate='"+sangyu+"' AND c.corporateInformationTradeName IN (SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber = '" + gsbh[0].approvalformMedicareNumber + "')\n")
                    //职工的增加
                    let zgzj = (jishuzj.length);
                    //职工减少
                    let zgjs = (jishujs.length);
                    if (byyl.length > 0) {
                        return {
                            state: stat.succeed,
                            data: sqltbr,//填表人
                            sqljbxx: sqljbxx,//公司信息
                            benyue: benyue,
                            shangyue: shangyue,
                            jishuzj: jishuzj,//增加的 基数和金额
                            jishujs:jishujs,//减少的 基数和金额
                            zgzj: zgzj,//职工的增加
                            zgjs: zgjs,//职工减少
                            shangpepo: shangpepo,//上月人数
                            benpeop: benpeop,//本月人数
                            byyl: byyl,//本月 缴费社会保险费合计、基本医疗保险、单位缴纳金额、个人缴纳金额、大病统筹、大病单位缴纳、大病个人缴纳
                            syyl: syyl,//上月 缴费社会保险费合计、基本医疗保险、单位缴纳金额、个人缴纳金额、大病统筹、大病单位缴纳、大病个人缴纳
                            zj: zj,// 增加
                            js: js,// 减少
                            byylbl: byylbl,// 本月 医疗单位和个人的缴费比例
                            syylbl: syylbl,// 上月 医疗单位和个人的缴费比例
                            zjylbl: zjylbl,// 比例增加
                            jsylbl: jsylbl// 比例减少
                        };
                    } else {
                        return {state: stat.defeated};
                    }

                } else {
                    return {state: stat.defeated};
                }
            } else {
                return {state: stat.defeated};
            }
        }else {
            return {state: stat.mygs};
        }



    } catch (e) {
        Logger.error("----service  / lnjury  /  selyqgssbb ---------", e)
    }

}

//工伤保险费人员增减变动(盂县)
export async function selyqgssbbyux(werretrieve, wher) {
    try {
        const queryRunner = getConnection().createQueryRunner();
        // 填表人
        let sqltbr = await query("SELECT filName\n" +
            "FROM filler\n" +
            "WHERE filType = '工伤(市区，城区，矿区,郊区)' ");

// 本月 法人代表/编码/开户行/账号/注册资金、职工人数/办公电话
        let sqljbxx = await query("SELECT \n" +
            "approvalformLawPerson,\n" +
            "approvalformBusinessLicenseCode,\n" +
            "approvalformBankOfDeposit,\n" +
            "approvalformBankAccount,\n" +
            "approvalformRegisterMoney,\n" +
            "approvalformCurrentHeadcount,\n" +
            "approvalformOfficeTel\n" +
            "FROM `approvalform` WHERE approvalformTradeName = '" + werretrieve + "'AND approvalformSubordinateToTheBlock = '盂县'");

        //本月数（基数综合）
        let querydata = await query("SELECT SUM(socialsecurityexpenseBICIContributions) as 'BICIContri' " +
            "FROM socialsecurityexpense s " +
            "LEFT JOIN `approvalform` a ON s.corporateInformationTradeName =a.approvalformTradeName\n" +
            "WHERE a.approvalformSubordinateToTheBlock = '盂县' AND s.corporateInformationTradeName='" + werretrieve + "' AND s.socialsecurityexpenseDate=" + wher);

        //本月缴费费率
        let jffl = await query("SELECT socialsecurityexpensePICIUnits" +
            " FROM socialsecurityexpense s " +
            "LEFT JOIN `approvalform` a ON s.corporateInformationTradeName =a.approvalformTradeName\n" +
            "WHERE a.approvalformSubordinateToTheBlock = '盂县' AND s.corporateInformationTradeName='" + werretrieve + "' AND s.socialsecurityexpenseDate=" + wher);

        //本月合计人数总和(在职人数)
        let ppsum = await query("SELECT COUNT(1) as 'psum' " +
            "FROM `employeeregistrationform` e " +
            "LEFT JOIN `approvalform` a ON e.corporateInformationTradeName =a.approvalformTradeName\n" +
            "WHERE a.approvalformSubordinateToTheBlock = '盂县' AND e.corporateInformationTradeName='" + werretrieve + "' and e.employe=0");

        //本月增加人数
        let tjpp = await query("SELECT count(*) as 'tjpp' " +
            "FROM `employeeregistrationform` e " +
            "LEFT JOIN `approvalform` a ON e.corporateInformationTradeName =a.approvalformTradeName\n" +
            "WHERE a.approvalformSubordinateToTheBlock = '盂县' AND corporateInformationTradeName ='" + werretrieve + "' and employe = 0 and employeeregistrationformWorkTime like '%" + wher + "%'");

        //本月减少人数
        let jspp = await query("SELECT COUNT(*) AS 'jspp' " +
            "FROM `certificatelaborcontract` c " +
            "LEFT JOIN `approvalform` a ON c.corporateInformationTradeName =a.approvalformTradeName\n" +
            "WHERE a.approvalformSubordinateToTheBlock = '盂县' AND c.corporateInformationTradeName ='" + werretrieve + "' AND c.certificatelaborcontractTerminationTime LIKE '% " + wher + "%'");

        //本月保险费
        let bxf = await query("SELECT SUM(socialsecurityexpenseTPAIIInsurance) AS 'bxzh' " +
            "FROM socialsecurityexpense s " +
            "LEFT JOIN `approvalform` a ON s.corporateInformationTradeName =a.approvalformTradeName\n" +
            "WHERE a.approvalformSubordinateToTheBlock = '盂县' AND s.corporateInformationTradeName='" + werretrieve + "' AND s.socialsecurityexpenseDate LIKE '%" + wher + "%'");

        //本月生育保险缴费费率
        let syfl = await query("SELECT socialsecurityexpensePMIUnits " +
            "FROM socialsecurityexpense s " +
            "LEFT JOIN `approvalform` a ON s.corporateInformationTradeName =a.approvalformTradeName\n" +
            "WHERE a.approvalformSubordinateToTheBlock = '盂县' AND s.corporateInformationTradeName='" + werretrieve + "' AND s.socialsecurityexpenseDate=" + wher);

        //本月生育保险缴费金额
        let syje = await query("SELECT SUM(socialsecurityexpenseAPBMIUnit) as 'jfje' " +
            "FROM socialsecurityexpense s " +
            "LEFT JOIN `approvalform` a ON s.corporateInformationTradeName =a.approvalformTradeName\n" +
            "WHERE a.approvalformSubordinateToTheBlock = '盂县' AND s.corporateInformationTradeName='" + werretrieve + "' AND s.socialsecurityexpenseDate=" + wher);

        //上月数基数综合
        let umth = '';
        //上月数费率
        let umfl = '';
        //上月增加员工
        let umep = '';
        //上月减少人数
        let umjs = '';
        //上月保险费
        let umbx = '';
        //上月生育保险缴费费率
        let umsy = '';
        //上月生育保险缴费金额
        let umje = '';
        // 截取年月
        let year = wher.substring(0, 4);
        let yue = wher.substring(5, 7);
        if (yue == "1") {
            year = parseInt(year) - 1;
            yue = '12';
            umth = await query("SELECT SUM(socialsecurityexpenseBICIContributions) as 'BICIContri' " +
                "FROM socialsecurityexpense s " +
                "LEFT JOIN `approvalform` a ON s.corporateInformationTradeName =a.approvalformTradeName\n" +
                "WHERE a.approvalformSubordinateToTheBlock = '盂县' AND s.corporateInformationTradeName='" + werretrieve + "' and s.socialsecurityexpenseDate like %'" + year + "-" + yue + "%'");

            umfl = await query("SELECT socialsecurityexpensePICIUnits " +
                "FROM socialsecurityexpense s " +
                "LEFT JOIN `approvalform` a ON s.corporateInformationTradeName =a.approvalformTradeName\n" +
                "WHERE a.approvalformSubordinateToTheBlock = '盂县' AND  s.corporateInformationTradeName='" + werretrieve + "' and s.socialsecurityexpenseDate like '%" + year + "-" + yue + "%'");

            umep = await query("SELECT count(*) as 'tjpp'  " +
                "FROM `employeeregistrationform` e " +
                "LEFT JOIN `approvalform` a ON e.corporateInformationTradeName =a.approvalformTradeName\n" +
                "WHERE a.approvalformSubordinateToTheBlock = '盂县' AND e.corporateInformationTradeName ='" + werretrieve + "' AND e.employe = 0 AND e.employeeregistrationformWorkTime like '%" + year + "-" + yue + "%'");

            umjs = await query("SELECT COUNT(*) AS 'jspp' " +
                "FROM `certificatelaborcontract` c " +
                "LEFT JOIN `approvalform` a ON c.corporateInformationTradeName =a.approvalformTradeName\n" +
                "WHERE a.approvalformSubordinateToTheBlock = '盂县' AND c.corporateInformationTradeName ='" + werretrieve + "' AND c.certificatelaborcontractTerminationTime LIKE '%" + year + "-" + yue + "%'");

            umbx = await query("SELECT SUM(socialsecurityexpenseTPAIIInsurance) AS 'bxzh' " +
                "FROM socialsecurityexpense s " +
                "LEFT JOIN `approvalform` a ON s.corporateInformationTradeName =a.approvalformTradeName\n" +
                "WHERE a.approvalformSubordinateToTheBlock = '盂县' AND s.corporateInformationTradeName='" + werretrieve + "' AND s.socialsecurityexpenseDate LIKE '%" + year + "-" + yue + "%'");

            umsy = await query("SELECT socialsecurityexpensePMIUnits " +
                "FROM socialsecurityexpense s " +
                "LEFT JOIN `approvalform` a ON s.corporateInformationTradeName =a.approvalformTradeName\n" +
                "WHERE a.approvalformSubordinateToTheBlock = '盂县' AND  s.corporateInformationTradeName='" + werretrieve + "' AND s.socialsecurityexpenseDate LIKE '%" + year + "-" + yue + "%'");

            umje = await query("SELECT SUM(socialsecurityexpenseAPBMIUnit) as 'jfje' " +
                "FROM socialsecurityexpense s " +
                "LEFT JOIN `approvalform` a ON s.corporateInformationTradeName =a.approvalformTradeName\n" +
                "WHERE a.approvalformSubordinateToTheBlock = '盂县' AND s.corporateInformationTradeName='" + werretrieve + "' AND s.socialsecurityexpenseDate LIKE '%" + year + "-" + yue + "%'");
        } else {
            yue = parseInt(yue) - 1;
            if (yue < 10) {
                umth = await query("SELECT SUM(socialsecurityexpenseBICIContributions) as 'BICIContri' " +
                    "FROM socialsecurityexpense s " +
                    "LEFT JOIN `approvalform` a ON s.corporateInformationTradeName =a.approvalformTradeName\n" +
                    "WHERE a.approvalformSubordinateToTheBlock = '盂县' AND s.corporateInformationTradeName='" + werretrieve + "' AND s.socialsecurityexpenseDate like '%" + year + "-0" + yue + "%'");

                umfl = await query("SELECT socialsecurityexpensePICIUnits " +
                    "FROM socialsecurityexpense s " +
                    "LEFT JOIN `approvalform` a ON s.corporateInformationTradeName =a.approvalformTradeName\n" +
                    "WHERE a.approvalformSubordinateToTheBlock = '盂县' AND s.corporateInformationTradeName='" + werretrieve + "' AND s.socialsecurityexpenseDate like '%" + year + "-0" + yue + "%'");

                umep = await query("SELECT count(*) as 'tjpp' " +
                    "FROM `employeeregistrationform` e " +
                    "LEFT JOIN `approvalform` a ON e.corporateInformationTradeName =a.approvalformTradeName\n" +
                    "WHERE  a.approvalformSubordinateToTheBlock = '盂县' AND e.corporateInformationTradeName ='" + werretrieve + "' AND  e.employe = 0 AND e.employeeregistrationformWorkTime like '%" + year + "-0" + yue + "%'");

                umjs = await query("SELECT COUNT(*) AS 'jspp' " +
                    "FROM `certificatelaborcontract` c " +
                    "LEFT JOIN `approvalform` a ON c.corporateInformationTradeName =a.approvalformTradeName\n" +
                    "WHERE  a.approvalformSubordinateToTheBlock = '盂县' AND c.corporateInformationTradeName ='" + werretrieve + "' AND c.certificatelaborcontractTerminationTime LIKE '%" + year + "-0" + yue + "%'");

                umbx = await query("SELECT SUM(socialsecurityexpenseTPAIIInsurance) AS 'bxzh' " +
                    "FROM socialsecurityexpense s " +
                    "LEFT JOIN `approvalform` a ON s.corporateInformationTradeName =a.approvalformTradeName\n" +
                    "WHERE a.approvalformSubordinateToTheBlock = '盂县' AND s.corporateInformationTradeName='" + werretrieve + "' AND s.socialsecurityexpenseDate LIKE '%" + year + "-0" + yue + "%'");

                umsy = await query("SELECT socialsecurityexpensePMIUnits " +
                    "FROM socialsecurityexpense s " +
                    "LEFT JOIN `approvalform` a ON s.corporateInformationTradeName =a.approvalformTradeName\n" +
                    "WHERE a.approvalformSubordinateToTheBlock = '盂县' AND s.corporateInformationTradeName='" + werretrieve + "' AND s.socialsecurityexpenseDate LIKE '%" + year + "-0" + yue + "%'");

                umje = await query("SELECT SUM(socialsecurityexpenseAPBMIUnit) as 'jfje' " +
                    "FROM socialsecurityexpense s " +
                    "LEFT JOIN `approvalform` a ON s.corporateInformationTradeName =a.approvalformTradeName\n" +
                    "WHERE a.approvalformSubordinateToTheBlock = '盂县' AND  s.corporateInformationTradeName='" + werretrieve + "' AND s.socialsecurityexpenseDate LIKE '%" + year + "-" + yue + "%'");
            } else {
                umth = await query("SELECT SUM(socialsecurityexpenseBICIContributions) as 'BICIContri' " +
                    "FROM socialsecurityexpense s " +
                    "LEFT JOIN `approvalform` a ON s.corporateInformationTradeName =a.approvalformTradeName\n" +
                    "WHERE a.approvalformSubordinateToTheBlock = '盂县' AND s.corporateInformationTradeName='" + werretrieve + "' AND s.socialsecurityexpenseDate like '%" + year + "-" + yue + "%'");

                umfl = await query("SELECT socialsecurityexpensePICIUnits " +
                    "FROM socialsecurityexpense s " +
                    "LEFT JOIN `approvalform` a ON s.corporateInformationTradeName =a.approvalformTradeName\n" +
                    "WHERE a.approvalformSubordinateToTheBlock = '盂县' AND s.corporateInformationTradeName='" + werretrieve + "' AND s.socialsecurityexpenseDate like '%" + year + "-" + yue + "%'");

                umep = await query("SELECT count(*) as 'tjpp' " +
                    "FROM `employeeregistrationform` e " +
                    "LEFT JOIN `approvalform` a ON e.corporateInformationTradeName =a.approvalformTradeName\n" +
                    "WHERE a.approvalformSubordinateToTheBlock = '盂县' AND e.corporateInformationTradeName ='" + werretrieve + "' AND e.employe = 0 AND e.employeeregistrationformWorkTime like '%" + year + "-" + yue + "%'");

                umjs = await query("SELECT COUNT(*) AS 'jspp' " +
                    "FROM `certificatelaborcontract` c " +
                    "LEFT JOIN `approvalform` a ON c.corporateInformationTradeName =a.approvalformTradeName\n" +
                    "WHERE a.approvalformSubordinateToTheBlock = '盂县' AND c.corporateInformationTradeName ='" + werretrieve + "' AND c.certificatelaborcontractTerminationTime LIKE '%" + year + "-" + yue + "%'");

                umbx = await query("SELECT SUM(socialsecurityexpenseTPAIIInsurance) AS 'bxzh' " +
                    "FROM socialsecurityexpense s " +
                    "LEFT JOIN `approvalform` a ON s.corporateInformationTradeName =a.approvalformTradeName\n" +
                    "WHERE a.approvalformSubordinateToTheBlock = '盂县' AND s.corporateInformationTradeName='" + werretrieve + "' AND s.socialsecurityexpenseDate LIKE '%" + year + "-" + yue + "%'");

                umsy = await query("SELECT socialsecurityexpensePMIUnits " +
                    "FROM socialsecurityexpense s " +
                    "LEFT JOIN `approvalform` a ON s.corporateInformationTradeName =a.approvalformTradeName\n" +
                    "WHERE a.approvalformSubordinateToTheBlock = '盂县' AND s.corporateInformationTradeName='" + werretrieve + "' AND s.socialsecurityexpenseDate LIKE '%" + year + "-" + yue + "%'");

                umje = await query("SELECT SUM(socialsecurityexpenseAPBMIUnit) as 'jfje' " +
                    "FROM socialsecurityexpense s " +
                    "LEFT JOIN `approvalform` a ON s.corporateInformationTradeName =a.approvalformTradeName\n" +
                    "WHERE a.approvalformSubordinateToTheBlock = '盂县' AND s.corporateInformationTradeName='" + werretrieve + "' AND s.socialsecurityexpenseDate LIKE '%" + year + "-" + yue + "%'");
            }
        }
        //增加人员如下。。。
        tjpp = parseInt(tjpp[0].tjpp);
        // @ts-ignore
        umep = parseInt(umep[0].tjpp);
        let tjry = tjpp + umep;


        //减少人员如下。。。
        jspp = parseInt(jspp[0].jspp);
        // @ts-ignore
        umjs = parseInt(umjs[0].jspp);
        let jsry = jspp + umjs;

        //本月人数总和
        let zh = parseInt(ppsum[0].psum);

        //上月人数=本月人数总和+减少人数-增加人数
        let syry = parseInt(zh + jsry) - parseInt(tjry);
        // ();
        if (querydata || umth || jffl || umfl || ppsum || tjry || jsry || syry) {
            //data 本月缴费基数  umt 上月缴费基数   jffl  本月缴费费率   umfl   上月缴费费率  ppsum  本月数职工合计
            // tjry  增加人数   jsry减少人数   syrs上月人数    bxf本月保险费   umbx上月保险费    syfl  生育费率    umsy 上月生育费率   syje本月生育金额  umje上月生育金额
            return {
                state: stat.succeed,
                data: querydata,
                umt: umth,
                jffl: jffl,
                umfl: umfl,
                ppsum: ppsum,
                zjrs: tjry,
                jsry: jsry,
                syrs: syry,
                bxf: bxf,
                umbx: umbx,
                syfl: syfl,
                umsy: umsy,
                syje: syje,
                umje: umje,
                sqltbr: sqltbr,
                sqljbxx: sqljbxx
            };
        } else {
            return {state: stat.defeated};
        }

    } catch (e) {
        Logger.error("----service  / lnjury  /  selyqgssbb ---------", e)
        return {state: stat.defeated};
    }

}


//阳泉市参保单位人员增减变动表3-2
export async function selYqszjbdb(werretrieve, wher, pageIndex, pageSize) {
    try {
        const queryRunner = getConnection().createQueryRunner();

        // 填表人
        let sqltbr = await query("SELECT filName\n" +
            "FROM filler\n" +
            "WHERE filType = '工伤(市区，城区，矿区,郊区)' ");

// 本月 法人代表/编码/开户行/账号/注册资金、职工人数/办公电话
        let sqljbxx = await query("SELECT \n" +
            "approvalformLawPerson,\n" +
            "approvalformBusinessLicenseCode,\n" +
            "approvalformBankOfDeposit,\n" +
            "approvalformBankAccount,\n" +
            "approvalformRegisterMoney,\n" +
            "approvalformCurrentHeadcount,\n" +
            "approvalformOfficeTel\n" +
            "FROM `approvalform` WHERE approvalformTradeName = '" + werretrieve + "' AND approvalformSubordinateToTheBlock ='平定县'");

        let querydata = await query("SELECT e.*,r.socialsecurityexpenseIIIICAmount " +
            "FROM employeeregistrationform e " +
            "LEFT JOIN socialsecurityexpense r\n" +
            "ON e.employeeregistrationformIDNumber = r.employeeregistrationformIDNumber\n" +
            "LEFT JOIN `approvalform` a ON r.corporateInformationTradeName =a.approvalformTradeName\n" +
            "WHERE a.approvalformSubordinateToTheBlock = '平定县' AND e.corporateInformationTradeName \n" +
            "IN (SELECT corporateInformationTradeName FROM `employeeregistrationform` WHERE corporateInformationTradeName='" + werretrieve + "' AND employeeregistrationformWorkTime LIKE '%" + wher + "%'" + ") LIMIT " + (pageIndex - 1) * pageSize + "," + pageSize);
        //总页数
        const pageCount = Math.ceil(querydata.length / pageSize);
        //总数据
        const Total = querydata.length;
        // ();
        if (querydata.length > 0) {
            return {
                state: stat.succeed,
                data: querydata,
                page: pageCount,
                total: Total,
                sqltbr: sqltbr,
                sqljbxx: sqljbxx
            };
        } else {
            return {state: stat.defeated};
        }

    } catch (e) {
        Logger.error("----service  / lnjury  /  selYqszjbdb ---------", e)
        return {state: stat.defeated};
    }

}

//阳泉市参保单位人员增减变动表3-2(盂县)
export async function selYqszjbdbyux(werretrieve, wher, pageIndex, pageSize) {
    try {
        const queryRunner = getConnection().createQueryRunner();

        // 填表人
        let sqltbr = await query("SELECT filName\n" +
            "FROM filler\n" +
            "WHERE filType = '工伤(市区，城区，矿区,郊区)' ");

// 本月 法人代表/编码/开户行/账号/注册资金、职工人数/办公电话
        let sqljbxx = await query("SELECT \n" +
            "approvalformLawPerson,\n" +
            "approvalformBusinessLicenseCode,\n" +
            "approvalformBankOfDeposit,\n" +
            "approvalformBankAccount,\n" +
            "approvalformRegisterMoney,\n" +
            "approvalformCurrentHeadcount,\n" +
            "approvalformOfficeTel\n" +
            "FROM `approvalform` WHERE approvalformTradeName = '" + werretrieve + "' AND approvalformSubordinateToTheBlock ='盂县'");

        let querydata = await query("SELECT e.*,r.socialsecurityexpenseIIIICAmount " +
            "FROM employeeregistrationform e " +
            "LEFT JOIN socialsecurityexpense r\n" +
            "ON e.employeeregistrationformIDNumber = r.employeeregistrationformIDNumber\n" +
            "LEFT JOIN `approvalform` a ON r.corporateInformationTradeName =a.approvalformTradeName\n" +
            "WHERE a.approvalformSubordinateToTheBlock = '盂县' AND e.corporateInformationTradeName \n" +
            "IN (SELECT corporateInformationTradeName FROM `employeeregistrationform` WHERE corporateInformationTradeName='" + werretrieve + "' AND employeeregistrationformWorkTime LIKE '%" + wher + "%'" + ") LIMIT " + (pageIndex - 1) * pageSize + "," + pageSize);
        //总页数
        const pageCount = Math.ceil(querydata.length / pageSize);
        //总数据
        const Total = querydata.length;
        // ();
        if (querydata.length > 0) {
            return {
                state: stat.succeed,
                data: querydata,
                page: pageCount,
                total: Total,
                sqltbr: sqltbr,
                sqljbxx: sqljbxx
            };
        } else {
            return {state: stat.defeated};
        }

    } catch (e) {
        Logger.error("----service  / lnjury  /  selYqszjbdb ---------", e)
        return {state: stat.defeated};
    }

}