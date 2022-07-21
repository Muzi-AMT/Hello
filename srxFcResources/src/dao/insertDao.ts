// 添加工具
import {getConnection} from "typeorm";

const CONNECTION = getConnection();

// 添加
async function addtools(entity,parameter){
    let retrieveAll  = JSON.parse(parameter);

    const adds = await CONNECTION
        .createQueryBuilder()
        .insert()
        .into(entity)
        .values(retrieveAll)
        .execute();

    return adds
}

// 添加无json
async function addtoolss(entity,parameter){

    const adds = await CONNECTION
        .createQueryBuilder()
        .insert()
        .into(entity)
        .values(parameter)
        .execute();

    return adds
}

export {addtools,addtoolss}