// 报表查询
import stat from "../util/state";
import {getConnection} from "typeorm";
import log4js from "../util/logs";
import {query} from "../dao/stopped"

const {
    Calendar,
    CalendarTypes
} = require('calendar2');
const Logger = log4js.getLogger('error');
const queryRunner = getConnection().createQueryRunner();

// 分页查询养老
export async function selPensionReduction(werretrieve, bbtime, pageIndex, pageSize) {
    try {
        // 填表人
        let sqltbr = await query("SELECT filName\n" +
            "FROM filler\n" +
            "WHERE filType = '养老' ");
        let gsbh = await query("select approvalformPensionNumber from approvalform \n" +
            "\twhere approvalformTradeName = '" + werretrieve + "'");
        //上月日期
        let rq = bbtime;
        const cal = new Calendar(rq);
        cal.add(-1, CalendarTypes.MONTH);
        let ctm = cal.toFormat('yyyy-MM')
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
        //增加的数据
        let queryzjda = await query("SELECT DISTINCT e.employeeregistrationformFileNumber, e.employeeregistrationformWorkTime,s.socialsecurityexpenseEIALater,e.employeeregistrationformIDNumber," +
            "e.employeeregistrationformName,e.employeeregistrationformSex,e.employeeregistrationformNationality,e.employeeregistrationformDateOfBirth,\n" +
            "e.employeeregistrationformWorkTime,e.employeeregistrationfromPhone,e.employeeregistrationformCategory," +
            "e.employeeregistrationformEmploymentForm,e.employeeregistrationformRemarks\n" +
            "FROM employeeregistrationform e\n" +
            "LEFT JOIN socialsecurityexpense s ON e.employeeregistrationformIDNumber=s.employeeregistrationformIDNumber\n" +
            "LEFT JOIN oldageinsurance m ON s.employeeregistrationformIDNumber=m.employeeregistrationformIDNumber\n" +
            "WHERE e.corporateInformationTradeName IN (SELECT approvalformTradeName FROM approvalform WHERE approvalformPensionNumber =" +
            " '" + gsbh[0].approvalformPensionNumber + "') AND m.oldageinsuranceToDate LIKE '%" + bbtime + "%'" +
            " OR m.oldageinsuranceGoDate LIKE'%" + bbtime + "%' GROUP BY e.employeeregistrationformId  limit " + (pageIndex - 1) + "," + (pageSize - 1));
        //减少的数据
        let querydata = await query("SELECT DISTINCT e.employeeregistrationformFileNumber,e.employeeregistrationformWorkTime,s.socialsecurityexpenseEIALater, c.certificatelaborcontractName AS'employeeregistrationformName',\n" +
            "c.employeeregistrationformIDNumber AS'employeeregistrationformIDNumber',c.certificatelaborcontractSex AS 'employeeregistrationformSex',c.certificatelaborcontractTerminationTime,\n" +
            "c.certificatelaborcontractReasonTermination AS 'employeeregistrationformRemarks' ,\n" +
            "e.employeeregistrationformWorkTime,e.employeeregistrationformNationality,e.employeeregistrationformDateOfBirth,\n" +
            "e.employeeregistrationfromPhone,e.employeeregistrationformCategory,e.employeeregistrationformEmploymentForm\n" +
            "FROM certificatelaborcontract c \n" +
            "LEFT JOIN socialsecurityexpense s ON c.employeeregistrationformIDNumber=s.employeeregistrationformIDNumber\n" +
            "LEFT JOIN employeeregistrationform e ON s.employeeregistrationformIDNumber=e.employeeregistrationformIDNumber\n" +
            "WHERE c.certificatelaborcontractTerminationTime LIKE '%" + bbtime + "%' AND s.socialsecurityexpenseDate='" + ctm + "'" +
            " AND c.corporateInformationTradeName IN (SELECT approvalformTradeName FROM approvalform WHERE approvalformPensionNumber = " +
            "'" + gsbh[0].approvalformPensionNumber + "') GROUP BY e.employeeregistrationformId  limit " + (pageIndex - 1) + "," + (pageSize - 1));
        let data = querydata.concat(queryzjda)
        //总页数
        const pageCount = Math.ceil(data.length / pageSize);
        //总数据
        const Total = data.length;
        //
        if (data.length) {
            return {
                state: stat.succeed,
                data: data,
                page: pageCount,
                total: Total,
                sqltbr: sqltbr,
                sqljbxx: sqljbxx,
                queryzjda: queryzjda
            };
        } else {
            return {state: stat.defeated};
        }
    } catch (e) {
        Logger.error("----service  / report  /  selPensionReduction ---------", e)
        return {state: stat.defeated};
    }
}

// 盂县参保单位保险申报表                 单位   时间（年月）
export async function YuxianMedical(company, ddtime, area) {
    try {
        // 填表人
        let sqltbr = await query("SELECT filName\n" +
            "FROM filler\n" +
            "WHERE filType = '医疗(盂县,平定)' ");
        // 本月 法人代表/编码/开户行/账号/注册资金/职工人数/办公电话
        let sqljbxx = await query("SELECT \n" +
            "approvalformLawPerson,\n" +
            "approvalformBusinessLicenseCode,\n" +
            "approvalformBankOfDeposit,\n" +
            "approvalformBankAccount,\n" +
            "approvalformRegisterMoney,\n" +
            "approvalformCurrentHeadcount,\n" +
            "approvalformOfficeTel\n" +
            "FROM `approvalform` WHERE approvalformTradeName = '" + company + "'AND approvalformSubordinateToTheBlock = '" + area + "'");
        // 根据公司查询公司编号
        let gsbh = await query("select approvalformMedicareNumber from approvalform \n" +
            "\twhere approvalformTradeName = '" + company + "'AND approvalformSubordinateToTheBlock = '" + area + "'");
        if (gsbh.length > 0) {
            //本月
            let sqlby = await query("SELECT\n" +
                "\tcount(*) AS 'Numberstaff',\n" +// 在职职工人数
                "\tTRUNCATE ( SUM( s.socialsecurityexpenseAUAAMInsurance ), 2 ) AS 'Paymentmedicals',\n" +// 单位缴纳（医疗）
                "\tTRUNCATE ( SUM( s.socialsecurityexpenseAPAAMInsurance ), 2 ) AS 'Individualcontribution',\n" +// 个人缴纳（医疗）
                "\t( TRUNCATE ( SUM( s.socialsecurityexpenseAUAAMInsurance )+ SUM( s.socialsecurityexpenseAPAAMInsurance ), 2 ) ) AS 'Basicinsurance',\n" +// 基本医疗保险费
                "\tTRUNCATE ( SUM( s.socialsecurityexpenseASIOAUAmount ), 2 ) AS 'seriousillnessunit',\n" +// 大病单位缴纳
                "\tTRUNCATE ( SUM( s.socialsecurityexpenseAPAASIWhole ), 2 ) AS 'seriousillnessindividual',\n" +// 大病个人缴纳
                "\t( TRUNCATE ( SUM( s.socialsecurityexpenseASIOAUAmount )+ SUM( s.socialsecurityexpenseAPAASIWhole ), 2 ) ) AS 'illnessfees',\n" +// 大病统筹费
                "\t(\n" +
                "\t\tTRUNCATE ( SUM( s.socialsecurityexpenseAUAAMInsurance )+ SUM( s.socialsecurityexpenseAPAAMInsurance ), 2 )+ TRUNCATE ( SUM( s.socialsecurityexpenseASIOAUAmount )+ SUM( s.socialsecurityexpenseAPAASIWhole ), 2 ) \n" +
                "\t) AS 'socialinsurance' \n" +// 缴纳社会保险费合计（元）
                "FROM\n" +
                "\temployeeregistrationform e\n" +
                "\tLEFT JOIN socialsecurityexpense s ON e.employeeregistrationformIDNumber = s.employeeregistrationformIDNumber " +
                "\tLEFT JOIN  approvalform a ON s.corporateInformationTradeName = a.approvalformTradeName\n" +
                "WHERE\n" +
                "\te.corporateInformationTradeName in ( SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber= '" + gsbh[0].approvalformMedicareNumber + "' ) \n" +
                "\tAND e.employe = 0 \n" +
                "\tAND s.socialsecurityexpenseDate = '" + ddtime + "' AND a.approvalformSubordinateToTheBlock  ='" + area + "'");
            // 把传入的时间改成上月时间
            const cal = new Calendar(ddtime);
            cal.add(-1, CalendarTypes.MONTH);
            let sangyu = cal.toFormat('yyyy-MM')
            // 本月退休
            let sqltx = await query("select  count(*) as 'Retiremonth'  from certificatelaborcontract where corporateInformationTradeName  in ( SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber= '" + gsbh[0].approvalformMedicareNumber + "' )  and " +
                "certificatelaborcontractRemark = '退休' and certificatelaborcontractTerminationTime IN " +
                "(select employeeregistrationformWorkTime from employeeregistrationform where employeeregistrationformWorkTime like '%" + ddtime + "%')")
            // 增加
            let sqlzj = await query("SELECT count(*) as 'Increase' FROM employeeregistrationform WHERE corporateInformationTradeName " +
                " in ( SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber= '" + gsbh[0].approvalformMedicareNumber + "' )" +
                " and employeeregistrationformWorkTime LIKE '%" + ddtime + "%'");
            // 减少
            let sqljs = await query("SELECT count(*) as 'reduce' FROM employeeregistrationform WHERE corporateInformationTradeName " +
                " in ( SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber= '" + gsbh[0].approvalformMedicareNumber + "' )" +
                " and employeeregistrationformWorkTime LIKE '%" + ddtime + "%' and employe = 1");
            // 上月
            let sqlsy = [];
            let sqlsytx = [];
            if (sangyu < 10) {
                sqlsy = await query("SELECT \n" +
                    "\tcount(*) AS 'numberemployees',\n" +// 在职职工人数
                    "\tTRUNCATE ( SUM( s.socialsecurityexpenseAUAAMInsurance ), 2 ) AS 'unitpayment',\n" +// 单位缴纳
                    "\tTRUNCATE ( SUM( socialsecurityexpenseAPAAMInsurance ), 2 ) AS 'individualpayment',\n" +// 个人缴纳
                    "\t( TRUNCATE ( SUM( s.socialsecurityexpenseAUAAMInsurance )+ SUM( s.socialsecurityexpenseAPAAMInsurance ), 2 ) ) AS 'basicmedicalpremium',\n" +// 基本医疗保险费
                    "\tTRUNCATE ( SUM( s.socialsecurityexpenseASIOAUAmount ), 2 ) AS 'seriousillnesspayment',\n" +// 单位缴纳（大病）
                    "\tTRUNCATE ( SUM( s.socialsecurityexpenseAPAASIWhole ), 2 ) AS 'seriousillnesspersonal',\n" +// 个人缴纳（大病）
                    "\t( TRUNCATE ( SUM(s.socialsecurityexpenseASIOAUAmount )+ SUM( s.socialsecurityexpenseAPAASIWhole ), 2 ) ) AS 'seriousillnessfee',\n" +// 大病统筹费
                    "\t( TRUNCATE ( SUM( s.socialsecurityexpenseAUAAMInsurance )+ SUM( s.socialsecurityexpenseAPAAMInsurance ), 2 )+ TRUNCATE ( SUM( s.socialsecurityexpenseASIOAUAmount )+ SUM( s.socialsecurityexpenseAPAASIWhole ), 2 ) ) AS 'totalsocialpaid' \n" +// 缴纳社会保险费合计（元）
                    "FROM\n" +
                    "\tsocialsecurityexpense s left join approvalform a\n" +
                    "\ton s.corporateInformationTradeName = a.approvalformTradeName\n" +
                    "WHERE\n" +
                    "\ts.corporateInformationTradeName  in ( SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber= '" + gsbh[0].approvalformMedicareNumber + "' ) \n" +
                    "\tAND s.socialsecurityexpenseDate = '" + sangyu + "' AND a.approvalformSubordinateToTheBlock = '" + area + "'");
                // 上月退休
                sqlsytx = await query("select  count(*) as 'lastmonth'  from certificatelaborcontract where corporateInformationTradeName  in ( SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber= '" + gsbh[0].approvalformMedicareNumber + "' )  and " +
                    "certificatelaborcontractRemark = '退休' and certificatelaborcontractTerminationTime IN " +
                    "(select employeeregistrationformWorkTime from employeeregistrationform where employeeregistrationformWorkTime like '%" + sangyu + "%')")
            } else {
                sqlsy = await query("SELECT \n" +
                    "\tcount(*) AS 'numberemployees',\n" +// 在职职工人数
                    "\tTRUNCATE ( SUM( s.socialsecurityexpenseAUAAMInsurance ), 2 ) AS 'unitpayment',\n" +// 单位缴纳
                    "\tTRUNCATE ( SUM( socialsecurityexpenseAPAAMInsurance ), 2 ) AS 'individualpayment',\n" +// 个人缴纳
                    "\t( TRUNCATE ( SUM( s.socialsecurityexpenseAUAAMInsurance )+ SUM( s.socialsecurityexpenseAPAAMInsurance ), 2 ) ) AS 'basicmedicalpremium',\n" +// 基本医疗保险费
                    "\tTRUNCATE ( SUM( s.socialsecurityexpenseASIOAUAmount ), 2 ) AS 'seriousillnesspayment',\n" +// 单位缴纳（大病）
                    "\tTRUNCATE ( SUM( s.socialsecurityexpenseAPAASIWhole ), 2 ) AS 'seriousillnesspersonal',\n" +// 个人缴纳（大病）
                    "\t( TRUNCATE ( SUM(s.socialsecurityexpenseASIOAUAmount )+ SUM( s.socialsecurityexpenseAPAASIWhole ), 2 ) ) AS 'seriousillnessfee',\n" +// 大病统筹费
                    "\t( TRUNCATE ( SUM( s.socialsecurityexpenseAUAAMInsurance )+ SUM( s.socialsecurityexpenseAPAAMInsurance ), 2 )+ TRUNCATE ( SUM( s.socialsecurityexpenseASIOAUAmount )+ SUM( s.socialsecurityexpenseAPAASIWhole ), 2 ) ) AS 'totalsocialpaid' \n" +// 缴纳社会保险费合计（元）
                    "FROM\n" +
                    "\tsocialsecurityexpense s left join approvalform a\n" +
                    "\ton s.corporateInformationTradeName = a.approvalformTradeName\n" +
                    "WHERE\n" +
                    "\ts.corporateInformationTradeName  in ( SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber= '" + gsbh[0].approvalformMedicareNumber + "' ) \n" +
                    "\tAND s.socialsecurityexpenseDate = '" + sangyu + "' AND a.approvalformSubordinateToTheBlock = '" + area + "'");
                // 上月退休
                sqlsytx = await query("select  count(*) as 'lastmonth'  from certificatelaborcontract where corporateInformationTradeName  in ( SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber= '" + gsbh[0].approvalformMedicareNumber + "' )  and " +
                    "certificatelaborcontractRemark = '退休' and certificatelaborcontractTerminationTime IN " +
                    "(select employeeregistrationformWorkTime from employeeregistrationform where employeeregistrationformWorkTime like '%" + sangyu + "%')")
            }
            /*
            * sqltbr:
            *   filName-填表人
            * sqljbxx:
            *   approvalformLawPerson-法人代表
            *   approvalformBusinessLicenseCode-编码
            *   approvalformBankOfDeposit-开户行
            *   approvalformBankAccount-账号
            *   approvalformRegisterMoney-注册资金
            *   approvalformCurrentHeadcount-职工人数
            *   approvalformOfficeTel-办公电话
            * sqlby：（本月）
            *   Numberstaff-在职职工人数
            *   Paymentmedicals-单位缴纳（医疗）
            *   Individualcontribution-个人缴纳（医疗）
            *   Basicinsurance-基本医疗保险费
            *   socialinsurance
            *   seriousillnessunit-大病单位缴纳
            *   seriousillnessindividual-大病个人缴纳
            *   illnessfees-大病统筹费
            *   socialinsurance-缴纳社会保险费合计（元）
            * sqltx：（退休）
            *   Retiremonth-本月退休人数
            * sqlzj:（增加）
            *   Increase-增加人数
            * sqljs：（减少）
            *   reduce-减少人数
            * sqlsy:（上月）
            *   grosssalary-工资总额
            *   numberemployees-在职职工人数
            *   unitpayment-单位缴纳（医疗）
            *   individualpayment-个人缴纳（医疗）
            *   totalsocialpaid
            *   basicmedicalpremium-基本医疗保险费
            *   seriousillnesspayment-单位缴纳（大病）
            *   seriousillnesspersonal-个人缴纳（大病）
            *   seriousillnessfee-大病统筹费
            *   totalsocialpaid-缴纳社会保险费合计（元）
            * sqlsytx:（上月退休）
            *   lastmonth-上月退休
            * */
            //
            if (gsbh.length > 0 && sqlby.length > 0 && sqlby[0].Numberstaff != 0) {
                return ({
                    state: stat.succeed,
                    data: sqljbxx,
                    sqltbr: sqltbr,
                    sqlby: sqlby,
                    sqltx: sqltx,
                    sqlzj: sqlzj,
                    sqljs: sqljs,
                    sqlsy: sqlsy,
                    sqlsytx: sqlsytx
                });
            } else {
                return {state: stat.defeated};
            }
        } else {
            return ({state: stat.mygs});
        }
    } catch (e) {
        Logger.error("----service  / report  /  YuxianMedical ---------", e);
        return {state: stat.defeated};
    }
}

