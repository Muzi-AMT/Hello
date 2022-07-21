// 新报表查询
import stat from "../util/state";
import {getConnection} from "typeorm";
import log4js from "../util/logs";
import {werfullcheck} from "./Generalpagingfullcheck";
import {unemploymentinsurance} from "../entity/unemploymentinsurance";
import {query} from "../dao/stopped";

const Logger = log4js.getLogger('error');
const queryRunner = getConnection().createQueryRunner();
const {
    Calendar,
    CalendarTypes
} = require('calendar2');
//2021年阳泉市《央视，国企，民营企业》新入职大学生明细表
export async function dxssj(werretrieve, bbtime, pageIndex, pageSize) {

    try { // 填表人
        let sqltbr = await query("SELECT filName\n" +
            "FROM filler\n" +
            "WHERE filType = '备案' ");
        //大学生数据
        let dxssj = await query("SELECT\n" +
            "e.employeeregistrationformName,\n" +
            "e.employeeregistrationformIDNumber,\n" +
            "e.employeeregistrationformSex,\n" +
            "e.employeeregistrationform,\n" +
            "e.employeeregistrationformWorkTime,\n" +
            "e.empage,\n" +
            "e.employeeregistrationformSchool,\n" +
            "e.employeeregistrationformMajor\n" +
            " FROM `employeeregistrationform` e \n" +
            "LEFT JOIN socialsecurityexpense s ON e.employeeregistrationformIDNumber=s.employeeregistrationformIDNumber "+
            "WHERE  e.employeeregistrationform NOT IN \n" +
            "(SELECT employeeregistrationform FROM `employeeregistrationform` WHERE employeeregistrationform='小学' OR employeeregistrationform='初中'\n" +
            " OR employeeregistrationform='高中' OR employeeregistrationform='中技' OR employeeregistrationform='') \n" +
            " AND s.socialsecurityexpenseDate = '"+bbtime+"' AND e.corporateInformationTradeName='" + werretrieve + "'\n" +
            " AND e.employeeregistrationformWorkTime LIKE '%" + bbtime + "%' LIMIT " + (pageIndex - 1) * pageSize + "," + pageSize);
        //总页数
        const pageCount = Math.ceil(dxssj.length / pageSize);
        //总数据
        const Total = dxssj.length;
        //
        if (dxssj.length > 0) {
            return {state: stat.succeed, data: dxssj, page: pageCount, total: Total, sqltbr: sqltbr};
        } else {
            return {state: stat.defeated};
        }
    } catch (e) {
        Logger.error("----service  / newreport  /  dxssj ---------", e)
        return {state: stat.defeated};
    }


}


