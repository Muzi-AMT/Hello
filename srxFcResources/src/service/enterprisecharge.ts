//代理企业各项费用
import {getConnection} from "typeorm";
import log4js from "../util/logs";
const Logger = log4js.getLogger('error');
import {addtools} from "../dao/insertDao";
import {socialchargeinformation} from "../entity/socialchargeinformation";
import stat from "../util/state";
import {updtools} from "../dao/updataDao";
import { socialsecuritypayment } from "../entity/socialsecuritypayment";
import {loginmessage} from "../entity/loginmessage";
import {corporateinformation} from "../entity/corporateinformation";
import {hrdept} from "../entity/hrdept";
import {approvalform} from "../entity/approvalform";
import { queryCondition } from "../dao/queryDao";
import {socialsecurityfee} from "../entity/socialsecurityfee";
import {query} from "../dao/stopped";

const CONNECTION = getConnection();
const {
    Calendar,
    CalendarTypes
} = require('calendar2');
//添加企业社保收费信息
export async  function addcharge (retrieve,monthofexpense){
    try {
        let selchar = await CONNECTION
            .getRepository(socialchargeinformation)
            .createQueryBuilder()
            .where({monthofexpense: monthofexpense})
            .getOne();
        if(selchar){
            return {state: stat.dat}//日期重复返回11
        }else {
            let addchar = addtools(socialchargeinformation, retrieve);
            if (addchar) {
                return {state: stat.succeed}//添加成功返回1
            } else {
                return {state: stat.defeated}//添加失败返回0
            }
        }


    } catch (e) {
        Logger.error("----service  / enterprisecharge  /  addcharge ---------",e)
        return {state: stat.defeated};
    }
}
//修改企业社保收费信息
export async function updcharge(retrieve,werretrieve){
    try {
        let updcharge = await updtools(socialchargeinformation, retrieve, werretrieve);
        if (updcharge.affected == 1) {
            // 修改成功 返回 1s
            return {state: stat.succeed}
        } else {
            // 修改失败 返回 2
            return {state: stat.defeated}
        }
    } catch (e) {
        Logger.error("----service  / enterprisecharge  /  updcharge ---------",e)
        return {state: stat.defeated};
    }
}
//代理企业收费汇总表

export async function collect(gs,time){
    try {
        const queryRunner = getConnection().createQueryRunner();
        let querydata = await query("SELECT * FROM socialsecuritydetail c " +
            "LEFT JOIN socialchargeinformation s ON c.socialsecurityexpenseDate = s.monthofexpense " +
            "WHERE c.corporateInformationTradeName='" + gs + "' AND s.monthofexpense LIKE '" + time + "%' AND  c.socialsecurityexpenseDate LIKE '" + time + "%'");

        if (querydata.length > 0) {
            return {state: stat.succeed, data: querydata}
            //返回状态值1  查询成功
        } else {
            //返回状态值0  查询失败
            return {state: stat.defeated}
        }
    } catch (e) {
        Logger.error("----service  / enterprisecharge  /  collect ---------",e)
        return {state: stat.defeated};
    }

}
//查询代理企业社保缴纳信息
export async function selpayment(gs,time){
    try {
        const queryRunner = getConnection().createQueryRunner();
        let querydata = await query("SELECT * FROM socialsecuritypayment WHERE corporateInformationTradeName=" + "'" + gs + "' AND pensioncontributionDate LIKE '" + time + "%'" +
            " OR unemploymentcontributionDate LIKE '" + time + "%' OR medicalcontributionDate LIKE '" + time + "%' OR accumulationcontributionDate LIKE '" + time + "%'" +
            " OR occupationalcontributionDate LIKE '" + time + "%' OR salarycontributionDate LIKE '" + time + "%' ");
        await queryRunner.release();
        if (querydata.length > 0) {
            return {state: stat.succeed, data: querydata}
            //返回状态值1  查询成功
        } else {
            //返回状态值0  查询失败
            return {state: stat.defeated}
        }
    } catch (e) {
        Logger.error("----service  / enterprisecharge  /  selpayment ---------",e)
        return {state: stat.defeated};
    }
}