// 阳泉市参保单位缴纳医疗保险费变动表（增加）
export async function selyangquan(company, pageIndex, pageSize, bbtime) {
    try {
        // 填表人
        let sqltbr = await query("SELECT filName\n" +
            "FROM filler\n" +
            "WHERE filType = '医保(市区，城区，矿区,郊区)' ");
        // 根据公司查询公司编号
        let gsbh = await query("select approvalformMedicareNumber from approvalform \n" +
            "\twhere approvalformTradeName = '" + company + "' and approvalformSubordinateToTheBlock = '市区'");
        if (gsbh.length > 0) {
            // 本月 法人代表/编码/开户行/账号/注册资金、职工人数/办公电话
            let sqljbxx = await query("SELECT \n" +
                "approvalformLawPerson,\n" +
                "approvalformBusinessLicenseCode,\n" +
                "approvalformBankOfDeposit,\n" +
                "approvalformBankAccount,\n" +
                "approvalformRegisterMoney,\n" +
                "approvalformCurrentHeadcount,\n" +
                "approvalformOfficeTel\n" +
                "FROM `approvalform` WHERE approvalformTradeName = '" + company + "'");
            let selyq = [];
            selyq = await query("SELECT DISTINCT\n" +
                "\te.employeeregistrationformIDNumber,\n" +// 身份证号
                "\te.employeeregistrationformName,\n" +// 姓名
                "\te.employeeregistrationformSex,\n" +// 性别
                "\te.employeeregistrationformNationality,\n" +// 民族
                "\te.employeeregistrationformDateOfBirth,\n" +// 出生年月
                "\te.employeeregistrationformWorkTime,\n" +// 参加工作日期
                "\te.employeeregistrationform,\n" +// 文化程度
                "\te.employeeregistrationformMaritalStatus,\n" +// 婚姻状况
                "\te.employeeregistrationformCategory,\n" +// 户口性质
                "\ts.socialsecurityexpenseMIBAdjustment,\n" +// 月缴费基数
                "\ts.socialsecurityexpenseAUAAMInsurance,\n" +// 医疗 单位缴费
                "\ts.socialsecurityexpenseAPAAMInsurance,\n" +// 医疗 个人缴费
                "\ts.socialsecurityexpenseASIOAUAmount,\n" +// 大病 单位缴费
                "\ts.socialsecurityexpenseAPAASIWhole,\n" +// 大病 个人缴费
                "\te.employeeregistrationformRemarks,\n" +// 增加原因
                "\te.employeeregistrationformFileNumber " +// 备注(员工档案编号)
                "FROM\n" +
                "\temployeeregistrationform e\n" +
                "\tNATURAL LEFT JOIN socialsecurityexpense s\n" +
                "\tNATURAL LEFT JOIN approvalform a \n" +
                "WHERE\n" +
                "\te.corporateInformationTradeName IN ( SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber = '" + gsbh[0].approvalformMedicareNumber + "' )  \n" +
                "\tAND s.socialsecurityexpenseDate LIKE '%" + bbtime + "%' \n" +
                "\tAND e.employeeregistrationformWorkTime like '" + bbtime + "%'\n" +
                "\tAND e.employe = 0" +
                "\tLIMIT " + (pageIndex - 1) + ",\n" +
                "\t" + pageSize);
            //总页数
            const pageCount = Math.ceil(selyq.length / pageSize);
            //总数据
            const Total = selyq.length;
            /*
            * sqltbr:（填表人）
            *   filName-填表人
            * sqljbxx:
            *   approvalformLawPerson-法人代表
            *   approvalformBusinessLicenseCode-编码
            *   approvalformBankOfDeposit-开户行
            *   approvalformBankAccount-账号
            *   approvalformRegisterMoney-注册资金
            *   approvalformCurrentHeadcount-职工人数
            *   approvalformOfficeTel-办公电话
            * selyq
            *   employeeregistrationformIDNumber-身份证号
            *   employeeregistrationformName-姓名
            *   employeeregistrationformSex-性别
            *   employeeregistrationformNationality-民族
            *   employeeregistrationformDateOfBirth-出生年月
            *   employeeregistrationformWorkTime-参加工作日期
            *   employeeregistrationform-文化程度
            *   employeeregistrationformMaritalStatus-婚姻状况
            *   employeeregistrationformCategory-户口性质
            *   socialsecurityexpenseMIBAdjustment-月缴费基数
            *   socialsecurityexpensePICIUnits-工伤 单位缴费比例
            *   socialsecurityexpensePMIUnits-工伤 单位缴费
            *   socialsecurityexpensePMIUnits-生育 单位缴费比例
            *   socialsecurityexpenseAUAABInsurance-生育 单位缴费
            *   employeeregistrationformRemarks-增加原因
            *   employeeregistrationformFileNumber-备注(员工档案编号)
            * */
            //
            if (selyq.length > 0) {
                return {
                    state: stat.succeed,
                    data: selyq,
                    page: pageCount,
                    total: Total,
                    sqltbr: sqltbr,
                    sqljbxx: sqljbxx
                };
            } else {
                return {state: stat.defeated};
            }
        } else {
            return ({state: stat.mygs});
        }
    } catch (e) {
        Logger.error("----service  / report  /  selyangquan ---------", e)
        return {state: stat.defeated};
    }
}

// 阳泉市参保单位缴纳医疗保险费变动表（减少）
export async function selyangquanreduce(company, pageIndex, pageSize, bbtime) {
    try {
        // 填表人
        let sqltbr = await query("SELECT filName\n" +
            "FROM filler\n" +
            "WHERE filType = '医保(市区，城区，矿区,郊区)' ");
        // 把传入的时间改成上月时间
        const cal = new Calendar(bbtime);
        cal.add(-1, CalendarTypes.MONTH);
        let sangyu = cal.toFormat('yyyy-MM')
        // 根据公司查询公司编号
        let gsbh = await query("select approvalformMedicareNumber from approvalform \n" +
            "\twhere approvalformTradeName = '" + company + "'");
// 本月 法人代表/编码/开户行/账号/注册资金、职工人数/办公电话
        let sqljbxx = await query("SELECT \n" +
            "approvalformLawPerson,\n" +
            "approvalformBusinessLicenseCode,\n" +
            "approvalformBankOfDeposit,\n" +
            "approvalformBankAccount,\n" +
            "approvalformRegisterMoney,\n" +
            "approvalformCurrentHeadcount,\n" +
            "approvalformOfficeTel\n" +
            "FROM `approvalform` WHERE approvalformTradeName = '" + company + "' AND approvalformSubordinateToTheBlock = '市区'");
        let selyq = await query("SELECT DISTINCT\n" +
            "\te.employeeregistrationformIDNumber,\n" +// 身份证号
            "\te.employeeregistrationformName,\n" +// 姓名
            "\te.employeeregistrationformSex,\n" +// 性别
            "\te.employeeregistrationformNationality,\n" +// 民族
            "\te.employeeregistrationformDateOfBirth,\n" +// 出生年月
            "\te.employeeregistrationformWorkTime,\n" +// 参加工作日期
            "\te.employeeregistrationform,\n" +// 文化程度
            "\te.employeeregistrationformMaritalStatus,\n" +// 婚姻状况
            "\te.employeeregistrationformCategory,\n" +// 户口性质
            "\ts.socialsecurityexpenseMIBAdjustment,\n" +// 月缴费技术
            "\ts.socialsecurityexpenseMIUPProportion,\n" +// 医疗 单位缴费比例
            "\ts.socialsecurityexpenseAPMIUnit,\n" +// 医疗 单位缴费
            "\ts.socialsecurityexpensePMIUnits,\n" +// 生育 单位缴费比例
            "\ts.socialsecurityexpenseAUAABInsurance,\n" +// 生育 单位缴费
            "\tc.certificatelaborcontractRemark,\n" +// 减少原因
            "\te.employeeregistrationformFileNumber\n" +// 备注
            "FROM\n" +
            "\temployeeregistrationform e\n" +
            "\tNATURAL LEFT JOIN socialsecurityexpense s\n" +
            "\tNATURAL LEFT JOIN approvalform a\n" +
            "\tNATURAL LEFT JOIN certificatelaborcontract c\n" +
            "WHERE\n" +
            "\te.corporateInformationTradeName in ( SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber= '" + gsbh[0].approvalformMedicareNumber + "' )  \n" +
            "\tAND a.approvalformSubordinateToTheBlock = '市区' \n" +
            "\tAND s.socialsecurityexpenseDate LIKE '%" + sangyu + "%' \n" +
            "\tAND e.employeeregistrationformWorkTime like '" + sangyu + "%'\n" +
            "\tAND e.employe = 1" +
            "\tLIMIT " + (pageIndex - 1) + ",\n" +
            "\t" + pageSize);
        //总页数
        const pageCount = Math.ceil(selyq.length / pageSize);
        //总数据
        const Total = selyq.length;
        /*
        * sqltbr：（填表人）
        *   filName-填表人
        * sqljbxx:
        *   approvalformLawPerson-法人代表
        *   approvalformBusinessLicenseCode-编码
        *   approvalformBankOfDeposit-开户行
        *   approvalformBankAccount-账号
        *   approvalformRegisterMoney-注册资金
        *   approvalformCurrentHeadcount-职工人数
        *   approvalformOfficeTel-办公电话
        * selyq
        *   employeeregistrationformIDNumber-身份证号
        *   employeeregistrationformName-姓名
        *   employeeregistrationformSex-性别
        *   employeeregistrationformNationality-民族
        *   employeeregistrationformDateOfBirth-出生年月
        *   employeeregistrationformWorkTime-参加工作日期
        *   employeeregistrationform-文化程度
        *   employeeregistrationformMaritalStatus-婚姻状况
        *   employeeregistrationformCategory-户口性质
        *   socialsecurityexpenseMIBAdjustment-月缴费基数
        *   socialsecurityexpensePICIUnits-工伤 单位缴费比例
        *   socialsecurityexpensePMIUnits-工伤 单位缴费
        *   socialsecurityexpensePMIUnits-生育 单位缴费比例
        *   socialsecurityexpenseAUAABInsurance-生育 单位缴费
        *   certificatelaborcontractRemark-减少原因
        *   employeeregistrationformFileNumber-备注(员工档案编号)
        * */
        //
        if (selyq.length > 0) {
            return {state: stat.succeed, data: selyq, page: pageCount, total: Total, sqltbr: sqltbr, sqljbxx: sqljbxx};
        } else {
            return {state: stat.defeated};
        }
    } catch (e) {
        Logger.error("----service  / report  /  selyangquanreduce ---------", e);
        return {state: stat.defeated};
    }
}