//阳泉公积金汇缴清册
export async function gjjhjqc(werretrieve, bbtime, pageIndex, pageSize) {

    try { // 填表人
        let sqltbr = await query("SELECT filName\n" +
            "FROM filler\n" +
            "WHERE filType = '公积金' ");
        let gsbh = await query("select approvalformProvidentFundAccount from approvalform \n" +
            "\twhere approvalformTradeName = '" + werretrieve + "'");
        //上月日期
        let rq = bbtime;
        const cal = new Calendar(rq);
        cal.add(-1, CalendarTypes.MONTH);
        let ctm = cal.toFormat('yyyy-MM')
        let dxssj = await query("SELECT DISTINCT e.employeeregistrationformName,e.employeeregistrationformIDNumber,e.employeeregistrationformSex,e.employeeregistrationformRemarks," +
            "s.socialsecurityexpenseHRBAdjustment,s.socialsecurityexpenseHRATAmount,s.socialsecurityexpenseHAFAAUAmount,s.socialsecurityexpenseTAHRAATotal,e.employeeregistrationformWorkTime\n" +
            "FROM employeeregistrationform e\n" +
            "LEFT JOIN socialsecurityexpense s ON e.employeeregistrationformIDNumber=s.employeeregistrationformIDNumber\n" +
            "LEFT JOIN housingprovidentfund m ON s.employeeregistrationformIDNumber=m.employeeregistrationformIDNumber\n" +
            "WHERE e.corporateInformationTradeName IN (SELECT approvalformTradeName FROM approvalform WHERE approvalformProvidentFundAccount =" +
            " '"+gsbh[0].approvalformProvidentFundAccount+"') AND m.housingprovidentfundToDate LIKE '%"+bbtime+"%' " +
            "OR m.housingproyvidentfundgoDate LIKE'%"+bbtime+"%' GROUP BY e.employeeregistrationformId  limit "+(pageIndex-1)+","+(pageSize-1));

        //公积金汇缴清册
        let dxsgjjzj = await query("SELECT DISTINCT e.employeeregistrationformName,e.employeeregistrationformIDNumber,e.employeeregistrationformSex,e.employeeregistrationformRemarks," +
            "s.socialsecurityexpenseHRBAdjustment,s.socialsecurityexpenseHRATAmount,s.socialsecurityexpenseHAFAAUAmount,s.socialsecurityexpenseTAHRAATotal,e.employeeregistrationformWorkTime\n" +
            "FROM certificatelaborcontract c \n" +
            "LEFT JOIN socialsecurityexpense s ON c.employeeregistrationformIDNumber=s.employeeregistrationformIDNumber\n" +
            "LEFT JOIN employeeregistrationform e ON s.employeeregistrationformIDNumber=e.employeeregistrationformIDNumber\n" +
            "WHERE c.certificatelaborcontractTerminationTime LIKE '%"+bbtime+"%' AND s.socialsecurityexpenseDate='"+ctm+"' AND c.corporateInformationTradeName" +
            " IN (SELECT approvalformTradeName FROM approvalform WHERE approvalformProvidentFundAccount =" +
            " '"+gsbh[0].approvalformProvidentFundAccount+"') GROUP BY e.employeeregistrationformId\n" +
            " limit "+(pageIndex-1)+","+(pageSize-1));

        let data = dxssj.concat(dxsgjjzj)

        //总页数
        const pageCount = Math.ceil(data.length / pageSize);
        //总数据
        const Total = data.length;
        //
        if (data.length > 0) {
            return {state: stat.succeed, data: data, page: pageCount, total: Total, sqltbr: sqltbr,zj:dxsgjjzj};
        } else {
            return {state: stat.defeated};
        }
    } catch (e) {
        Logger.error("----service  / newreport  /  gjjhjqc ---------", e)
        return {state: stat.defeated};
    }


}
var d = new Date();
//用人单位劳务关系人员基本情况备案表
export async function yrlwjbqkbab(werretrieve, bbtime, pageIndex, pageSize) {

    try {
        // 工作年限
        let workSeniority = [];
        // 填表人
        let sqltbr = await query("SELECT filName\n" +
            "FROM filler\n" +
            "WHERE filType = '备案(平定，盂县)' ");
        // 根据公司查询公司编号
        let gsbh = await query("select approvalformMedicareNumber from approvalform \n" +
            "\twhere approvalformTradeName = '"+werretrieve+"'");
        //在职数据
        let dxssj=[];
        if(gsbh){
            dxssj = await query("SELECT\n" +
                "e.employeeregistrationformName,\n" +
                "e.employeeregistrationformIDNumber,\n" +
                "e.employeeregistrationformSex,\n" +
                "e.employeeregistrationform,\n" +
                "e.employeeregistrationformWorkTime,\n" +
                "e.employeeregistrationformNationality,\n" +
                "e.employeeregistrationformPlaceOfDomicile,\n" +
                "e.employeeregistrationformPersentAddress,\n" +
                "e.employeeregistrationformTypeOfWork,\n" +
                "e.employeeregistrationformCategory,\n" +
                "e.employeeregistrationfromPhone,\n" +
                "e.employeeregistrationformDateOfBirth,\n" +
                "e.workseniority as 'workseniority',e.htzzsj as 'htzzsj',\n" +// 工作年限
                "c.fixedterm,\n" +
                "c.fixedtermtion\n" +
                " FROM employeeregistrationform e  \n" +
                " LEFT JOIN laborcontract  c  \n" +
                " ON e.employeeregistrationformIDNumber = c.PartyBIdcar " +
                "LEFT JOIN socialsecurityexpense s ON c.PartyBIdcar=s.employeeregistrationformIDNumber "+
                " WHERE s.socialsecurityexpenseDate = '"+bbtime+"' AND e.corporateInformationTradeName IN ( SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber = '"+gsbh[0].approvalformMedicareNumber+"' )  \n" +
                " AND e.employeeregistrationformWorkTime LIKE'" + bbtime + "%' AND  e.employe=0  LIMIT " + (pageIndex - 1) * pageSize + "," + pageSize);
        }
        for (let i = 0; i < dxssj.length; i++) {
            if (dxssj[i].employe == 0) {// 在职人员
                let etime = dxssj[i].employeeregistrationformWorkTime;// 参加工作时间
                let rq = dxssj[i].employeeregistrationformWorkTime //合同开始时间
                const cal = new Calendar(rq);
                cal.add(2, CalendarTypes.YEAR);
                cal.add(-1, CalendarTypes.DAY);

                let etimeyear = parseInt(etime.substring(0, 4));// 参加工作时间 年份
                let etimeyue = parseInt(etime.substring(5, 7));// 参加工作时间 月份

                if (etimeyear == d.getFullYear()) {// 在同一年入职并且离职的人
                    query("UPDATE employeeregistrationform SET workseniority = '1',htzzsj = " +
                        "'"+cal.toFormat('yyyy-MM-dd')+"' WHERE employeeregistrationformIDNumber = '" + dxssj[i].employeeregistrationformIDNumber + "'");

                } else if (d.getFullYear() - etimeyear == 1) {
                    if ((12 - etimeyue) + (d.getMonth() + 1) < 12) {// 去年入职 今年离职但不满12个月的人
                        query("UPDATE employeeregistrationform SET workseniority = '1',htzzsj = " +
                            "'"+cal.toFormat('yyyy-MM-dd')+"' WHERE employeeregistrationformIDNumber = '" + dxssj[i].employeeregistrationformIDNumber + "'");

                    } else {
                        query("UPDATE employeeregistrationform SET workseniority = '2',htzzsj = " +
                            "'"+cal.toFormat('yyyy-MM-dd')+"' WHERE employeeregistrationformIDNumber = '" + dxssj[i].employeeregistrationformIDNumber + "'");

                    }
                } else {// 在一年以上入职的人
                    if (((12 - etimeyue) + (d.getMonth() + 1)) > 12) {
                        query("UPDATE employeeregistrationform SET workseniority = " +
                            "'" +((d.getFullYear() - etimeyear) + 3) + "',htzzsj = '"+cal.toFormat('yyyy-MM-dd')+"' WHERE employeeregistrationformIDNumber = '" + dxssj[i].employeeregistrationformIDNumber + "'");

                    } else {
                        query("UPDATE employeeregistrationform SET workseniority = " +
                            "'" + ((d.getFullYear() - etimeyear)+1) + "',htzzsj = '"+cal.toFormat('yyyy-MM-dd')+"' WHERE employeeregistrationformIDNumber = '" + dxssj[i].employeeregistrationformIDNumber + "'");

                    }
                }
            }
        }
        //总页数
        const pageCount = Math.ceil(dxssj.length / pageSize);
        //总数据
        const Total = dxssj.length;
        //
        if (dxssj.length > 0) {
            return {state: stat.succeed, data: dxssj,workSeniority:workSeniority, page: pageCount, total: Total, sqltbr: sqltbr};
        } else {
            return {state: stat.defeated};
        }
    } catch (e) {
        Logger.error("----service  / newreport  /  yrlwjbqkbab ---------", e)
        return {state: stat.defeated};
    }


}