//添加代理企业社保缴纳信息
export async function addpayment(retrieve,werretrieve){
    try {
        let ret = JSON.parse(retrieve)
        let wer = JSON.parse(werretrieve)
        let querycondition = await CONNECTION
            .getRepository(socialsecuritypayment)
            .createQueryBuilder()
            .where({pensioncontributionDate: wer.pensioncontributionDate})
            .andWhere({corporateInformationTradeName: wer.corporateInformationTradeName})
            .orWhere({unemploymentcontributionDate: wer.unemploymentcontributionDate})
            .orWhere({medicalcontributionDate: wer.medicalcontributionDate})
            .orWhere({accumulationcontributionDate: wer.accumulationcontributionDate})
            .orWhere({occupationalcontributionDate: wer.occupationalcontributionDate})
            .orWhere({salarycontributionDate: wer.salarycontributionDate})
            .getOne();
        if (querycondition) {
            const upd = await CONNECTION
                .createQueryBuilder()
                .update(socialsecuritypayment)
                .set(ret)
                .where({pensioncontributionDate: wer.pensioncontributionDate})
                .andWhere({corporateInformationTradeName: wer.corporateInformationTradeName})
                .orWhere({unemploymentcontributionDate: wer.unemploymentcontributionDate})
                .orWhere({medicalcontributionDate: wer.medicalcontributionDate})
                .orWhere({accumulationcontributionDate: wer.accumulationcontributionDate})
                .orWhere({occupationalcontributionDate: wer.occupationalcontributionDate})
                .orWhere({salarycontributionDate: wer.salarycontributionDate})
                .execute();
            if (upd) {
                return {state: stat.succeed}//修改成功返回1
            } else {
                return {state: stat.defeated}//修改失败返回0
            }
        } else {
            let addchar = addtools(socialsecuritypayment, retrieve);
            if (addchar) {
                return {state: stat.succeed}//添加成功返回1
            } else {
                return {state: stat.defeated}//添加失败返回0
            }
        }
    } catch (e) {
        Logger.error("----service  / enterprisecharge  /  addpayment ---------",e)
        return {state: stat.defeated};
    }
}
//修改代理企业社保缴纳信息
export async function updpayment(retrieve,werretrieve){
    try {
        let updcharge = await updtools(socialsecuritypayment, retrieve, werretrieve);
        if (updcharge.affected >= 1) {
            // 修改成功 返回 1
            return {state: stat.succeed}
        } else {
            // 修改失败 返回 2
            return {state: stat.defeated}
        }
    } catch (e) {
        Logger.error("----service  / enterprisecharge  /  updpayment ---------",e)
        return {state: stat.defeated};
    }
}
//企业缴纳各项费用汇总表
export async function lpayment(gs,time){
    try {
        const queryRunner = getConnection().createQueryRunner();
        let querydata = await query("SELECT * FROM socialsecuritypayment t LEFT JOIN socialsecuritydetail s " +
            "ON t.pensioncontributionDate = s.socialsecurityexpenseDate " +
            "OR t.unemploymentcontributionDate =s.socialsecurityexpenseDate " +
            "OR t.medicalcontributionDate=s.socialsecurityexpenseDate " +
            "OR t.accumulationcontributionDate=s.socialsecurityexpenseDate " +
            "OR t.salarycontributionDate=s.socialsecurityexpenseDate " +
            "WHERE s.corporateInformationTradeName=" + "'" + gs + "' AND " +
            "t.pensioncontributionDate LIKE '" + time + "%' " +
            "OR t.unemploymentcontributionDate LIKE '" + time + "%' " +
            "OR t.medicalcontributionDate  LIKE '" + time + "%' " +
            "OR t.accumulationcontributionDate LIKE '" + time + "%' " +
            "OR t.salarycontributionDate LIKE '" + time + "%'");
        await queryRunner.release();
        if (querydata) {
            return {state: stat.succeed, data: querydata}
            //返回状态值1  查询成功
        } else {
            //返回状态值0  查询失败
            return {state: stat.defeated}
        }
    } catch (e) {
        Logger.error("----service  / enterprisecharge  /  lpayment ---------",e)
        return {state: stat.defeated};
    }
}
//代理企业各项费用(月)汇总表(生成)
export async function summarytable(time,pageSize,pageIndex){
    //获取上月时间
    let rq = time
    const cal = new Calendar(rq);
    cal.add(-1, CalendarTypes.MONTH)
    let sangyu=cal.toFormat('yyyy-MM')
    try {
        const queryRunner = getConnection().createQueryRunner();
        let querydata = await queryRunner.query("SELECT * FROM socialsecuritypayment t RIGHT JOIN socialchargeinformation s " +
            "ON t.pensionpaymentmonth = s.monthofexpense  " +
            "OR t.unemploymentpaymentmonth =s.monthofexpense " +
            "OR t.medicalpaymentmonth=s.monthofexpense " +
            "OR t.accumulationpaymentmonth=s.monthofexpense " +
            "OR t.occupationalpaymentmonth=s.monthofexpense " +
            "WHERE t.pensionpaymentmonth = '" + time + "'" +
            "OR t.unemploymentpaymentmonth = '" + time + "'" +
            "OR t.medicalpaymentmonth = '" + time + "%' " +
            "OR t.accumulationpaymentmonth = '" + time + "' " +
            "OR t.occupationalpaymentmonth = '" + time + "' " +
            " LIMIT " + (pageIndex - 1) * pageSize + "," + pageSize);
        let querydat = await queryRunner.query("SELECT * FROM socialsecuritypayment t RIGHT JOIN socialchargeinformation s " +
            "ON t.pensionpaymentmonth = s.monthofexpense  " +
            "OR t.unemploymentpaymentmonth =s.monthofexpense " +
            "OR t.medicalpaymentmonth=s.monthofexpense " +
            "OR t.accumulationpaymentmonth=s.monthofexpense " +
            "OR t.occupationalpaymentmonth=s.monthofexpense " +
            "WHERE t.pensionpaymentmonth = '" + sangyu + "'" +
            "OR t.unemploymentpaymentmonth = '" + sangyu + "'" +
            "OR t.medicalpaymentmonth = '" + sangyu + "%' " +
            "OR t.accumulationpaymentmonth = '" + sangyu + "' " +
            "OR t.occupationalpaymentmonth = '" + sangyu + "' " +
            " LIMIT " + (pageIndex - 1) * pageSize + "," + pageSize);
        //总页数
        const pageCount = Math.ceil(querydata.length / pageSize);
        //总数据
        const Total = querydata.length;
        await queryRunner.release();
        if (querydata) {
            return {state: stat.succeed, data: querydata, shang:querydat, page: pageCount, total: Total}
            //返回状态值1  查询成功
        } else {
            //返回状态值0  查询失败
            return {state: stat.defeated}
        }
    } catch (e) {
        Logger.error("----service  / enterprisecharge  /  summarytable ---------",e)
        return {state: stat.defeated};
    }
}
//企业注册
//客户端 注册企业信息
export async function addapp(retrieve,werretrieve){
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
            if (addapf && login && corp && addhrd){
                //添加成功 1
                return {state:stat.succeed}
            }else{
                //添加失败 0
                return {state:stat.defeated}
            }
        }
    }catch (e) {
        Logger.error("----service  / enterprisecharge  /  addapp ---------",e);
        return {state: stat.defeated};
    }
}