// 阳泉市社会保险缴费申报表
export async function selyangquanshbx(company, ddtime, area) {
    try {
        // 把传入的时间改成上月时间
        const cal = new Calendar(ddtime);
        cal.add(-1, CalendarTypes.MONTH);
        let sangyu = cal.toFormat('yyyy-MM')
        // 根据公司查询公司编号
        let gsbh = await query("select approvalformMedicareNumber from approvalform \n" +
            "\twhere approvalformTradeName = '" + company + "' AND approvalformSubordinateToTheBlock = '" + area + "'");
        let sqltbr = {};
        if (area == '盂县' || area == '平定县') {
            // 填表人
            sqltbr = await query("SELECT filName\n" +
                "FROM filler\n" +
                "WHERE filType = '医疗(盂县,平定)' ");
        } else {
            sqltbr = await query("SELECT filName FROM filler WHERE filType = '医保(市区，城区，矿区,郊区)'")
        }
        if (gsbh.length > 0) {
            // 本月 法人代表/编码/开户行/账号/注册资金、职工人数/办公电话
            let sqljbxx = await query("SELECT \n" +
                "approvalformLawPerson,\n" +
                "approvalformBusinessLicenseCode,\n" +
                "approvalformBankOfDeposit,\n" +
                "approvalformBankAccount,\n" +
                "approvalformRegisterMoney,\n" +
                "approvalformCurrentHeadcount,\n" +
                "approvalformOfficeTel\n" +
                "FROM `approvalform` WHERE approvalformTradeName = '" + company + "'");
            // 本月 在职人数
            let sqlbyzz = await query("SELECT DISTINCT\n" +
                "\tCOUNT(*) as 'zzrs'\n" +
                "FROM\n" +
                "\t`socialsecurityexpense` \n" +
                "WHERE\n" +
                "\tsocialsecurityexpenseDate = '" + ddtime + "' \n" +
                "\tAND corporateInformationTradeName = '" + company + "'");
            /*
            * 本月
            * 缴纳医疗保险费合计
            * 基本医疗保险费合计
            *    单位缴费
            *    个人缴费
            * 大病统筹费合计
            *    单位缴费
            *    个人缴费
            * */
            let sqlbyyl = await query("SELECT\n" +
                "(socialsecurityexpenseAICMIntotal+socialsecurityexpenseMIPIPtotal) as 'Totalmedicalpaid',\n" +// 缴纳医疗保险费合计
                "\tsocialsecurityexpenseAICMIntotal as 'Totalmedicalpremiums',\n" +// 基本医疗保险费合计
                "\tsocialsecurityexpenseAPMIUnit as 'Medicalunitamount',\n" +// 医疗保险单位缴费金额
                "\tsocialsecurityexpenseAICMInsurance as 'MedicalPersonalAmount',\n" +// 医疗保险个人缴费金额
                "\tsocialsecurityexpenseMIPIPtotal as 'Totalseriousillness',\n" +// 大病合计缴费金额
                "\tsocialsecurityexpenseAPMDCUnit as 'seriousunitamount',\n" +// 大病单位缴费金额
                "\tsocialsecurityexpenseMIPIPAmount as 'Seriouspaymentamount'\n" +// 大病个人缴费金额
                "FROM\n" +
                "\tsocialsecuritydetail \n" +
                "WHERE\n" +
                "\tcorporateInformationTradeName = '" + company + "' \n" +
                "\tAND socialsecurityexpenseDate = '" + ddtime + "'\n" +
                "\tAND corporateInformationTradeName IN ( SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber = '" + gsbh[0].approvalformMedicareNumber + "' )");
            // 增加 减少
            let sqlzj = await query("SELECT DISTINCT\n" +
                "\ts.socialsecurityexpenseAICMInsurance,\n" +// 个人
                "\ts.socialsecurityexpenseAPMIUnit, \n" +// 单位
                "s.socialsecurityexpenseAPMDCUnit," +// 大病单位
                "s.socialsecurityexpenseMIPIPAmount\n" +// 大病个人
                "FROM\n" +
                "\temployeeregistrationform e\n" +
                "\tLEFT JOIN socialsecurityexpense s ON s.employeeregistrationformIDNumber = e.employeeregistrationformIDNumber\n" +
                "\tLEFT JOIN medicalinsurance m ON s.employeeregistrationformIDNumber = m.employeeregistrationformIDNumber \n" +
                "WHERE\n" +
                "\te.corporateInformationTradeName = '" + company + "' \n" +
                "\tAND m.EIIToDate LIKE '" + ddtime + "%' \n" +
                "\tOR m.EIITgoDate LIKE '" + ddtime + "%'");
            let sqljs = await query("SELECT DISTINCT\n" +
                "\ts.employeeregistrationformName,\n" +
                "\ts.socialsecurityexpenseAICMInsurance,\n" +// 医疗个人
                "\ts.socialsecurityexpenseAPMIUnit," +// 医疗单位
                "s.socialsecurityexpenseAPMDCUnit," +// 大病单位
                "s.socialsecurityexpenseMIPIPAmount\n" +// 大病个人
                "FROM\n" +
                "\tsocialsecurityexpense s\n" +
                "\tLEFT JOIN certificatelaborcontract c ON s.employeeregistrationformIDNumber = c.employeeregistrationformIDNumber \n" +
                "WHERE\n" +
                "\tc.certificatelaborcontractTerminationTime LIKE '" + ddtime + "%' \n" +
                "\tAND s.socialsecurityexpenseDate = '" + sangyu + "' \n" +
                "\tAND c.corporateInformationTradeName = '" + company + "'");
            // 增加减少 人数
            let zjrs = sqlzj.length;
            let jsrs = sqljs.length;
            // 上月 在职人数
            let sqlsyzz = await query("SELECT DISTINCT\n" +
                "\tCOUNT(*) as 'zzrs'\n" +
                "FROM\n" +
                "\t`socialsecurityexpense` \n" +
                "WHERE\n" +
                "\tsocialsecurityexpenseDate = '" + sangyu + "' \n" +
                "\tAND corporateInformationTradeName = '" + company + "'");
            /*
            * 上月
            * 缴纳医疗保险费合计
            * 基本医疗保险费合计
            *    单位缴费
            *    个人缴费
            * 大病统筹费合计
            *    单位缴费
            *    个人缴费
            * */
            let sqlsyyl = await query("SELECT\n" +
                "(socialsecurityexpenseAICMIntotal+socialsecurityexpenseMIPIPtotal) as 'Totalmedicalpaid',\n" +// 缴纳医疗保险费合计
                "\tsocialsecurityexpenseAICMIntotal as 'Totalmedicalpremiums',\n" +// 基本医疗保险费合计
                "\tsocialsecurityexpenseAPMIUnit as 'Medicalunitamount',\n" +// 医疗保险单位缴费金额
                "\tsocialsecurityexpenseAICMInsurance as 'MedicalPersonalAmount',\n" +// 医疗保险个人缴费金额
                "\tsocialsecurityexpenseMIPIPtotal as 'Totalseriousillness',\n" +// 大病合计缴费金额
                "\tsocialsecurityexpenseAPMDCUnit as 'seriousunitamount',\n" +// 大病单位缴费金额
                "\tsocialsecurityexpenseMIPIPAmount as 'Seriouspaymentamount'\n" +// 大病个人缴费金额
                "FROM\n" +
                "\tsocialsecuritydetail \n" +
                "WHERE\n" +
                "\tcorporateInformationTradeName = '" + company + "' \n" +
                "\tAND socialsecurityexpenseDate = '" + sangyu + "'\n" +
                "\tAND corporateInformationTradeName IN ( SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber = '" + gsbh[0].approvalformMedicareNumber + "' )");
            // console.log(sqljbxx);
            /*
            * sqltbr: 填表人
            *   filName
            * sqljbxx:
            *   approvalformLawPerson-法人代表
            *   approvalformBusinessLicenseCode-编码
            *   approvalformBankOfDeposit-开户行
            *   approvalformBankAccount-账号
            *   approvalformRegisterMoney-注册资金
            *   approvalformCurrentHeadcount-职工人数
            *   approvalformOfficeTel-办公电话
            * sqlbyzz： 在职人数
            *   zzrs
            * sqlbyyl: 本月 各个金额
            *   Totalmedicalpaid 缴纳医疗保险费合计
            *   Totalmedicalpremiums 基本医疗保险费合计
            *   Medicalunitamount 医疗保险单位缴费金额
            *   MedicalPersonalAmount 医疗保险个人缴费金额
            *   Totalseriousillness 大病合计缴费金额
            *   seriousunitamount 大病单位缴费金额
            *   Seriouspaymentamount 大病个人缴费金额
            * sqlzj： 增加 各个金额
            *   socialsecurityexpenseAICMInsurance 医疗个人
            *   socialsecurityexpenseAPMIUnit 医疗单位
            *   socialsecurityexpenseAPMDCUnit 大病单位
            *   socialsecurityexpenseMIPIPAmount 大病个人
            * sqljs：减少 各个金额
            *   socialsecurityexpenseAICMInsurance 医疗个人
            *   socialsecurityexpenseAPMIUnit 医疗单位
            *   socialsecurityexpenseAPMDCUnit 大病单位
            *   socialsecurityexpenseMIPIPAmount 大病个人
            * zjrs 增加 人数
            * jsrs 减少 人数
            * sqlsyzz： 在职人数
            *   zzrs
            * sqlsyyl: 上月 各个金额
            *   Totalmedicalpaid 缴纳医疗保险费合计
            *   Totalmedicalpremiums 基本医疗保险费合计
            *   Medicalunitamount 医疗保险单位缴费金额
            *   MedicalPersonalAmount 医疗保险个人缴费金额
            *   Totalseriousillness 大病合计缴费金额
            *   seriousunitamount 大病单位缴费金额
            *   Seriouspaymentamount 大病个人缴费金额
            * */
            if (sqlbyzz.length > 0 && sqlbyyl.length > 0) {
                return ({
                    state: stat.succeed, sqltbr: sqltbr, sqljbxx: sqljbxx,
                    sqlbyzz: sqlbyzz, sqlbyyl: sqlbyyl,
                    sqlzj: sqlzj, sqljs: sqljs,
                    zjrs: zjrs, jsrs: jsrs, sqlsyzz: sqlsyzz,
                    sqlsyyl: sqlsyyl
                })
            } else {
                return ({state: stat.defeated})
            }
        } else {
            return ({state: stat.mygs});
        }
    } catch (e) {
        Logger.error("----service  / report  /  selyangquanshbx ---------", e)
        return {state: stat.defeated};
    }
}

//=====================================================================================================
// 职工基本医疗保险参保登记表（增减表）
export async function selzgjibyl(company, bbtime, pageIndex, pageSize, area) {
    try {
        // 填表人
        let sqltbr = await query("SELECT filName\n" +
            "FROM filler\n" +
            "WHERE filType = '医疗(盂县,平定)' ");
        // 把传入的时间改成上月时间
        const cal = new Calendar(bbtime);
        cal.add(-1, CalendarTypes.MONTH);
        let sangyu = cal.toFormat('yyyy-MM')
        let gsbh = await query("select approvalformMedicareNumber from approvalform \n" +
            "\twhere approvalformTradeName = '" + company + "' AND approvalformSubordinateToTheBlock = '" + area + "'");
        // 本月 法人代表/编码/开户行/账号/注册资金、职工人数/办公电话
        let sqljbxx = await query("SELECT DISTINCT \n" +
            "approvalformLawPerson,\n" +
            "approvalformBusinessLicenseCode,\n" +
            "approvalformBankOfDeposit,\n" +
            "approvalformBankAccount,\n" +
            "approvalformRegisterMoney,\n" +
            "approvalformCurrentHeadcount,\n" +
            "approvalformOfficeTel\n" +
            "FROM `approvalform` WHERE approvalformTradeName = '" + company + "' AND approvalformSubordinateToTheBlock = '" + area + "'");
        if (gsbh.length > 0) {
            // 增加
            let sqlzj = await query("SELECT DISTINCT\n" +
                "\te.employeeregistrationformFileNumber AS 'MyNumber',\n" +// 员工编号
                "\te.employeeregistrationformName AS 'empName',\n" +// 姓名
                "\t'居民身份证' AS 'ResidentIdentityCard',\n" +// 居民身份证
                "\te.employeeregistrationformIDNumber AS 'identificationNumber',\n" +// 身份证号
                "\te.employeeregistrationformNationality AS 'nationality',\n" +// 民族
                "\te.employeeregistrationformSex AS 'gender',\n" +// 性别
                "\te.employeeregistrationformDateOfBirth AS 'dateofbirth',\n" +// 出生年月
                "\te.employeeregistrationformWorkTime AS 'timeinwork',\n" +// 参加工作时间
                "\ts.socialsecurityexpenseDate AS 'Enrollmenttime',\n" +// 参保时间
                "\t'√' AS 'basicmedicalcare',\n" +// 基本医疗
                "\t'√' AS 'Criticalillnessinsurance',\n" +// 大病保险
                "\te.employeeregistrationformRemarks AS 'changecategory',\n" +// 变更类别
                "\ts.socialsecurityexpenseAPAAMInsurance AS 'salary',\n" +// 申报在职（退休）工资（元/月）
                "\te.employeeregistrationfromPhone as 'phone' \n" +// 手机号
                "FROM\n" +
                "\temployeeregistrationform e\n" +
                "\tLEFT JOIN socialsecurityexpense s ON e.employeeregistrationformIDNumber = s.employeeregistrationformIDNumber\n" +
                "\tLEFT JOIN medicalinsurance m ON s.employeeregistrationformIDNumber = m.employeeregistrationformIDNumber \n" +
                "WHERE\n" +
                "\te.corporateInformationTradeName = '" + company + "' \n" +
                "\tAND m.EIIToDate LIKE '" + bbtime + "%' \n" +
                "\tOR m.EIITgoDate LIKE '" + bbtime + "%' \n" +
                "GROUP BY\n" +
                "\te.employeeregistrationformId");
            // 减少
            let sqljs = await query("SELECT DISTINCT\n" +
                "\te.employeeregistrationformFileNumber AS 'MyNumber',\n" +// 员工编号
                "\te.employeeregistrationformName AS 'empName',\n" +// 姓名
                "\t'居民身份证' AS 'ResidentIdentityCard',\n" +// 居民身份证
                "\te.employeeregistrationformIDNumber AS 'identificationNumber',\n" +// 身份证号
                "\te.employeeregistrationformNationality AS 'nationality',\n" +// 民族
                "\te.employeeregistrationformSex AS 'gender',\n" +// 性别
                "\te.employeeregistrationformDateOfBirth AS 'dateofbirth',\n" +// 出生年月
                "\te.employeeregistrationformWorkTime AS 'timeinwork',\n" +// 参加工作时间
                "\tc.certificatelaborcontractTerminationTime AS 'Terminationtime',\n" +// 终止合同时间
                "\ts.socialsecurityexpenseDate AS 'Enrollmenttime',\n" +// 参保时间
                "\t'√' AS 'basicmedicalcare',\n" +// 基本医疗
                "\t'√' AS 'Criticalillnessinsurance',\n" +// 大病保险
                "\tc.certificatelaborcontractRemark AS 'changecategory',\n" +// 变更类别
                "\ts.socialsecurityexpenseAPAAMInsurance AS 'salary', \n" +// 申报在职（退休）工资（元/月）
                "\te.employeeregistrationfromPhone as 'phone' \n" +// 手机号
                "FROM\n" +
                "certificatelaborcontract c\n" +
                "\tLEFT JOIN socialsecurityexpense s ON c.employeeregistrationformIDNumber = s.employeeregistrationformIDNumber\n" +
                "\tLEFT JOIN employeeregistrationform e ON s.employeeregistrationformIDNumber = e.employeeregistrationformIDNumber \n" +
                "WHERE\n" +
                "\tc.certificatelaborcontractTerminationTime LIKE '" + bbtime + "%' \n" +
                "\tAND s.socialsecurityexpenseDate = '" + sangyu + "' \n" +
                "\tAND c.corporateInformationTradeName = '" + company + "' \n" +
                "GROUP BY\n" +
                "\te.employeeregistrationformId");
            // 接收两个数组对象
            let sqlhzxg = sqlzj.concat(sqljs);
            //总页数
            const pageCount = Math.ceil(sqlhzxg.length / pageSize);
            //总数据
            const Total = sqlhzxg.length;
            /*
            * sqljbxx:
            *   approvalformLawPerson-法人代表
            *   approvalformBusinessLicenseCode-编码
            *   approvalformBankOfDeposit-开户行
            *   approvalformBankAccount-账号
            *   approvalformRegisterMoney-注册资金
            *   approvalformCurrentHeadcount-职工人数
            *   approvalformOfficeTel-办公电话
            * sqlhzxg:
            *   MyNumber-员工编号
            *   empName-姓名
            *   ResidentIdentityCard-居民身份证
            *   identificationNumber-身份证号
            *   nationality-民族
            *   gender-性别
            *   dateofbirth-出生年月
            *   timeinwork-参加工作时间
            *   Enrollmenttime-参保时间
            *   Terminationtime-终止合同时间
            *   basicmedicalcare-基本医疗
            *   Criticalillnessinsurance-大病保险
            *   changecategory-变更类别
            *   salary-申报在职（退休）工资（元/月）
            *   phone-手机号
            * pageCount: 总页数
            * Total: 总数据
            * */
            //
            if (sqlhzxg.length > 0) {
                return ({state: stat.succeed, data: sqlhzxg, pageCount: pageCount, Total: Total});
            } else {
                return ({state: stat.defeated});
            }
        } else {
            // 没有这个公司
            return ({state: stat.mygs});
        }
    } catch (e) {
        Logger.error("----service  / report  /  selzgjibyl ---------", e)
        return {state: stat.defeated};
    }
}