//用人单位劳务用工基本情况备案表
export async function yrdwlwyg(werretrieve,where) {

    try { // 填表人
        let sqltbr = await query("SELECT filName\n" +
            "FROM filler\n" +
            "WHERE filType = '备案' ");
        // 根据公司查询公司编号
        let gsbh = await query("select approvalformMedicareNumber from approvalform \n" +
            "\twhere approvalformTradeName = '"+werretrieve+"' AND approvalformSubordinateToTheBlock <>'盂县'");
        if(gsbh.length>=1){
            //数据
            let dxssj = await query("SELECT corporateInformationTradeName,corporateInformationBusinessLicenseCode,corporateInformationBusinessAddress,corporateInformationLawPerson," +
                "corporateInformationRegisteredAddress,\n" +
                "corporateInformationBusinessAddress,SocialSecurity FROM " +
                "corporateinformation WHERE corporateInformationTradeName ='"+werretrieve+"' and corporateInformationTradeName IN ( SELECT approvalformTradeName FROM approvalform WHERE approvalformMedicareNumber = '"+gsbh[0].approvalformMedicareNumber+"')");

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
            //
            if (dxssj.length > 0) {
                return {state: stat.succeed, data: dxssj, sqltbr: sqltbr, nan:nan,nv:nv,oldagein:oldagein,medicalinsurance:medicalinsurance,EIIUnit:EIIUnit,unemploymentinsurance:unemploymentinsurance};
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