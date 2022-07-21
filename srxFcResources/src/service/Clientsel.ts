import stat from "../util/state";
import log4js from "../util/logs";
import {administrator} from "../entity/administrator";
import {get, set, udp, del} from "../util/Cache";
import {uuid} from "../util/uuid";
import {AllEnquiries, Multinpsearch, Pagination, queryCondition} from "../dao/queryDao";
import {getConnection, getManager} from "typeorm";
import {superadministrator} from "../entity/superadministrator";
import {encrypt} from "../util/cipher";
import {sendEmail} from "../util/email/sendEmail";
import {log} from "../util/log4j";
import {create_yzm} from "../util";

const queryRunner = getConnection().createQueryRunner();
const Logger = log4js.getLogger('error');

// 管理员登录 首页
export async function srxfcseladminij(werretrieve, token) {
    try {
        let aretrieve = JSON.parse(werretrieve)
        let tokenkey = aretrieve.userName;
        let tokena = await get(tokenkey + "_" + token);
        if (!tokena) {
            set(tokenkey + "_" + token, Math.random() * 10000, 600);
        }
        if (tokena) {
            return {state: stat.succeed};
        } else {
            let srxfcsuperadministratork = await Multinpsearch(administrator, werretrieve);
            if (srxfcsuperadministratork && srxfcsuperadministratork.length > 0) {
                let tokenvalue = await get(tokenkey + "_" + token);
                // @ts-ignore
                if (!tokenvalue) {
                    // @ts-ignore
                    return {state: stat.redselerr};
                } else {
                    return {state: stat.succeed, token: tokenvalue};
                }
            } else {
                return {state: stat.defeated};
            }
        }

    } catch (e) {
        Logger.error("----service  / Clientsel  /  srxfcseladminij ---------", e);
        return {state: stat.defeated};
    }

}

// 分页查询
export async function srxfcseladminq(pageSize, pageIndex) {
    //查询所有数据
    const data = await AllEnquiries(administrator);
    //总页数
    const pageCount = Math.ceil(data.length / pageSize);
    //总数据
    const Total = data.length;
    try {
        const seladminq = await Pagination(administrator, pageIndex, pageSize);
        if (seladminq.length > 0) {
            return {state: stat.succeed, data: seladminq, page: pageCount, total: Total, date: data}
            //返回状态值1  查询成功  data分页数据   page 总页数  total总数据量   date 全部数据[Excel下载使用：下载全部数据]
        } else {
            //返回状态值0  查询失败
            return {state: stat.defeated}
        }
    } catch (e) {
        Logger.error("----service  / Clientsel  /  srxfcseladminq ---------", e);
        return {state: stat.defeated}
    }
}

//查询邮箱
export async function srxfcselEmailh(mageName) {
    try {
        let manage = await getConnection()
            .createQueryBuilder(superadministrator, "superadministrator")
            .where("superAdministrator.administratorName=:administratorName", {administratorName: mageName})
            .getOne();
        if (manage) {
            //修改成功
            return {state: stat.succeed, data: manage};
        } else {
            //修改失败
            return {state: stat.defeated};
        }
    } catch (e) {
        Logger.error("----service  / Clientsel  /  srxfcselEmailh ---------", e);
        return {state: stat.defeated};
    }
}

// 判断token是否过期
export async function srxfcsessiontime(user,uuid) {
    try {
        let session = await get(user + "_" + uuid);
        if (session) {
            await udp(user + "_" + uuid, 600);
            return {state: stat.succeed}
        } else {
            return {state: stat.hhgq}
        }
    } catch (e) {
        Logger.error("----service  / Clientsel  /  srxfcsessiontime ---------", e)
        return {state: stat.hhgq}
    }
}

// 超级管理员 登录 （登录名称 登录密码）
export async function srxfcsuperregisterq(retrieve, yzmq, uuida, uuid) {
    try {
        let aretrieve = JSON.parse(retrieve)
        let tokenkey = aretrieve.administratorName;
        let a = await get(uuida);
        let tokenjm = uuid;
        //if (tokenkey && !await get(tokenjm+"_"+tokenkey)
        if (tokenkey && !await get(tokenjm + "_" + tokenkey)) {

            //  set(tokenkey, tokenjm);
            set(tokenjm + "_" + tokenkey, Math.random() * 10000, 600);
        }
        if (a == yzmq) {
            const seluser = await queryCondition(superadministrator, retrieve);
            // 如果登录状态为1 可以登录 返回1
            if (seluser) {
                //     let tokenvalue = await get(tokenkey);
                let tokenvalue = await get(tokenjm + "_" + tokenkey);

                return {state: stat.succeed, token: tokenjm + "_" + tokenkey};
                // return {state: stat.succeed, token: tokenvalue};
            } else {
                //不可以登录 返回3
                return {state: stat.jurisdiction};
            }
        } else {
            //验证码错误  返回8
            return {state: stat.yzmerror};
        }


    } catch (e) {
        Logger.error("----service  / Clientsel  /  srxfcsuperregisterq ---------", e)
        return {state: stat.jurisdiction};
    }


}