// 阳泉市平定县参保单位缴纳失业保险费人员增（减）变动表
export async function selpdcbdwsy(company, bbtime, pageIndex, pageSize) {
    try {
        // 填表人
        let sqltbr = await query("SELECT filName\n" +
            "FROM filler\n" +
            "WHERE filType = '失业' ");
        let gsbh = await query("select approvalformUnemploymentNumber from approvalform \n" +
            "\twhere approvalformTradeName = '" + company + "' and approvalformSubordinateToTheBlock='平定县'");
        //上月日期
        let rq = bbtime;
        const cal = new Calendar(rq);
        cal.add(-1, CalendarTypes.MONTH);
        let ctm = cal.toFormat('yyyy-MM')
// 本月 法人代表/编码/开户行/账号/注册资金、职工人数/办公电话
        let sqljbxx = await query("SELECT \n" +
            "approvalformLawPerson,\n" +
            "approvalformBusinessLicenseCode,\n" +
            "approvalformBankOfDeposit,\n" +
            "approvalformBankAccount,\n" +
            "approvalformRegisterMoney,\n" +
            "approvalformCurrentHeadcount,\n" +
            "approvalformOfficeTel\n" +
            "FROM `approvalform` WHERE approvalformTradeName = '" + company + "' AND approvalformSubordinateToTheBlock ='平定县'");
        let sqlpdsybx = '';
        let sqlpdsyjs = '';
        if (gsbh.length > 0) {
            sqlpdsybx = await query("SELECT DISTINCT e.employeeregistrationformName,e.employeeregistrationformNationality,\n" +
                "e.employeeregistrationformIDNumber,e.employeeregistrationformSex,e.employeeregistrationformDateOfBirth,e.employeeregistrationfromPhone,\n" +
                "e.employeeregistrationformCategory,e.employeeregistrationformEmploymentForm,\n" +
                "e.employeeregistrationformWorkTime,e.employeeregistrationformRemarks,s.socialsecurityexpenseUIBWRBack\n" +
                "FROM employeeregistrationform e\n" +
                "LEFT JOIN socialsecurityexpense s ON e.employeeregistrationformIDNumber=s.employeeregistrationformIDNumber\n" +
                "LEFT JOIN unemploymentinsurance m ON s.employeeregistrationformIDNumber=m.employeeregistrationformIDNumber\n" +
                "WHERE e.corporateInformationTradeName IN (SELECT approvalformTradeName FROM approvalform WHERE approvalformUnemploymentNumber =" +
                " '" + gsbh[0].approvalformUnemploymentNumber + "') AND m.unemploymentinsuranceToDate LIKE '%" + bbtime + "%'" +
                " OR m.unemploymentinsurancegoDate LIKE'%" + bbtime + "%' GROUP BY e.employeeregistrationformId LIMIT " + (pageIndex - 1) * pageSize + "," + pageSize);
            sqlpdsyjs = await query("SELECT DISTINCT c.certificatelaborcontractName AS employeeregistrationformName,e.employeeregistrationformNationality,e.employeeregistrationformDateOfBirth,\n" +
                "e.employeeregistrationfromPhone,e.employeeregistrationformCategory,e.employeeregistrationformEmploymentForm,\n" +
                "c.employeeregistrationformIDNumber AS employeeregistrationformIDNumber,c.certificatelaborcontractSex AS employeeregistrationformSex,\n" +
                "e.employeeregistrationformWorkTime AS employeeregistrationformWorkTime,c.certificatelaborcontractReasonTermination AS employeeregistrationformRemarks,\n" +
                "s.socialsecurityexpenseUIBWRBack AS socialsecurityexpenseUIBWRBack\n" +
                "FROM certificatelaborcontract c \n" +
                "LEFT JOIN socialsecurityexpense s ON c.employeeregistrationformIDNumber=s.employeeregistrationformIDNumber\n" +
                "LEFT JOIN employeeregistrationform e ON s.employeeregistrationformIDNumber=e.employeeregistrationformIDNumber\n" +
                "WHERE c.certificatelaborcontractTerminationTime LIKE '%" + bbtime + "%' AND s.socialsecurityexpenseDate='" + ctm + "'" +
                "  AND c.corporateInformationTradeName IN (SELECT approvalformTradeName FROM approvalform WHERE approvalformUnemploymentNumber =" +
                " '" + gsbh[0].approvalformUnemploymentNumber + "') GROUP BY e.employeeregistrationformId LIMIT " + (pageIndex - 1) * pageSize + "," + pageSize);
        }
        let data = sqlpdsybx.concat(sqlpdsyjs)
        //总页数
        const pageCount = Math.ceil(data.length / pageSize);
        //总数据
        const Total = data.length;
        //
        if (data.length > 0) {
            return {state: stat.succeed, data: data, page: pageCount, total: Total, sqltbr: sqltbr, sqljbxx: sqljbxx};
        } else {
            return {state: stat.defeated};
        }
    } catch (e) {
        Logger.error("----service  / report  /  selpdcbdwsy ---------", e)
        return {state: stat.defeated};
    }
}

// 阳泉市郊区失业保险费人员增减花名表
export async function seljqsybx(company, bbtime, pageIndex, pageSize) {
    try {
        let gsbh = await query("select approvalformUnemploymentNumber from approvalform \n" +
            "\twhere approvalformTradeName = '" + company + "' and approvalformSubordinateToTheBlock='郊区'");
        //上月日期
        let rq = bbtime;
        const cal = new Calendar(rq);
        cal.add(-1, CalendarTypes.MONTH);
        let ctm = cal.toFormat('yyyy-MM')
        let sqljqsybx = '';
        let sqljs = '';
        if (gsbh.length > 0) {
            sqljqsybx = await query("SELECT DISTINCT e.employeeregistrationformName,e.employeeregistrationformNationality,\n" +
                "e.employeeregistrationformIDNumber,e.employeeregistrationformSex,e.employeeregistrationformDateOfBirth,e.employeeregistrationfromPhone,\n" +
                "e.employeeregistrationformCategory,e.employeeregistrationformEmploymentForm,e.employeeregistrationform,\n" +
                "e.employeeregistrationformPlaceOfDomicile,e.employeeregistrationformPersentAddress,\n" +
                "e.employeeregistrationformWorkTime,e.employeeregistrationformRemarks,s.socialsecurityexpenseUIBWRBack\n" +
                "FROM employeeregistrationform e\n" +
                "LEFT JOIN socialsecurityexpense s ON e.employeeregistrationformIDNumber=s.employeeregistrationformIDNumber\n" +
                "LEFT JOIN unemploymentinsurance m ON s.employeeregistrationformIDNumber=m.employeeregistrationformIDNumber\n" +
                "WHERE e.corporateInformationTradeName IN (SELECT approvalformTradeName FROM approvalform WHERE approvalformUnemploymentNumber =" +
                " '" + gsbh[0].approvalformUnemploymentNumber + "') AND m.unemploymentinsuranceToDate LIKE '%" + bbtime + "%'" +
                " OR m.unemploymentinsurancegoDate LIKE'%" + bbtime + "%' GROUP BY e.employeeregistrationformId LIMIT " + (pageIndex - 1) * pageSize + "," + pageSize);
            sqljs = await query("SELECT DISTINCT c.certificatelaborcontractName AS employeeregistrationformName,e.employeeregistrationformNationality,e.employeeregistrationformDateOfBirth,\n" +
                "e.employeeregistrationfromPhone,e.employeeregistrationformCategory,e.employeeregistrationformEmploymentForm,e.employeeregistrationform,\n" +
                "e.employeeregistrationformPlaceOfDomicile,e.employeeregistrationformPersentAddress,\n" +
                "c.employeeregistrationformIDNumber AS employeeregistrationformIDNumber,c.certificatelaborcontractSex AS employeeregistrationformSex,\n" +
                "e.employeeregistrationformWorkTime AS employeeregistrationformWorkTime,c.certificatelaborcontractReasonTermination AS employeeregistrationformRemarks,\n" +
                "s.socialsecurityexpenseUIBWRBack AS socialsecurityexpenseUIBWRBack\n" +
                "FROM certificatelaborcontract c \n" +
                "LEFT JOIN socialsecurityexpense s ON c.employeeregistrationformIDNumber=s.employeeregistrationformIDNumber\n" +
                "LEFT JOIN employeeregistrationform e ON s.employeeregistrationformIDNumber=e.employeeregistrationformIDNumber\n" +
                "WHERE c.certificatelaborcontractTerminationTime LIKE '%" + bbtime + "%' AND s.socialsecurityexpenseDate='" + ctm + "'" +
                "  AND c.corporateInformationTradeName IN (SELECT approvalformTradeName FROM approvalform WHERE approvalformUnemploymentNumber =" +
                " '" + gsbh[0].approvalformUnemploymentNumber + "') GROUP BY e.employeeregistrationformId LIMIT " + (pageIndex - 1) * pageSize + "," + pageSize);
        }
        let data = sqljqsybx.concat(sqljs)
        //总页数
        const pageCount = Math.ceil(data.length / pageSize);
        //总数据
        const Total = data.length;
        //
        if (data.length > 0) {
            return {state: stat.succeed, data: data, page: pageCount, total: Total};
        } else {
            return {state: stat.defeated};
        }
    } catch (e) {
        Logger.error("----service  / report  /  seljqsybx ---------", e)
        return {state: stat.defeated};
    }
}

// 阳泉市城区职工个人缴纳失业保险费花名表
export async function selcqzgsybx(company, bbtime, pageIndex, pageSize) {
    try {
        // 填表人
        let sqltbr = await query("SELECT filName\n" +
            "FROM filler\n" +
            "WHERE filType = '失业'");
        let gsbh = await query("select approvalformUnemploymentNumber from approvalform \n" +
            "\twhere approvalformTradeName = '" + company + "' AND approvalformSubordinateToTheBlock = '城区'");
        if (gsbh.length > 0) {
            // 本月 法人代表/编码/开户行/账号/注册资金、职工人数/办公电话
            let sqljbxx = await query("SELECT \n" +
                "approvalformLawPerson,\n" +
                "approvalformBusinessLicenseCode,\n" +
                "approvalformBankOfDeposit,\n" +
                "approvalformBankAccount,\n" +
                "approvalformRegisterMoney,\n" +
                "approvalformCurrentHeadcount,\n" +
                "approvalformOfficeTel\n" +
                "FROM `approvalform` WHERE approvalformTradeName = '" + company + "' AND approvalformSubordinateToTheBlock ='城区'");
            // 身份证号// 姓名// 性别// 出生年月// 参加工作使劲按// 开始缴费时间// 月缴费工资// 月缴费比例// 月缴费金额
            let sqlcqzgsybx = await query(" SELECT DISTINCT\n" +
                "e.employeeregistrationformIDNumber AS 'employeeregistrationformIDNumber',\n" +
                "e.employeeregistrationformName AS 'employeeregistrationformName',\n" +
                "e.employeeregistrationformSex AS 'employeeregistrationformSex',\n" +
                "e.employeeregistrationformDateOfBirth AS 'employeeregistrationformDateOfBirth',\n" +
                "e.employeeregistrationformWorkTime AS 'employeeregistrationformWorkTime',\n" +
                "e.employeeregistrationformWorkTime AS 'employeeregistrationformWorkTime',\n" +
                "s.socialsecurityexpenseUIBWRBack AS 'socialsecurityexpenseUIBWRBack',\n" +
                "s.socialsecurityexpenseUIICRatio AS 'socialsecurityexpenseUIICRatio',\n" +
                "s.socialsecurityexpenseAPAAUInsurance AS 'socialsecurityexpenseAPAAUInsurance' \n" +
                " FROM employeeregistrationform e " +
                " LEFT JOIN socialsecurityexpense s ON e.employeeregistrationformIDNumber=s.employeeregistrationformIDNumber\n" +
                " LEFT JOIN unemploymentinsurance m ON s.employeeregistrationformIDNumber=m.employeeregistrationformIDNumber\n" +
                " WHERE e.corporateInformationTradeName IN (SELECT approvalformTradeName FROM approvalform WHERE approvalformUnemploymentNumber =" +
                " '" + gsbh[0].approvalformUnemploymentNumber + "') AND m.unemploymentinsuranceToDate LIKE '%" + bbtime + "%'" +
                " OR m.unemploymentinsurancegoDate LIKE'%" + bbtime + "%' GROUP BY e.employeeregistrationformId LIMIT " + (pageIndex - 1) * pageSize + "," + pageSize);
            //总页数
            const pageCount = Math.ceil(sqlcqzgsybx.length / pageSize);
            //总数据
            const Total = sqlcqzgsybx.length;
            /*
            * sqlcqzgsybx
            *   employeeregistrationformIDNumber-身份证号
            *   employeeregistrationformName-姓名
            *   employeeregistrationformSex-性别
            *   employeeregistrationformDateOfBirth-出生年月
            *   employeeregistrationformWorkTime-参加工作时间
            *   employeeregistrationformWorkTime-开始缴费时间
            *   socialsecurityexpenseUIBWRBack-月缴费工资
            *   socialsecurityexpenseUIICRatio-月缴费比例
            *   socialsecurityexpenseAPAAUInsurance-月缴费金额
            * */
            //
            if (sqlcqzgsybx.length > 0) {
                return {
                    state: stat.succeed,
                    data: sqlcqzgsybx,
                    page: pageCount,
                    total: Total,
                    sqltbr: sqltbr,
                    sqljbxx: sqljbxx
                };
            } else {
                return {state: stat.defeated};
            }
        } else {
            return ({state: stat.mygs});
        }
    } catch (e) {
        Logger.error("----service  / report  /  selcqzgsybx ---------", e)
        return {state: stat.defeated};
    }
}

