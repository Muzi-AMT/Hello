//企业赋权

import {del} from "../dao/deleteDao";
import {updtoolsNull} from "../dao/updataDao";
import {queryCondition} from "../dao/queryDao";
import {loginmessage} from "../entity/loginmessage";
import {hrdept} from "../entity/hrdept";
import {corporateinformation} from "../entity/corporateinformation";
import {approvalform} from "../entity/approvalform";
import stat from "../util/state";
import Log4js from "../util/logs";
import {updtools} from "../dao/updataDao";
import {certificatelaborcontract} from "../entity/certificatelaborcontract";
import {employeeregistrationform} from "../entity/employeeregistrationform";
import {Connection, getConnection} from "typeorm";
import {query} from "../dao/stopped";

const Logger = Log4js.getLogger('error');

//删除多表信息（赋权功能已完成）
export async function multitableinfo(retrieve, retrieve1, retrieve3) {
    try {
        //删除登录表
        const dellog = await del(loginmessage, retrieve1);
        //删除人力资源管理部门信息
        const delhr = await del(hrdept, retrieve1);
        //删除企业信息
        const delcor = await del(corporateinformation, retrieve3);
        //删除审批表
        const delapp = await del(approvalform, retrieve);

        if (dellog.affected == 1 && delhr.affected == 1 && delcor.affected == 1 && delapp.affected == 1) {
            return {state: stat.succeed}
        } else {
            return {state: stat.defeated}
        }

    } catch (e) {
        Logger.error("----service  / Empowering  /  multitableinfo ---------", e);
        return {state: stat.defeated}
    }

}

