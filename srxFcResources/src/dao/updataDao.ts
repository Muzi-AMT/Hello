// 修改工具
import {getConnection} from "typeorm";
const CONNECTION = getConnection();

// 修改
async function updtools(entity,parameter,werparameter){
    let retrieveAll  = JSON.parse(parameter);
    let wherAll = JSON.parse(werparameter);
    const upd = await CONNECTION
        .createQueryBuilder()
        .update(entity)
        .set(retrieveAll)
        .where(wherAll)
        .execute();

    return upd
}

// 修改加公司
async function updtoolsgs(entity,parameter,werparameter){
    // let retrieveAll  = JSON.parse(parameter);
    let wherAll = JSON.parse(werparameter);
    const upd = await CONNECTION
        .createQueryBuilder()
        .update(entity)
        .set(parameter)
        .where(wherAll)
        .execute();

    return upd
}

// 修改把空值删除
async function updtoolsNull(entity,parameter,werparameter){
    let retrieveAll  = JSON.parse(parameter);
    if(retrieveAll.approvalformEnterpriseNumber){
        if(retrieveAll.approvalformEnterpriseNumber.substring(0,1)=="D"&&retrieveAll.approvalformEnterpriseNumber.substring(1,2)=="D"){
            retrieveAll.approvalformEnterpriseNumber = retrieveAll.approvalformEnterpriseNumber.substring(retrieveAll.approvalformEnterpriseNumber.lastIndexOf("D"));
        }
    }

    //遍历出带有参数的条件
    for (let item in retrieveAll) {
        if (retrieveAll[item] == '') {
            delete retrieveAll[item];
        }
    }
    let wherAll = JSON.parse(werparameter);
    //遍历出带有参数的条件
    for (let item in wherAll) {
        if (wherAll[item] == '') {
            delete wherAll[item];
        }
    }
    const upd = await CONNECTION
        .createQueryBuilder()
        .update(entity)
        .set(retrieveAll)
        .where(wherAll)
        .execute();

    return upd
}

export {updtools,updtoolsNull,updtoolsgs}