// ？？？？年？？月缴纳失业保险费人员增（减）花名表
export async function selsybxzj(company, bbtime, pageIndex, pageSize) {
    try {
        // 填表人
        let sqltbr = await query("SELECT filName\n" +
            "FROM filler\n" +
            "WHERE filType = '失业'  ");
        let gsbh = await query("select approvalformUnemploymentNumber from approvalform \n" +
            "\twhere approvalformTradeName = '" + company + "' and approvalformSubordinateToTheBlock='盂县'");
        //上月日期
        let rq = bbtime;
        const cal = new Calendar(rq);
        cal.add(-1, CalendarTypes.MONTH);
        let ctm = cal.toFormat('yyyy-MM')
        let sqlsybxjs = '';
        let sqlsybxzj = '';
        if (gsbh.length > 0) {
            sqlsybxzj = await query("SELECT DISTINCT e.employeeregistrationformName,\n" +
                "e.employeeregistrationformIDNumber,e.employeeregistrationformSex,\n" +
                "e.employeeregistrationformWorkTime,e.employeeregistrationformRemarks,s.socialsecurityexpenseUIBWRBack \n" +
                "FROM employeeregistrationform e\n" +
                "LEFT JOIN socialsecurityexpense s ON e.employeeregistrationformIDNumber=s.employeeregistrationformIDNumber\n" +
                "LEFT JOIN unemploymentinsurance m ON s.employeeregistrationformIDNumber=m.employeeregistrationformIDNumber\n" +
                "WHERE e.corporateInformationTradeName IN (SELECT approvalformTradeName FROM approvalform WHERE approvalformUnemploymentNumber =" +
                " '" + gsbh[0].approvalformUnemploymentNumber + "') AND m.unemploymentinsuranceToDate LIKE '%" + bbtime + "%'" +
                " OR m.unemploymentinsurancegoDate LIKE'%" + bbtime + "%' GROUP BY e.employeeregistrationformId LIMIT " + (pageIndex - 1) * pageSize + "," + pageSize);
            sqlsybxjs = await query("SELECT DISTINCT c.certificatelaborcontractName AS employeeregistrationformName,\n" +
                "c.employeeregistrationformIDNumber AS employeeregistrationformIDNumber,c.certificatelaborcontractSex AS employeeregistrationformSex,\n" +
                "e.employeeregistrationformWorkTime AS employeeregistrationformWorkTime,c.certificatelaborcontractReasonTermination AS employeeregistrationformRemarks,\n" +
                "s.socialsecurityexpenseUIBWRBack AS socialsecurityexpenseUIBWRBack\n" +
                "FROM certificatelaborcontract c \n" +
                "LEFT JOIN socialsecurityexpense s ON c.employeeregistrationformIDNumber=s.employeeregistrationformIDNumber\n" +
                "LEFT JOIN employeeregistrationform e ON s.employeeregistrationformIDNumber=e.employeeregistrationformIDNumber\n" +
                "WHERE c.certificatelaborcontractTerminationTime LIKE '%" + bbtime + "%' AND s.socialsecurityexpenseDate='" + ctm + "'" +
                "  AND c.corporateInformationTradeName IN (SELECT approvalformTradeName FROM approvalform WHERE approvalformUnemploymentNumber =" +
                " '" + gsbh[0].approvalformUnemploymentNumber + "') GROUP BY e.employeeregistrationformId LIMIT " + (pageIndex - 1) * pageSize + "," + pageSize);
        }
        let data = sqlsybxzj.concat(sqlsybxjs);
        //总页数
        const pageCount = Math.ceil(data.length / pageSize);
        //总数据
        const Total = data.length;
        //
        if (data.length > 0) {
            return {state: stat.succeed, data: data, page: pageCount, total: Total, sqltbr: sqltbr};
        } else {
            return {state: stat.defeated};
        }
    } catch (e) {
        Logger.error("----service  / report  /  selsybxzj ---------", e)
        return {state: stat.defeated};
    }
}

// 阳泉市职工个人缴纳失业保险 增加
export async function selzgsybxzj(company, bbtime, pageIndex, pageSize) {
    try {
// 填表人
        let sqltbr = await query("SELECT filName\n" +
            "FROM filler\n" +
            "WHERE filType = '失业' ");
        //获取上月时间
        let rq = bbtime
        const cal = new Calendar(rq);
        cal.add(-1, CalendarTypes.MONTH)
        let sangyu = cal.toFormat('yyyy-MM')
        // 根据公司查询公司编号
        let gsbh = await query("select approvalformUnemploymentNumber from approvalform \n" +
            "\twhere approvalformTradeName = '" + company + "'AND approvalformSubordinateToTheBlock not in (select approvalformSubordinateToTheBlock" +
            " from approvalform where approvalformSubordinateToTheBlock='平定县' or approvalformSubordinateToTheBlock = '盂县')");
        // 本月 法人代表/编码/开户行/账号/注册资金、职工人数/办公电话
        let sqljbxx = await query("SELECT \n" +
            "approvalformLawPerson,\n" +
            "approvalformBusinessLicenseCode,\n" +
            "approvalformBankOfDeposit,\n" +
            "approvalformBankAccount,\n" +
            "approvalformRegisterMoney,\n" +
            "approvalformCurrentHeadcount,\n" +
            "approvalformOfficeTel\n" +
            "FROM `approvalform` WHERE approvalformTradeName = '" + company + "' AND approvalformSubordinateToTheBlock ='市区'");
        if (gsbh.length > 0) {
            let sqlzgsybxzj = await query("SELECT \n" +
                "e.employeeregistrationformName,\n" +
                "e.employeeregistrationformIDNumber, \n" +
                "e.employeeregistrationformSex, \n" +
                "e.employeeregistrationformDateOfBirth,\n" +
                "e.employeeregistrationformWorkTime,\n" +
                "s.socialsecurityexpenseUICBase,e.employeeregistrationformRemarks\n" +
                "   FROM employeeregistrationform e\n" +
                " LEFT JOIN socialsecurityexpense s ON e.employeeregistrationformIDNumber=s.employeeregistrationformIDNumber\n" +
                " LEFT JOIN unemploymentinsurance m ON s.employeeregistrationformIDNumber=m.employeeregistrationformIDNumber\n" +
                " WHERE e.corporateInformationTradeName IN (select approvalformTradeName from approvalform where approvalformUnemploymentNumber='"
                + gsbh[0].approvalformUnemploymentNumber + "') AND m.unemploymentinsuranceToDate LIKE '%" + bbtime + "%' " +
                "OR m.unemploymentinsurancegoDate LIKE'%" + bbtime + "%' GROUP BY e.employeeregistrationformId  LIMIT  " + (pageIndex - 1) * pageSize + "," + pageSize);
            //总页数
            const pageCount = Math.ceil(sqlzgsybxzj.length / pageSize);
            //总数据
            const total = sqlzgsybxzj.length;
            //
            if (sqlzgsybxzj.length > 0) {
                return {
                    state: stat.succeed,
                    data: sqlzgsybxzj,
                    page: pageCount,
                    total: total,
                    sqltbr: sqltbr,
                    sqljbxx: sqljbxx
                };
            } else {
                return {state: stat.defeated};
            }
        } else {
            return {state: stat.defeated};
        }
    } catch (e) {
        Logger.error("----service  / report  /  selzgsybxzj ---------", e)
        return {state: stat.defeated};
    }
}

// 阳泉市职工个人缴纳失业保险 减少
export async function selzgsybxjs(company, bbtime, pageIndex, pageSize) {
    try {
        //获取上月时间
        let rq = bbtime
        const cal = new Calendar(rq);
        cal.add(-1, CalendarTypes.MONTH)
        let sangyu = cal.toFormat('yyyy-MM')
        // 根据公司查询公司编号
        let gsbh = await query("select approvalformUnemploymentNumber from approvalform \n" +
            "\twhere approvalformTradeName = '" + company + "'AND approvalformSubordinateToTheBlock not in (select approvalformSubordinateToTheBlock" +
            " from approvalform where approvalformSubordinateToTheBlock='平定县' or approvalformSubordinateToTheBlock = '盂县')");
        if (gsbh.length > 0) {
            let sqlzgsybxzj = await query("SELECT \n" +
                "e.employeeregistrationformName,\n" +
                "e.employeeregistrationformIDNumber, \n" +
                "e.employeeregistrationformSex,\n" +
                "c.certificatelaborcontractContractPeriodStop,\n" +
                "c.certificatelaborcontractReasonTermination,\n" +
                "c.certificatelaborcontractRemark\n" +
                " FROM certificatelaborcontract c\n" +
                " LEFT JOIN socialsecurityexpense s ON c.employeeregistrationformIDNumber=s.employeeregistrationformIDNumber\n" +
                " LEFT JOIN employeeregistrationform e ON s.employeeregistrationformIDNumber=e.employeeregistrationformIDNumber\n" +
                " WHERE c.certificatelaborcontractTerminationTime LIKE '%" + bbtime + "%' AND s.socialsecurityexpenseDate='" + sangyu + "'" +
                " AND c.corporateInformationTradeName  IN (select approvalformTradeName from approvalform where approvalformUnemploymentNumber='"
                + gsbh[0].approvalformUnemploymentNumber + "') GROUP BY e.employeeregistrationformId  LIMIT  " + (pageIndex - 1) * pageSize + "," + pageSize);
            //总页数
            const pageCount = Math.ceil(sqlzgsybxzj.length / pageSize);
            //总数据
            const Total = sqlzgsybxzj.length;
            //
            if (sqlzgsybxzj.length > 0) {
                return {state: stat.succeed, data: sqlzgsybxzj, page: pageCount, total: Total};
            } else {
                return {state: stat.defeated};
            }
        } else {
            return {state: stat.defeated};
        }
    } catch (e) {
        Logger.error("----service  / report  /  selzgsybxjs ---------", e)
        return {state: stat.defeated};
    }
}

//----------------------------------------------------------------------------------------------------------------------
// 失业保险花名表
export async function selsybxhm(company, bbtime, pageIndex, pageSize) {
    try {
        let gsbh = await query("select approvalformUnemploymentNumber from approvalform \n" +
            "\twhere approvalformTradeName = '" + company + "' and approvalformSubordinateToTheBlock='郊区'");
        let sqlsybxhm = ''
        if (gsbh.length > 0) {
            sqlsybxhm = await query("SELECT DISTINCT e.employeeregistrationformName,e.employeeregistrationformIDNumber,e.employeeregistrationformSex,e.employeeregistrationformWorkTime,\n" +
                "s.socialsecurityexpenseUIBWRBack,s.socialsecurityexpenseAUAAUInsurance,s.socialsecurityexpenseAPAAUInsurance,s.socialsecurityexpenseATAUIPayment\n" +
                "FROM employeeregistrationform e\n" +
                "LEFT JOIN socialsecurityexpense s ON e.employeeregistrationformIDNumber=s.employeeregistrationformIDNumber\n" +
                "LEFT JOIN unemploymentinsurance m ON s.employeeregistrationformIDNumber=m.employeeregistrationformIDNumber\n" +
                "WHERE e.corporateInformationTradeName IN (SELECT approvalformTradeName FROM approvalform WHERE approvalformUnemploymentNumber =" +
                " '" + gsbh[0].approvalformUnemploymentNumber + "') AND m.unemploymentinsuranceToDate LIKE '%" + bbtime + "%' OR m.unemploymentinsurancegoDate LIKE'%" + bbtime + "%' GROUP BY e.employeeregistrationformId\n");
        }
        //总页数
        const pageCount = Math.ceil(sqlsybxhm.length / pageSize);
        //总数据
        const Total = sqlsybxhm.length;
        //
        if (sqlsybxhm.length > 0) {
            return {state: stat.succeed, data: sqlsybxhm, page: pageCount, total: Total};
        } else {
            return {state: stat.defeated};
        }
    } catch (e) {
        Logger.error("----service  / report  /  selsybxhm ---------", e)
        return {state: stat.defeated};
    }
}