// 修改多表信息（赋权功能已完成）
export async function Modifyinformation(werretrieve, werretrieve1, werretrieve2, werretrieve3, retrieve, retrieve1, retrieve2, retrieve3) {
    try { //查重企业信息名称
        let corpNameC = await queryCondition(corporateinformation, werretrieve3);
        let trname = JSON.parse(werretrieve3);
        //查找过期单位id吧该公司全部人解除
        let gqemp = JSON.parse(retrieve);

        if (gqemp.approvalformOverdueUnit == 1) {

            // @ts-ignore
            if (corpNameC == null || corpNameC.corporateInformationTradeName == trname.corporateInformationTradeName) {
                //修改审核表
                let srxfcupdspappr = await updtoolsNull(approvalform, retrieve, werretrieve);
                //修改登录表
                let srxfcupdlogin = await updtoolsNull(loginmessage, retrieve1, werretrieve1);
                //修改人力资源表
                let srxfcupdHRP = await updtoolsNull(hrdept, retrieve2, werretrieve2);
                //修改企业表
                let srxfcupdcorp = await updtoolsNull(corporateinformation, retrieve3, werretrieve3);


                // if (srxfcupdspappr.affected == 1 || srxfcupdlogin.affected == 1 || srxfcupdHRP.affected == 1 || srxfcupdcorp.affected == 1) {
                //     // 修改成功 返回1
                //     return {state: stat.succeed};
                //
                // } else {
                //     // 修改失败 返回0
                //     return {state: stat.defeated};
                // }

                //   自动解除该单位全部职工
                //查询该公司有没有员工
                let emp = await getConnection()
                    .getRepository(employeeregistrationform)
                    .createQueryBuilder()
                    .where({corporateInformationTradeName: gqemp.approvalformTradeName.substring(0, gqemp.approvalformTradeName.length - 3)})
                    .getMany();

                if (emp.length > 0) {

                    let upd = await getConnection()
                        .createQueryBuilder()
                        .update(employeeregistrationform)
                        .set({corporateInformationTradeName: gqemp.approvalformTradeName})
                        .where({corporateInformationTradeName: gqemp.approvalformTradeName.substring(0, gqemp.approvalformTradeName.length - 3)})
                        .execute();
                    if (upd.affected > 0) {
                        // 修改成功 返回1
                        if (srxfcupdspappr.affected == 1 || srxfcupdlogin.affected == 1 || srxfcupdHRP.affected == 1 || srxfcupdcorp.affected == 1) {
                            // 修改成功 返回1
                            return {state: stat.succeed};

                        } else {
                            // 修改失败 返回0
                            return {state: stat.defeated};
                        }
                    } else {
                        // 修改失败 返回0
                        return {state: stat.defeated};
                    }
                } else {
                    if (srxfcupdspappr.affected == 1 || srxfcupdlogin.affected == 1 || srxfcupdHRP.affected == 1 || srxfcupdcorp.affected == 1) {
                        // 修改成功 返回1
                        return {state: stat.succeed};

                    } else {
                        // 修改失败 返回0
                        return {state: stat.defeated};
                    }
                }
            } else {
                //修改冲突  重复企业名称
                return {state: stat.repetition}
            }
        } else {
            // @ts-ignore
            if (corpNameC == null || corpNameC.corporateInformationTradeName == trname.corporateInformationTradeName) {
                //修改审核表
                let srxfcupdspappr = await updtoolsNull(approvalform, retrieve, werretrieve);
                //修改登录表
                let srxfcupdlogin = await updtoolsNull(loginmessage, retrieve1, werretrieve1);
                //修改人力资源表
                let srxfcupdHRP = await updtoolsNull(hrdept, retrieve2, werretrieve2);
                //修改企业表
                let srxfcupdcorp = await updtoolsNull(corporateinformation, retrieve3, werretrieve3);

                //查询该公司有没有员工
                const queryRunner = getConnection().createQueryRunner();
                let emp = await query("select * from employeeregistrationform where corporateInformationTradeName like '%" + gqemp.approvalformTradeName + "%'");


                if (emp.length > 0) {

                    let upd;
                    for (let i = 0; i < emp.length; i++) {
                        if (emp[i].corporateInformationTradeName.indexOf("(停)") > -1) {
                            upd = await getConnection()
                                .createQueryBuilder()
                                .update(employeeregistrationform)
                                .set({corporateInformationTradeName: emp[i].corporateInformationTradeName.substring(0, emp[i].corporateInformationTradeName.length - 3)})
                                .where({corporateInformationTradeName: gqemp.approvalformTradeName + "(停)"})
                                .execute();
                            if (upd&&upd.affected > 0) {
                                // 修改成功 返回1
                                if (srxfcupdspappr.affected == 1 || srxfcupdlogin.affected == 1 || srxfcupdHRP.affected == 1 || srxfcupdcorp.affected == 1) {
                                    // 修改成功 返回1
                                    return {state: stat.succeed};

                                } else {
                                    // 修改失败 返回0
                                    return {state: stat.defeated};
                                }
                            } else {
                                // 修改失败 返回0
                                return {state: stat.defeated};
                            }
                        } else {
                            // 修改成功 返回1
                            if (srxfcupdspappr.affected == 1 || srxfcupdlogin.affected == 1 || srxfcupdHRP.affected == 1 || srxfcupdcorp.affected == 1) {
                                // 修改成功 返回1
                                return {state: stat.succeed};

                            } else {
                                // 修改失败 返回0
                                return {state: stat.defeated};
                            }
                        }
                    }


                } else {
                    if (srxfcupdspappr.affected == 1 || srxfcupdlogin.affected == 1 || srxfcupdHRP.affected == 1 || srxfcupdcorp.affected == 1) {
                        // 修改成功 返回1
                        return {state: stat.succeed};

                    } else {
                        // 修改失败 返回0
                        return {state: stat.defeated};
                    }
                }

                if (srxfcupdspappr.affected == 1 || srxfcupdlogin.affected == 1 || srxfcupdHRP.affected == 1 || srxfcupdcorp.affected == 1) {
                    // 修改成功 返回1
                    return {state: stat.succeed};
                } else {
                    // 修改失败 返回0
                    return {state: stat.defeated};
                }
            } else {
                //修改冲突  重复企业名称
                return {state: stat.repetition}
            }
        }


    } catch (e) {
        Logger.error("----service  / Empowering  /  Modifyinformation ---------", e);
        return {state: stat.defeated};
    }
}