// 判断token是否过期
export async function cjglhh(retrieve, uuid) {
    try {

        let aretrieve = JSON.parse(retrieve)
        let tokenkey = aretrieve.administratorName;
        let tokenjm = uuid;
        // let tokenjm = encrypt(token, "abcdefgabcdefg12");
        if (await get(tokenjm + "_" + tokenkey)) {
            return {state: stat.succeed}
        } else {
            return {state: stat.jurisdiction};
        }

    } catch (e) {
        Logger.error("----service  / Clientsel  /  cjglhh ---------", e)
        return {state: stat.jurisdiction};
    }
}

//对已发到邮箱的验证码进行验证，便于激活后续操作
export async function receive_code_yz(administratorMail, administratorName, yzm, sjm) {
    try {
        if (yzm && sjm && yzm.length >= 6 && sjm.length >= 36) {
            let val = await get(sjm);
            if (val == yzm) {
                let upd = await getConnection()
                    .createQueryBuilder()
                    .update(superadministrator)
                    .set({administratorMail: administratorMail})
                    .where({administratorName: administratorName})
                    .execute();
                if (upd.affected >= 1) {
                    //添加成功
                    return {state: stat.succeed};
                } else {
                    //添加失败
                    return {state: stat.defeated};
                }
                return;

            } else {
                return {state: stat.yzmerror};
                return;
            }
        } else {
            return {state: "data_err"};
        }
    } catch (e) {
        Logger.error("----service  / Clientsel  /  receive_code_yz ---------", e)
        return {state: "data_err"};
    }
}

/**
 * 邮箱验证之发送邮件
 */
export async function srx_email_gs(sj_code, cli_email) {
    try {
        let key_code = uuid(6, 26);//6验证码   value
        if (cli_email && cli_email.length > 6 && sj_code && sj_code.length == 36) {
            /**
             * 先查询邮箱可用否
             */
            const postRepository = getManager().getRepository(superadministrator);
            //查询操作
            let newPost = await postRepository.findOne({administratorMail: cli_email});
            if (newPost) {
                return {state: "have_emial"};  //邮箱已经注册过
            } else {
                set(sj_code, key_code, 10 * 60);//redis数据库
                //发送验证码
                await sendEmail({
                    receive: cli_email,
                    sub: "平台验证码",
                    text: key_code
                })
            }
        }
        return {state: "have_send"};
    } catch (e) {
        Logger.error("----service  / Clientsel  /  srx_email_gs ---------")
        return {state: "email_error"};
    }
}


// 清除redis会话
export async function delredis(retrieve, uuid) {
    try {


        let tokenkey = retrieve;
        let tokenjm = uuid;
        // let tokenjm = encrypt(token, "abcdefgabcdefg12");
        if (await get(tokenkey + "_" + tokenjm)) {
            await del(tokenkey + "_" + tokenjm)
            return {state: stat.succeed}
        } else {
            return {state: stat.defeated};
        }

    } catch (e) {
        Logger.error("----service  / Clientsel  /  cjglhh ---------", e)
        return {state: stat.defeated};
    }
}

// 根据时间段和公司查询本公司的员工
export async function seltimeemp(company, beforetime, aftertime, lm, pageIndex, pageSize) {

    try {
        let selemp = await queryRunner.query("SELECT \n" +
            "e.employeeregistrationformFileNumber,\n" +
            "e.employeeregistrationformName,\n" +
            "e.employeeregistrationformSex,\n" +
            "e.employeeregistrationformIDNumber,\n" +
            "e.employeeregistrationformWorkTime,\n" +
            "e.employeeregistrationform,\n" +
            "e.employeeregistrationformTypeOfWork,\n" +
            "e.employeeregistrationformNativePlace,\n" +
            "e.employeeregistrationformPlaceOfDomicile,\n" +
            "e.employeeregistrationformCategory,\n" +
            "e.employeeregistrationfromPhone\n" +
            "FROM \n" +
            "employeeregistrationform e LEFT JOIN socialsecurityexpense s\n" +
            "ON e.employeeregistrationformIDNumber = s.employeeregistrationformIDNumber\n" +
            "WHERE " +
            "e.corporateInformationTradeName = '" + company + "' AND s." + lm + ">0 AND\n" +
            "e.employeeregistrationformWorkTime>=('" + beforetime + "') AND e.employeeregistrationformWorkTime<=('" + aftertime + "')\n" +
            " LIMIT " + (pageIndex - 1) * pageSize + "," + pageSize);

        let Total = selemp.length;
        await queryRunner.release();
        if (selemp) {
            return {state: stat.succeed, data: selemp, Total: Total};
        } else {
            return {state: stat.defeated};
        }
    } catch (e) {
        Logger.error("----service  / report  /  seltimeemp ---------", e)
        return {state: stat.defeated};
    }

}