// 阳泉市失业保险缴费申报表
export async function selsybxjf(company, bbtime) {
    try {
        //获取上月时间
        let rq = bbtime
        const cal = new Calendar(rq);
        cal.add(-1, CalendarTypes.MONTH)
        let sangyu = cal.toFormat('yyyy-MM')
        // 根据公司查询公司编号
        let gsbh = await query("select approvalformUnemploymentNumber from approvalform \n" +
            "\twhere approvalformTradeName = '" + company + "'AND approvalformSubordinateToTheBlock not in (select approvalformSubordinateToTheBlock" +
            " from approvalform where approvalformSubordinateToTheBlock='平定县' or approvalformSubordinateToTheBlock = '盂县')");
        // 填表人
        let sqltbr = await query("SELECT filName\n" +
            "FROM filler\n" +
            "WHERE filType = '失业' ");
        // 本月 法人代表/编码/开户行/账号/注册资金、职工人数/办公电话
        let sqljbxx = await query("SELECT \n" +
            "approvalformLawPerson,\n" +
            "approvalformBusinessLicenseCode,\n" +
            "approvalformBankOfDeposit,\n" +
            "approvalformBankAccount,\n" +
            "approvalformRegisterMoney,\n" +
            "approvalformCurrentHeadcount,\n" +
            "approvalformOfficeTel\n" +
            "FROM `approvalform` WHERE approvalformTradeName = '" + company + "' AND approvalformSubordinateToTheBlock not in (select approvalformSubordinateToTheBlock" +
            " from approvalform where approvalformSubordinateToTheBlock='平定县' or approvalformSubordinateToTheBlock = '盂县')");
        if (gsbh.length > 0) {
            //本月的缴费基数,金额
            let benyue = await query("select socialsecurityexpenseUICBase,socialsecurityexpenseAPUIUnit,socialsecurityexpenseUIICAmount,socialsecurityexpenseUIICtotal " +
                "from socialsecuritydetail where corporateInformationTradeName ='" + company + "' AND socialsecurityexpenseDate='" + bbtime + "' and corporateInformationTradeName IN ( SELECT approvalformTradeName FROM approvalform WHERE approvalformUnemploymentNumber = '" + gsbh[0].approvalformUnemploymentNumber + "') ")
            //上月的缴费基数,金额
            let shangyue = await query("select socialsecurityexpenseUICBase,socialsecurityexpenseAPUIUnit,socialsecurityexpenseUIICAmount,socialsecurityexpenseUIICtotal " +
                "from socialsecuritydetail where corporateInformationTradeName ='" + company + "' AND socialsecurityexpenseDate='" + sangyu + "' and corporateInformationTradeName IN ( SELECT approvalformTradeName FROM approvalform WHERE approvalformUnemploymentNumber = '" + gsbh[0].approvalformUnemploymentNumber + "') ")
            //上月的职工人数
            let shangpepo = await query("SELECT COUNT(*) as 'shangpepo' FROM employeeregistrationform e LEFT JOIN socialsecurityexpense s ON e.employeeregistrationformIDNumber=s.employeeregistrationformIDNumber\n" +
                "WHERE e.corporateInformationTradeName='" + company + "' AND s.socialsecurityexpenseDate= '" + sangyu + "' and e.corporateInformationTradeName IN ( SELECT approvalformTradeName FROM approvalform WHERE approvalformUnemploymentNumber = '" + gsbh[0].approvalformUnemploymentNumber + "')")
            //本月人数
            let benpeop = await query("SELECT COUNT(*) as 'benpeop' FROM employeeregistrationform e LEFT JOIN socialsecurityexpense s ON e.employeeregistrationformIDNumber=s.employeeregistrationformIDNumber\n" +
                "WHERE e.corporateInformationTradeName='" + company + "' AND s.socialsecurityexpenseDate= '" + bbtime + "' and e.corporateInformationTradeName IN ( SELECT approvalformTradeName FROM approvalform WHERE approvalformUnemploymentNumber = '" + gsbh[0].approvalformUnemploymentNumber + "')")
            //增加 基数，金额
            let jishuzj = await query("SELECT DISTINCT s.socialsecurityexpenseUIBWRBack,s.socialsecurityexpenseAUAAUInsurance," +
                "s.socialsecurityexpenseAPAAUInsurance,s.socialsecurityexpenseATAUIPayment FROM employeeregistrationform e\n" +
                "LEFT JOIN socialsecurityexpense s  ON s.employeeregistrationformIDNumber=e.employeeregistrationformIDNumber\n" +
                "LEFT JOIN unemploymentinsurance m ON s.employeeregistrationformIDNumber=m.employeeregistrationformIDNumber\n" +
                "WHERE e.corporateInformationTradeName IN (SELECT approvalformTradeName FROM approvalform\n" +
                "WHERE approvalformUnemploymentNumber = '" + gsbh[0].approvalformUnemploymentNumber + "') AND m.unemploymentinsuranceToDate LIKE '%" + bbtime + "%'\n" +
                "OR m.unemploymentinsurancegoDate LIKE'%" + bbtime + "%'")
            let jianshao = await query("SELECT DISTINCT s.socialsecurityexpenseUIBWRBack,s.socialsecurityexpenseAUAAUInsurance," +
                "s.socialsecurityexpenseAPAAUInsurance,s.socialsecurityexpenseATAUIPayment FROM socialsecurityexpense s\n" +
                "LEFT JOIN certificatelaborcontract c ON s.employeeregistrationformIDNumber=c.employeeregistrationformIDNumber\n" +
                "WHERE c.certificatelaborcontractTerminationTime LIKE '%" + bbtime + "%' AND s.socialsecurityexpenseDate='" + sangyu + "'\n" +
                " AND c.corporateInformationTradeName IN (SELECT approvalformTradeName FROM approvalform\n" +
                "WHERE approvalformUnemploymentNumber = '" + gsbh[0].approvalformUnemploymentNumber + "')")
            //职工的增加减少
            let zgzj = jishuzj.length
            let zgjs = jianshao.length
            /*
            * sqltbr:
            *   filName-填表人
            * sqljbxx:
            *   approvalformLawPerson-法人代表
            *   approvalformBusinessLicenseCode-编码
            *   approvalformBankOfDeposit-开户行
            *   approvalformBankAccount-账号
            *   approvalformRegisterMoney-注册资金
            *   approvalformCurrentHeadcount-职工人数
            *   approvalformOfficeTel-办公电话
            * sqlby：（本月）
            *   socialsecurityexpenseUIBWRBack-单位缴费基数
            *   Totalemployees-职工人数合计
            *   Totalemployees-在职职工
            *   total-缴纳社会保险费（元） 合计
            *   unitpayment-单位缴纳
            *   individualpayment-个人缴纳
            * sqlzj:（增加）
            *   Increase-增加人数
            * sqljs：（减少）
            *   reduce-减少人数
            * sqlsy:（上月）
            *   socialsecurityexpenseUIBWRBack-单位缴费基数
            *   Totalemployees-职工人数合计
            *   Totalemployees-在职职工
            *   total-缴纳社会保险费（元） 合计
            *   unitpayment-单位缴纳
            *   individualpayment-个人缴纳
            * */
            //
            if (sqljbxx) {
                return ({
                    state: stat.succeed,
                    data: sqljbxx,
                    sqlpdsybx: benyue,
                    jianshao: jianshao,
                    shangyue: shangyue,
                    zgzj: zgzj,
                    zgjs: zgjs,
                    shangpepo: shangpepo,
                    benpeop: benpeop,
                    sqltbr: sqltbr,
                    jishuzj: jishuzj
                });
            } else {
                return {state: stat.defeated};
            }
        } else {
            return ({state: stat.mygs});
        }
    } catch (e) {
        Logger.error("----service  / report  /  selsybxjf ---------", e)
        return {state: stat.defeated};
    }
}

// ***单位*年*月减少人员合同花名表
export async function selylhtjs(company, bbtime, pageIndex, pageSize) {
    try {
        // 把传入的时间改成上月时间
        const cal = new Calendar(bbtime);
        cal.add(-1, CalendarTypes.MONTH);
        let sangyu = cal.toFormat('yyyy-MM')
        let sz = [];
        let sqlylhtjs = await query("SELECT DISTINCT\n" +
            "            e.employeeregistrationformIDNumber,\n" +//-- 身份证号
            "            e.employeeregistrationformName,\n" +//-- 姓名
            "            e.employeeregistrationformSex,\n" +//-- 性别
            "            e.employeeregistrationformWorkTime\n" +//-- 合同期限（参加工作 两年后的前一天）
            "            FROM employeeregistrationform e LEFT JOIN `approvalform` a ON e.corporateInformationTradeName =a.approvalformTradeName\n" +
            "\t\t\t\t\t\tleft join socialsecurityexpense s on a.approvalformTradeName = s.corporateInformationTradeName\n" +
            "\t\t\t\t\t\tLEFT JOIN certificatelaborcontract c ON s.employeeregistrationformIDNumber = c.employeeregistrationformIDNumber \n" +
            "            WHERE e.corporateInformationTradeName='" + company + "'\n" +
            "\t\t\t\t\t\tAND s.socialsecurityexpenseDate like '" + sangyu + "%'\n" +
            "\t\t\t\t\t\tAND c.certificatelaborcontractTerminationTime LIKE '" + bbtime + "%' \n" +
            "\t\t\t\t\t\tAND e.employe=1\n" +
            " LIMIT " + (pageIndex - 1) * pageSize + "," + pageSize);
        for (let i = 0; i < sqlylhtjs.length; i++) {
            const cal = new Calendar(sqlylhtjs[i].employeeregistrationformWorkTime);
            cal.add(2, CalendarTypes.YEAR);
            cal.add(-1, CalendarTypes.DAY);
            let sj = cal.toFormat('yyyy-MM-dd');
            sz.push({
                ['employeeregistrationformIDNumber']: sqlylhtjs[i].employeeregistrationformIDNumber,
                ['employeeregistrationformName']: sqlylhtjs[i].employeeregistrationformName,
                ['employeeregistrationformSex']: sqlylhtjs[i].employeeregistrationformSex,
                ['employeeregistrationformWorkTime']: sj
            });
        }
        //总页数
        const pageCount = Math.ceil(sqlylhtjs.length / pageSize);
        //总数据
        const Total = sqlylhtjs.length;
        /*
        * sz:
        *   employeeregistrationformIDNumber-身份证号
        *   employeeregistrationformName-姓名
        *   employeeregistrationformSex-性别
        *   employeeregistrationformWorkTime-合同期限
        * */
        //
        if (sqlylhtjs.length > 0) {
            return {state: stat.succeed, data: sqlylhtjs, page: pageCount, total: Total, sz: sz};
        } else {
            return {state: stat.defeated};
        }
    } catch (e) {
        Logger.error("----service  / report  /  selylhtjs ---------", e)
        return {state: stat.defeated};
    }
}

// ***单*年*月新增人员合同花名表
export async function selylhtxz(company, bbtime, pageIndex, pageSize) {
    try {
        let sz = [];
        let jzd = {};
        let sqlylhtxz = await query("SELECT \n" +
            "employeeregistrationformIDNumber,\n" +// 身份证号
            "employeeregistrationformName,\n" +// 姓名
            "employeeregistrationformSex,\n" +// 性别
            "employeeregistrationformWorkTime\n" +// 合同期限（参加工作 两年后的前一天）
            "FROM employeeregistrationform e LEFT JOIN `approvalform` a ON e.corporateInformationTradeName =a.approvalformTradeName\n" +
            "WHERE corporateInformationTradeName='" + company + "' AND employeeregistrationformWorkTime LIKE '" + bbtime + "%' AND employe=0\n" +
            " LIMIT " + (pageIndex - 1) * pageSize + "," + pageSize);
        for (let i = 0; i < sqlylhtxz.length; i++) {
            const cal = new Calendar(sqlylhtxz[i].employeeregistrationformWorkTime);
            cal.add(2, CalendarTypes.YEAR);
            cal.add(-1, CalendarTypes.DAY);
            let sj = cal.toFormat('yyyy-MM-dd');
            sz.push({
                ['employeeregistrationformIDNumber']: sqlylhtxz[i].employeeregistrationformIDNumber,
                ['employeeregistrationformName']: sqlylhtxz[i].employeeregistrationformName,
                ['employeeregistrationformSex']: sqlylhtxz[i].employeeregistrationformSex,
                ['employeeregistrationformWorkTime']: sj
            });
        }
        //总页数
        const pageCount = Math.ceil(sqlylhtxz.length / pageSize);
        //总数据
        const Total = sqlylhtxz.length;
        /*
        * sz:
        *   employeeregistrationformIDNumber-身份证号
        *   employeeregistrationformName-姓名
        *   employeeregistrationformSex-性别
        *   employeeregistrationformWorkTime-合同期限
        * */
        //
        if (sz.length > 0) {
            return {state: stat.succeed, data: sqlylhtxz, page: pageCount, total: Total, sz: sz};
        } else {
            return {state: stat.defeated};
        }
    } catch (e) {
        Logger.error("----service  / report  /  selylhtxz ---------", e)
        return {state: stat.defeated};
    }
}

