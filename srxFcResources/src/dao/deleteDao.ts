import {getConnection} from "typeorm";

const CONNECTION = getConnection();
//根据标号名字删除  接受对象  弊端 如果同一个接口删除不同的实体会报错
async function del(entity,parameter) {
    //格式转化
    let retrieveAll  = JSON.parse(parameter);
    const delRecord = await CONNECTION
        .createQueryBuilder()
        .delete()
        .from(entity)
        .where(retrieveAll)
        .execute();
    //返回值
    return delRecord
}

//同上，但值接受一个值  解决删除不同的实体的问题
async function delval(entity,parameter){
    const delRecord = await CONNECTION
        .createQueryBuilder()
        .delete()
        .from(entity)
        .where(parameter)
        .execute();
    //返回值
    return delRecord
}

export {del,delval}