// 城镇企事业单位缴纳失业保险金月（季）报表
export async function selczdwsybx(company, bbtime) {
    try {
        let gsbh = await query("select approvalformUnemploymentNumber from approvalform \n" +
            "\twhere approvalformTradeName = '" + company + "' and approvalformSubordinateToTheBlock='郊区'");
        //上月日期
        let rq = bbtime;
        const cal = new Calendar(rq);
        cal.add(-1, CalendarTypes.MONTH);
        let ctm = cal.toFormat('yyyy-MM')
        // 填表人
        let sqltbr = await query("SELECT filName\n" +
            "FROM filler\n" +
            "WHERE filType = '失业' ");
        // 获取公司负责人
        let sqlgsfzr = await query("SELECT \n" +
            "approvalformLawPerson\n" +
            "FROM \n" +
            "approvalform \n" +
            "WHERE approvalformTradeName = '" + company + "' AND approvalformSubordinateToTheBlock ='郊区'");
        // 本月 编码/开户行/账号/注册资金、职工人数
        let sqljbxx = await query("SELECT \n" +
            "approvalformLawPerson,\n" +
            "approvalformBusinessLicenseCode,\n" +
            "approvalformBankOfDeposit,\n" +
            "approvalformBankAccount,\n" +
            "approvalformRegisterMoney,\n" +
            "approvalformCurrentHeadcount,\n" +
            "approvalformOfficeTel\n" +
            "FROM `approvalform` WHERE approvalformTradeName = '" + company + "' AND approvalformSubordinateToTheBlock ='郊区'");
        if (gsbh.length > 0) {
            //本月职工人数
            let benpeop = await query("SELECT COUNT(*) as 'benpeop' FROM employeeregistrationform e LEFT JOIN socialsecurityexpense s" +
                " ON e.employeeregistrationformIDNumber=s.employeeregistrationformIDNumber\n" +
                "WHERE e.corporateInformationTradeName='" + company + "' AND s.socialsecurityexpenseDate= '" + bbtime + "'" +
                " and e.corporateInformationTradeName IN ( SELECT approvalformTradeName FROM approvalform WHERE" +
                " approvalformUnemploymentNumber = '" + gsbh[0].approvalformUnemploymentNumber + "')")
            //上月职工人数
            let shangpepo = await query("SELECT COUNT(*) as 'shangpepo' FROM employeeregistrationform e LEFT JOIN socialsecurityexpense s" +
                " ON e.employeeregistrationformIDNumber=s.employeeregistrationformIDNumber\n" +
                "WHERE e.corporateInformationTradeName='" + company + "' AND s.socialsecurityexpenseDate= '" + ctm + "' and" +
                " e.corporateInformationTradeName IN ( SELECT approvalformTradeName FROM approvalform WHERE approvalformUnemploymentNumber" +
                " = '" + gsbh[0].approvalformUnemploymentNumber + "')")
            //上月的缴费基数,金额
            let shangyue = await query("select socialsecurityexpenseUICBase,socialsecurityexpenseAPUIUnit,socialsecurityexpenseUIICAmount,socialsecurityexpenseUIICtotal " +
                "from socialsecuritydetail where corporateInformationTradeName ='" + company + "' AND socialsecurityexpenseDate='" + ctm + "'" +
                " and corporateInformationTradeName IN ( SELECT approvalformTradeName FROM approvalform WHERE approvalformUnemploymentNumber" +
                " = '" + gsbh[0].approvalformUnemploymentNumber + "') ")
            //本月的缴费基数,金额
            let benyue = await query("select socialsecurityexpenseUICBase,socialsecurityexpenseAPUIUnit," +
                "socialsecurityexpenseUIICAmount,socialsecurityexpenseUIICtotal " +
                "from socialsecuritydetail where corporateInformationTradeName ='" + company + "' AND socialsecurityexpenseDate='" + bbtime + "'" +
                " and corporateInformationTradeName IN ( SELECT approvalformTradeName FROM approvalform WHERE approvalformUnemploymentNumber" +
                " = '" + gsbh[0].approvalformUnemploymentNumber + "') ")
            //增加基数
            let jishuzj = await query("SELECT DISTINCT s.socialsecurityexpenseUIBWRBack,s.socialsecurityexpenseAUAAUInsurance," +
                "s.socialsecurityexpenseAPAAUInsurance,s.socialsecurityexpenseATAUIPayment FROM employeeregistrationform e\n" +
                "LEFT JOIN socialsecurityexpense s  ON s.employeeregistrationformIDNumber=e.employeeregistrationformIDNumber\n" +
                "LEFT JOIN unemploymentinsurance m ON s.employeeregistrationformIDNumber=m.employeeregistrationformIDNumber\n" +
                "WHERE e.corporateInformationTradeName IN (SELECT approvalformTradeName FROM approvalform\n" +
                "WHERE approvalformUnemploymentNumber = '" + gsbh[0].approvalformUnemploymentNumber + "') AND m.unemploymentinsuranceToDate LIKE '%" + bbtime + "%'\n" +
                "OR m.unemploymentinsurancegoDate LIKE'%" + bbtime + "%'")
            //减少基数
            let jianshao = await query("SELECT DISTINCT s.socialsecurityexpenseUIBWRBack,s.socialsecurityexpenseAUAAUInsurance," +
                "s.socialsecurityexpenseAPAAUInsurance,s.socialsecurityexpenseATAUIPayment FROM socialsecurityexpense s\n" +
                "LEFT JOIN certificatelaborcontract c ON s.employeeregistrationformIDNumber=c.employeeregistrationformIDNumber\n" +
                "WHERE c.certificatelaborcontractTerminationTime LIKE '%" + bbtime + "%' AND s.socialsecurityexpenseDate='" + ctm + "'\n" +
                " AND c.corporateInformationTradeName IN (SELECT approvalformTradeName FROM approvalform\n" +
                "WHERE approvalformUnemploymentNumber = '" + gsbh[0].approvalformUnemploymentNumber + "')")
            //职工的增加减少
            let zgzj = jishuzj.length
            let zgjs = jianshao.length
            if (benpeop.length > 0 || shangpepo.length > 0 || shangyue.length > 0 || benyue.length > 0 || jishuzj.length > 0 || jianshao.length > 0) {
                return {
                    state: stat.succeed,
                    sqlgsfzr: sqlgsfzr,
                    sqljbxx: sqljbxx,
                    sqltbr: sqltbr,
                    zgzj: zgzj,
                    zgjs: zgjs,
                    jianshao: jianshao,
                    jishuzj: jishuzj,
                    benpeop: benpeop,
                    shangpepo: shangpepo,
                    shangyue: shangyue,
                    benyue: benyue
                }
            } else {
                return {state: stat.defeated}
            }
        } else {
            return {state: stat.defeated}
        }
    } catch (e) {
        Logger.error("----service  / report  /  selczdwsybx ---------", e)
        return {state: stat.defeated};
    }
}

// 城镇企业（国家机关、事业单位）缴纳失业保险金月（季、年）报表
export async function selczdwsybxcq(company, bbtime) {
    try {
        let gsbh = await query("select approvalformUnemploymentNumber from approvalform \n" +
            "\twhere approvalformTradeName = '" + company + "' and approvalformSubordinateToTheBlock='城区'");
        //上月日期
        let rq = bbtime;
        const cal = new Calendar(rq);
        cal.add(-1, CalendarTypes.MONTH);
        let ctm = cal.toFormat('yyyy-MM')
        // 填表人
        let sqltbr = await query("SELECT filName\n" +
            "FROM filler\n" +
            "WHERE filType = '失业' ");
        // 获取公司负责人
        let sqlgsfzr = await query("SELECT \n" +
            "approvalformLawPerson\n" +
            "FROM \n" +
            "approvalform \n" +
            "WHERE approvalformTradeName = '" + company + "' AND approvalformSubordinateToTheBlock ='郊区'");
        // 本月 编码/开户行/账号/注册资金、职工人数
        let sqljbxx = await query("SELECT \n" +
            "approvalformLawPerson,\n" +
            "approvalformBusinessLicenseCode,\n" +
            "approvalformBankOfDeposit,\n" +
            "approvalformBankAccount,\n" +
            "approvalformRegisterMoney,\n" +
            "approvalformCurrentHeadcount,\n" +
            "approvalformOfficeTel\n" +
            "FROM `approvalform` WHERE approvalformTradeName = '" + company + "' AND approvalformSubordinateToTheBlock ='郊区'");
        if (gsbh.length > 0) {
            //本月职工人数
            let benpeop = await query("SELECT COUNT(*) as 'benpeop' FROM employeeregistrationform e LEFT JOIN socialsecurityexpense s" +
                " ON e.employeeregistrationformIDNumber=s.employeeregistrationformIDNumber\n" +
                "WHERE e.corporateInformationTradeName='" + company + "' AND s.socialsecurityexpenseDate= '" + bbtime + "'" +
                " and e.corporateInformationTradeName IN ( SELECT approvalformTradeName FROM approvalform WHERE" +
                " approvalformUnemploymentNumber = '" + gsbh[0].approvalformUnemploymentNumber + "')")
            //上月职工人数
            let shangpepo = await query("SELECT COUNT(*) as 'shangpepo' FROM employeeregistrationform e LEFT JOIN socialsecurityexpense s" +
                " ON e.employeeregistrationformIDNumber=s.employeeregistrationformIDNumber\n" +
                "WHERE e.corporateInformationTradeName='" + company + "' AND s.socialsecurityexpenseDate= '" + ctm + "' and" +
                " e.corporateInformationTradeName IN ( SELECT approvalformTradeName FROM approvalform WHERE approvalformUnemploymentNumber" +
                " = '" + gsbh[0].approvalformUnemploymentNumber + "')")
            //上月的缴费基数,金额
            let shangyue = await query("select socialsecurityexpenseUICBase,socialsecurityexpenseAPUIUnit,socialsecurityexpenseUIICAmount,socialsecurityexpenseUIICtotal " +
                "from socialsecuritydetail where corporateInformationTradeName ='" + company + "' AND socialsecurityexpenseDate='" + ctm + "'" +
                " and corporateInformationTradeName IN ( SELECT approvalformTradeName FROM approvalform WHERE approvalformUnemploymentNumber" +
                " = '" + gsbh[0].approvalformUnemploymentNumber + "') ")
            //本月的缴费基数,金额
            let benyue = await query("select socialsecurityexpenseUICBase,socialsecurityexpenseAPUIUnit," +
                "socialsecurityexpenseUIICAmount,socialsecurityexpenseUIICtotal " +
                "from socialsecuritydetail where corporateInformationTradeName ='" + company + "' AND socialsecurityexpenseDate='" + bbtime + "'" +
                " and corporateInformationTradeName IN ( SELECT approvalformTradeName FROM approvalform WHERE approvalformUnemploymentNumber" +
                " = '" + gsbh[0].approvalformUnemploymentNumber + "') ")
            //增加基数
            let jishuzj = await query("SELECT DISTINCT s.socialsecurityexpenseUIBWRBack,s.socialsecurityexpenseAUAAUInsurance," +
                "s.socialsecurityexpenseAPAAUInsurance,s.socialsecurityexpenseATAUIPayment FROM employeeregistrationform e\n" +
                "LEFT JOIN socialsecurityexpense s  ON s.employeeregistrationformIDNumber=e.employeeregistrationformIDNumber\n" +
                "LEFT JOIN unemploymentinsurance m ON s.employeeregistrationformIDNumber=m.employeeregistrationformIDNumber\n" +
                "WHERE e.corporateInformationTradeName IN (SELECT approvalformTradeName FROM approvalform\n" +
                "WHERE approvalformUnemploymentNumber = '" + gsbh[0].approvalformUnemploymentNumber + "') AND m.unemploymentinsuranceToDate LIKE '%" + bbtime + "%'\n" +
                "OR m.unemploymentinsurancegoDate LIKE'%" + bbtime + "%'")
            //减少基数
            let jianshao = await query("SELECT DISTINCT s.socialsecurityexpenseUIBWRBack,s.socialsecurityexpenseAUAAUInsurance," +
                "s.socialsecurityexpenseAPAAUInsurance,s.socialsecurityexpenseATAUIPayment FROM socialsecurityexpense s\n" +
                "LEFT JOIN certificatelaborcontract c ON s.employeeregistrationformIDNumber=c.employeeregistrationformIDNumber\n" +
                "WHERE c.certificatelaborcontractTerminationTime LIKE '%" + bbtime + "%' AND s.socialsecurityexpenseDate='" + ctm + "'\n" +
                " AND c.corporateInformationTradeName IN (SELECT approvalformTradeName FROM approvalform\n" +
                "WHERE approvalformUnemploymentNumber = '" + gsbh[0].approvalformUnemploymentNumber + "')")
            //职工的增加减少
            let zgzj = jishuzj.length
            let zgjs = jianshao.length
            if (benpeop.length > 0 || shangpepo.length > 0 || shangyue.length > 0 || benyue.length > 0 || jishuzj.length > 0 || jianshao.length > 0) {
                return {
                    state: stat.succeed,
                    sqlgsfzr: sqlgsfzr,
                    sqljbxx: sqljbxx,
                    sqltbr: sqltbr,
                    zgzj: zgzj,
                    zgjs: zgjs,
                    jianshao: jianshao,
                    jishuzj: jishuzj,
                    benpeop: benpeop,
                    shangpepo: shangpepo,
                    shangyue: shangyue,
                    benyue: benyue
                }
            } else {
                return {state: stat.defeated}
            }
        } else {
            return {state: stat.defeated}
        }
    } catch (e) {
        Logger.error("----service  / report  /  selczdwsybx ---------", e)
        return {state: stat.defeated};
    }
}

// 平定县失业保险缴费申报表
export async function selpdsybx(werretrieve, wher) {
    try {
        // 填表人
        let sqltbr = await query("SELECT filName\n" +
            "FROM filler\n" +
            "WHERE filType = '失业' ");
        // 根据公司查询公司编号
        let gsbh = await query("select approvalformUnemploymentNumber from approvalform \n" +
            "\twhere approvalformTradeName = '" + werretrieve + "'AND approvalformSubordinateToTheBlock ='平定县'");
        //获取上月时间
        let rq = wher
        const cal = new Calendar(rq);
        cal.add(-1, CalendarTypes.MONTH)
        let sangyu = cal.toFormat('yyyy-MM')
        if (gsbh.length > 0) {
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
            //本月的缴费基数,金额
            let benyue = await query("select socialsecurityexpenseUICBase,socialsecurityexpenseAPUIUnit,socialsecurityexpenseUIICAmount,socialsecurityexpenseUIICtotal " +
                "from socialsecuritydetail where corporateInformationTradeName ='" + werretrieve + "' AND socialsecurityexpenseDate='" + wher + "' and corporateInformationTradeName IN ( SELECT approvalformTradeName FROM approvalform WHERE approvalformUnemploymentNumber = '" + gsbh[0].approvalformUnemploymentNumber + "') ")
            //上月的缴费基数,金额
            let shangyue = await query("select socialsecurityexpenseUICBase,socialsecurityexpenseAPUIUnit,socialsecurityexpenseUIICAmount,socialsecurityexpenseUIICtotal " +
                "from socialsecuritydetail where corporateInformationTradeName ='" + werretrieve + "' AND socialsecurityexpenseDate='" + sangyu + "' and corporateInformationTradeName IN ( SELECT approvalformTradeName FROM approvalform WHERE approvalformUnemploymentNumber = '" + gsbh[0].approvalformUnemploymentNumber + "') ")
            //上月的职工人数
            let shangpepo = await query("SELECT COUNT(*) as 'shangpepo' FROM employeeregistrationform e LEFT JOIN socialsecurityexpense s ON e.employeeregistrationformIDNumber=s.employeeregistrationformIDNumber\n" +
                "WHERE e.corporateInformationTradeName='" + werretrieve + "' AND s.socialsecurityexpenseDate= '" + sangyu + "' and e.corporateInformationTradeName IN ( SELECT approvalformTradeName FROM approvalform WHERE approvalformUnemploymentNumber = '" + gsbh[0].approvalformUnemploymentNumber + "')")
            //本月人数
            let benpeop = await query("SELECT COUNT(*) as 'benpeop' FROM employeeregistrationform e LEFT JOIN socialsecurityexpense s ON e.employeeregistrationformIDNumber=s.employeeregistrationformIDNumber\n" +
                "WHERE e.corporateInformationTradeName='" + werretrieve + "' AND s.socialsecurityexpenseDate= '" + wher + "' and e.corporateInformationTradeName IN ( SELECT approvalformTradeName FROM approvalform WHERE approvalformUnemploymentNumber = '" + gsbh[0].approvalformUnemploymentNumber + "')")
            //增加 基数，金额
            let jishuzj = await query("SELECT DISTINCT s.socialsecurityexpenseUIBWRBack,s.socialsecurityexpenseAUAAUInsurance," +
                "s.socialsecurityexpenseAPAAUInsurance,s.socialsecurityexpenseATAUIPayment FROM employeeregistrationform e\n" +
                "LEFT JOIN socialsecurityexpense s  ON s.employeeregistrationformIDNumber=e.employeeregistrationformIDNumber\n" +
                "LEFT JOIN unemploymentinsurance m ON s.employeeregistrationformIDNumber=m.employeeregistrationformIDNumber\n" +
                "WHERE e.corporateInformationTradeName IN (SELECT approvalformTradeName FROM approvalform\n" +
                "WHERE approvalformUnemploymentNumber = '" + gsbh[0].approvalformUnemploymentNumber + "') AND m.unemploymentinsuranceToDate LIKE '%" + wher + "%'\n" +
                "OR m.unemploymentinsurancegoDate LIKE'%" + wher + "%'")
            let jianshao = await query("SELECT DISTINCT s.socialsecurityexpenseUIBWRBack,s.socialsecurityexpenseAUAAUInsurance," +
                "s.socialsecurityexpenseAPAAUInsurance,s.socialsecurityexpenseATAUIPayment FROM socialsecurityexpense s\n" +
                "LEFT JOIN certificatelaborcontract c ON s.employeeregistrationformIDNumber=c.employeeregistrationformIDNumber\n" +
                "WHERE c.certificatelaborcontractTerminationTime LIKE '%" + wher + "%' AND s.socialsecurityexpenseDate='" + sangyu + "'\n" +
                " AND c.corporateInformationTradeName IN (SELECT approvalformTradeName FROM approvalform\n" +
                "WHERE approvalformUnemploymentNumber = '" + gsbh[0].approvalformUnemploymentNumber + "')")
            //职工的增加减少
            let zgzj = jishuzj.length
            let zgjs = jianshao.length
            //
            if (sqljbxx) {
                return {
                    state: stat.succeed,
                    sqlpdsybx: benyue,
                    jianshao: jianshao,
                    shangyue: shangyue,
                    zgzj: zgzj,
                    zgjs: zgjs,
                    shangpepo: shangpepo,
                    sqljbxx: sqljbxx,
                    benpeop: benpeop,
                    sqltbr: sqltbr,
                    jishuzj: jishuzj
                };
            } else {
                return {state: stat.defeated};
            }
        } else {
            return {state: stat.defeated}
        }
    } catch (e) {
        Logger.error("----service  / report  /  selpdsybx ---------", e)
        return {state: stat.defeated};
    }
}

// 阳泉市参保单位缴纳失业保险费人员增（减）变动表 改过
export async function seldwjnsybxbdb(company, bbtime, area, pageIndex, pageSize) {
    try {
        //获取上月时间
        let rq = bbtime
        const cal = new Calendar(rq);
        cal.add(-1, CalendarTypes.MONTH)
        let sangyu = cal.toFormat('yyyy-MM')
        // 根据公司查询公司编号
        let gsbh = await query("select approvalformUnemploymentNumber from approvalform \n" +
            "\twhere approvalformTradeName = '" + company + "'AND approvalformSubordinateToTheBlock not in (select approvalformSubordinateToTheBlock" +
            " from approvalform where approvalformSubordinateToTheBlock='平定县' or approvalformSubordinateToTheBlock = '盂县')");
        if (gsbh.length > 0) {
            // 填表人
            let sqltbr = await query("SELECT filName\n" +
                "FROM filler\n" +
                "WHERE filType = '失业' ");
            // 本月 法人代表/编码/开户行/账号/注册资金、职工人数/办公电话
            let sqljbxx = await query("SELECT \n" +
                "approvalformLawPerson,\n" +
                "approvalformBusinessLicenseCode,\n" +
                "approvalformBankOfDeposit,\n" +
                "approvalformBankAccount,\n" +
                "approvalformRegisterMoney,\n" +
                "approvalformCurrentHeadcount,\n" +
                "approvalformOfficeTel\n" +
                "FROM `approvalform` WHERE approvalformTradeName = '" + company + "'");
            //增加
            let querydata = await query("SELECT DISTINCT\n" +
                " s.socialsecurityexpenseUIBWRBack,\n" +
                " e.employeeregistrationformIDNumber,\n" +
                " e.employeeregistrationformName,\n" +
                " e.employeeregistrationformSex,\n" +
                " e.employeeregistrationformNationality,\n" +
                " e.employeeregistrationformDateOfBirth,\n" +
                " e.employeeregistrationformWorkTime,\n" +
                " e.employeeregistrationfromPhone,\n" +
                " e.employeeregistrationformCategory,\n" +
                " e.employeeregistrationformEmploymentForm,\n" +
                " e.employeeregistrationformRemarks\n" +
                "   FROM employeeregistrationform e\n" +
                " LEFT JOIN socialsecurityexpense s ON e.employeeregistrationformIDNumber=s.employeeregistrationformIDNumber\n" +
                " LEFT JOIN unemploymentinsurance m ON s.employeeregistrationformIDNumber=m.employeeregistrationformIDNumber\n" +
                " WHERE e.corporateInformationTradeName IN (select approvalformTradeName from approvalform where approvalformUnemploymentNumber='"
                + gsbh[0].approvalformUnemploymentNumber + "') AND m.unemploymentinsuranceToDate LIKE '%" + bbtime + "%' " +
                "OR m.unemploymentinsurancegoDate LIKE'%" + bbtime + "%' GROUP BY e.employeeregistrationformId  LIMIT  " + (pageIndex - 1) * pageSize + "," + pageSize);
            //减少
            let querye = await query("SELECT DISTINCT \n" +
                " s.socialsecurityexpenseUIBWRBack,\n" +
                " c.certificatelaborcontractName as'employeeregistrationformName',\n" +
                " c.employeeregistrationformIDNumber as'employeeregistrationformIDNumber',\n" +
                " c.certificatelaborcontractSex as 'employeeregistrationformSex',\n" +
                " c.certificatelaborcontractTerminationTime  ,\n" +
                " c.certificatelaborcontractReasonTermination as 'employeeregistrationformRemarks' ,\n" +
                " e.employeeregistrationformWorkTime,\n" +
                " e.employeeregistrationformNationality,\n" +
                " e.employeeregistrationformDateOfBirth,\n" +
                " e.employeeregistrationfromPhone,\n" +
                " e.employeeregistrationformCategory,\n" +
                " e.employeeregistrationformEmploymentForm \n" +
                " FROM certificatelaborcontract c\n" +
                " LEFT JOIN socialsecurityexpense s ON c.employeeregistrationformIDNumber=s.employeeregistrationformIDNumber\n" +
                " LEFT JOIN employeeregistrationform e ON s.employeeregistrationformIDNumber=e.employeeregistrationformIDNumber\n" +
                " WHERE c.certificatelaborcontractTerminationTime LIKE '%" + bbtime + "%' AND s.socialsecurityexpenseDate='" + sangyu + "'" +
                " AND c.corporateInformationTradeName  IN (select approvalformTradeName from approvalform where approvalformUnemploymentNumber='"
                + gsbh[0].approvalformUnemploymentNumber + "') GROUP BY e.employeeregistrationformId  LIMIT  " + (pageIndex - 1) * pageSize + "," + pageSize);
            let data = querye.concat(querydata)
            //总页数
            const pageCount = Math.ceil(data.length / pageSize);
            //总数据
            const Total = data.length;
            /*
            * querydata:
            *   socialsecurityexpenseUIBWRBack-缴费工资
            *   employeeregistrationformIDNumber-身份证号
            *   employeeregistrationformName-姓名
            *   employeeregistrationformSex-性别
            *   employeeregistrationformNationality-民族
            *   employeeregistrationformDateOfBirth-出生年月
            *   employeeregistrationformWorkTime-参加工作时间
            *   employeeregistrationfromPhone-电话号
            *   employeeregistrationformCategory-户口性质
            *   employeeregistrationformEmploymentForm-用工形式
            *   employeeregistrationformRemarks-增减原因
            * query
            *   socialsecurityexpenseUIBWRBack-缴费工资
            *   employeeregistrationformIDNumber-身份证号
            *   employeeregistrationformName-姓名
            *   employeeregistrationformSex-性别
            *   employeeregistrationformNationality-民族
            *   employeeregistrationformDateOfBirth-出生年月
            *   employeeregistrationformWorkTime-参加工作时间
            *   employeeregistrationfromPhone-电话号
            *   employeeregistrationformCategory-户口性质
            *   employeeregistrationformEmploymentForm-用工形式
            *   employeeregistrationformRemarks-增减原因
            * */
            //
            if (data.length > 0) {
                return {
                    state: stat.succeed,
                    data: data,
                    page: pageCount,
                    query: query,
                    total: Total,
                    sqltbr: sqltbr,
                    sqljbxx: sqljbxx
                };
            } else {
                return {state: stat.defeated};
            }
        } else {
            return {state: stat.mygs};
        }
    } catch (e) {
        Logger.error("----service  / lnjury  /  selGshangzj ---------", e)
        return {state: stat.defeated};
    }
}

// 企业基本养老保险费申报表
export async function ylbxsbb(werretrieve, ctime) {
    try { // 截取年月
        let year = ctime.substring(0, 4);
        let month = ctime.substring(5, 7);
        // 填表人
        let sqltbr = await query("SELECT filName\n" +
            "FROM filler\n" +
            "WHERE filType = '养老' ");
        //上月日期
        let rq = ctime;
        const cal = new Calendar(rq);
        cal.add(-1, CalendarTypes.MONTH);
        let ctm = cal.toFormat('yyyy-MM')
        // 本月 法人代表/编码/开户行/账号/注册资金、职工人数/办公电话
        let sqljbxx = await query("SELECT \n" +
            "approvalformLawPerson,\n" +
            "approvalformPensionNumber,\n" +
            "approvalformBankOfDeposit,\n" +
            "approvalformBankAccount,\n" +
            "approvalformRegisterMoney,\n" +
            "approvalformCurrentHeadcount,\n" +
            "approvalformOfficeTel\n" +
            "FROM `approvalform` WHERE approvalformTradeName = '" + werretrieve + "'");
        let gsbh = await query("select approvalformPensionNumber from approvalform \n" +
            "\twhere approvalformTradeName = '" + werretrieve + "'");
        let sqlzgsbzj = '';
        let yldwgrjf = '';
        // -- 职工情况 上月数
        sqlzgsbzj = await query("SELECT DISTINCT COUNT(*) as employeeregistrationformName FROM `socialsecurityexpense` WHERE" +
            " socialsecurityexpenseDate='" + ctm + "' AND corporateInformationTradeName IN (SELECT " +
            "approvalformTradeName FROM approvalform WHERE approvalformPensionNumber = '" + gsbh[0].approvalformPensionNumber + "') \n")
        // 上月 养老后调单位缴费金额   后调个人缴费金额
        yldwgrjf = await query("select socialsecurityexpenseEICbase " +
            "from socialsecuritydetail where corporateInformationTradeName ='" + werretrieve + "' AND socialsecurityexpenseDate='" + ctm + "'" +
            " and corporateInformationTradeName IN ( SELECT approvalformTradeName FROM approvalform WHERE approvalformPensionNumber = '" + gsbh[0].approvalformPensionNumber + "') ")
        // -- 职工情况 本月数
        let sqlzgsys = await query("SELECT DISTINCT COUNT(*) as benpeop FROM `socialsecurityexpense` WHERE" +
            " socialsecurityexpenseDate='" + ctime + "' AND corporateInformationTradeName IN (SELECT " +
            "approvalformTradeName FROM approvalform WHERE approvalformPensionNumber = '" + gsbh[0].approvalformPensionNumber + "') \n")
        // 个人缴费比例 单位缴费比例
        let dwgrjf = await query("select socialsecurityexpenseEIUPProportion,socialsecurityexpensePEIPIndividual from socialsecurityexpense where corporateInformationTradeName" +
            "= '" + werretrieve + "' AND socialsecurityexpenseDate = '" + ctime + "' limit 1");
        // 本月 养老后调单位缴费金额   后调个人缴费金额
        let byldwgrjf = await query("select socialsecurityexpenseEICbase,socialsecurityexpenseAICEInsurance,socialsecurityexpenseAOICEOInsurance,socialsecurityexpenseAOICEOtotal " +
            "from socialsecuritydetail where corporateInformationTradeName ='" + werretrieve + "' AND socialsecurityexpenseDate='" + ctime + "'" +
            " and corporateInformationTradeName IN " +
            "( SELECT approvalformTradeName FROM approvalform WHERE approvalformPensionNumber = '" + gsbh[0].approvalformPensionNumber + "') ")
        //养老缴费金额  合计，单位，个人
        let yljfje = await query("select socialsecurityexpenseAOICEOtotal,socialsecurityexpenseAICEInsurance,socialsecurityexpenseAOICEOInsurance from socialsecuritydetail where corporateInformationTradeName" +
            "= '" + werretrieve + "' AND socialsecurityexpenseDate = '" + ctime + "'");
        //增加 基数，金额
        let jishuzj = await query("SELECT DISTINCT s.socialsecurityexpenseEIALater,s.socialsecurityexpenseAUAAEInsurance,s.socialsecurityexpenseAAIPAEInsurance FROM employeeregistrationform e\n" +
            "LEFT JOIN socialsecurityexpense s  ON s.employeeregistrationformIDNumber=e.employeeregistrationformIDNumber\n" +
            "LEFT JOIN oldageinsurance m ON s.employeeregistrationformIDNumber=m.employeeregistrationformIDNumber\n" +
            "WHERE e.corporateInformationTradeName IN (SELECT approvalformTradeName FROM approvalform WHERE approvalformPensionNumber = '" + gsbh[0].approvalformPensionNumber + "')" +
            " AND m.oldageinsuranceToDate LIKE '%" + ctime + "%' OR m.oldageinsuranceGoDate LIKE'%" + ctime + "%'")
        //减少  基数，金额
        let jianshao = await query("SELECT DISTINCT s.socialsecurityexpenseEIALater,s.socialsecurityexpenseAUAAEInsurance,s.socialsecurityexpenseAAIPAEInsurance FROM socialsecurityexpense s\n" +
            "LEFT JOIN certificatelaborcontract c ON s.employeeregistrationformIDNumber=c.employeeregistrationformIDNumber\n" +
            "WHERE c.certificatelaborcontractTerminationTime LIKE '%" + ctime + "%' AND s.socialsecurityexpenseDate='" + ctm + "' AND c.corporateInformationTradeName \n" +
            "IN (SELECT approvalformTradeName FROM approvalform WHERE approvalformPensionNumber = '" + gsbh[0].approvalformPensionNumber + "')")
        //职工的增加减少
        let zgzj = jishuzj.length;
        let zgjs = jianshao.length;
        if (sqltbr && sqljbxx && sqlzgsbzj && dwgrjf) {
            return {
                state: stat.succeed,
                sqltbr: sqltbr,
                sqljbxx: sqljbxx,
                sqlzgsbzj: sqlzgsbzj,
                dwgrjf: dwgrjf,
                jianshao: jianshao,
                sqlzgsys: sqlzgsys,
                yldwgrjf: yldwgrjf,
                byldwgrjf: byldwgrjf,
                zgzj: zgzj,
                zgjs: zgjs,
                yljfje: yljfje,
                jishuzj: jishuzj
            }
        } else {
            return {state: stat.defeated}
        }
    } catch (e) {
        Logger.error("----service  / lnjury  /  ylbxsbb ---------", e)
        return {state: stat.defeated};
    }
}