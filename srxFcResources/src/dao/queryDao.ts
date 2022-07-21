import { getConnection, Table} from "typeorm";

const queryRunner = getConnection().createQueryRunner();

// export async function query() {
//     let querydata = await queryRunner.query("");
// }

const CONNECTION = getConnection();

//任意条件查询加分页
async function Multisearch(entity,pageIndex,pageSize,parameter) {
    let retrieveAll  = JSON.parse(parameter);
    //遍历出带有参数的条件
    for (let item in retrieveAll) {
        if (retrieveAll[item] == '') {
            delete retrieveAll[item];
        }
    }
    const semployeeand = await CONNECTION
        .getRepository(entity)
        .createQueryBuilder()
        .skip((pageIndex - 1) * pageSize)
        .take(pageSize)
        .where(retrieveAll)
        .getMany();
    return semployeeand;
}
async function MultinpsearchNo(entity,parameter) {
    //遍历出带有参数的条件
    for (let item in parameter) {
        if (parameter[item] == '') {
            delete parameter[item];
        }
    }
    const semployeeand = await CONNECTION
        .getRepository(entity)
        .createQueryBuilder()
        .where(parameter)
        .getMany();
    return semployeeand;
}

//任意条件查询
async function Multinpsearch(entity,parameter) {
    let retrieveAll  = JSON.parse(parameter);
    //遍历出带有参数的条件
    for (let item in retrieveAll) {
        if (retrieveAll[item] == '') {
            delete retrieveAll[item];
        }
    }
    const semployeeand = await CONNECTION
        .getRepository(entity)
        .createQueryBuilder()
        .where(retrieveAll)
        .getMany();
     if(semployeeand){
         return semployeeand
     }else{
         return [];
     }
}

// 查询全部加分页
async function Pagination(entity,pageIndex,pageSize){
    const pagination = await CONNECTION
        .getRepository(entity)
        .createQueryBuilder()
        .skip((pageIndex - 1) * pageSize)
        .take(pageSize)
        .getMany();
    return pagination;
}

// 查询全部
async function AllEnquiries(entity){
    const allenquiries = await CONNECTION
        .getRepository(entity)
        .find();

    return allenquiries
}

//单个条件查询  带条件查询（查重）
async function queryCondition(entity,parameter){
    let retrieveAll  = JSON.parse(parameter);
    let querycondition = await CONNECTION
        .getRepository(entity)
        .createQueryBuilder()
        .where(retrieveAll)
        .getOne();
    return querycondition
}

//单个条件查询 不转JSON
async function queryConditionNo(entity,parameter){
    let querycondition = await CONNECTION
        .getRepository(entity)
        .createQueryBuilder()
        .where(parameter)
        .getOne();

    return querycondition
}


//带条件查询加分页
async function Singlesearch(entity,pageIndex,pageSize,parameter) {
    let retrieveAll  = JSON.parse(parameter);

    const semployeeand = await CONNECTION
        .getRepository(entity)
        .createQueryBuilder()
        .skip((pageIndex - 1) * pageSize)
        .take(pageSize)
        .where(retrieveAll)
        .getMany();
    return semployeeand;
}
async function Singlesearchh(entity,pageIndex,pageSize,parameter) {
    let retrieveAll  = JSON.parse(parameter);

    const semployeeand = await CONNECTION
        .getRepository(entity)
        .createQueryBuilder()
        .skip((pageIndex - 1) * pageSize)
        .take(pageSize)
        .where(retrieveAll)
        .orderBy('certificatelaborcontractTerminationTime','DESC')
        .getMany();
    return semployeeand;
}

// 登录查询
async function dl(entity,parameter){
    let retrieveAll  = JSON.parse(parameter);
    const loginmessage = await CONNECTION
        .getRepository(entity)
        .createQueryBuilder()
        .where(retrieveAll)
        .getOne();

    return loginmessage

}

//模糊查询 带分页
async function zccxmh(entity, pageIndex, pageSize, parameter) {
    let retrieveAll = JSON.parse(parameter);
    //遍历括号对象的字段
    let a = [];
    //便利括号对象的值
    let b = [];
    //遍历出带有参数的条件
    for (let item in retrieveAll) {
        //如果值有空的删除了
        if (retrieveAll[item] == '') {
            delete retrieveAll[item];
        } else {
            a.push(item);
        }
    }
    for (let ai in retrieveAll) {
        b.push(retrieveAll[ai])
    }
    let mosql = "";
    for (let i = 0; i < a.length; i++) {
        mosql+= a[i] + " like " + "'%" + b[i] + "%'"+" and "
    }
    mosql=mosql.substr(0,mosql.length-5);

    const semployeeand = await CONNECTION
        .getRepository(entity)
        .createQueryBuilder()
        .skip((pageIndex - 1) * pageSize)
        .take(pageSize)
        .where(mosql)
        .getMany();
    return semployeeand;

}


//模糊查询不带分页
async function mhcxmh(entity, parameter) {
    let retrieveAll = JSON.parse(parameter);
    //遍历括号对象的字段
    let a = [];
    //便利括号对象的值
    let b = [];
    //遍历出带有参数的条件
    for (let item in retrieveAll) {
        //如果值有空的删除了
        if (retrieveAll[item] == '') {
            delete retrieveAll[item];
        } else {
            a.push(item);
        }
    }
    for (let ai in retrieveAll) {
        b.push(retrieveAll[ai])
    }
    let mosql = "";
    for (let i = 0; i < a.length; i++) {
        mosql+= a[i] + " LIKE " + "'%" + b[i] + "%'"+" and "
    }
    mosql=mosql.substr(0,mosql.length-5);
    const semployeeand = await CONNECTION
        .getRepository(entity)
        .createQueryBuilder()
        .where(mosql)
        .getMany();
    return semployeeand;

}


//模糊查询带分页(加单独条件)
async function mhcxmhfy(entity, pageIndex, pageSize, werpara, parameter) {
    let retrieveAll = JSON.parse(parameter);
    let wher = JSON.parse(werpara);
    //遍历括号对象的字段
    let a = [];
    let d = [];
    //便利括号对象的值
    let b = [];
    let c = [];

    //遍历出带有参数的条件
    for (let item in retrieveAll) {
        //如果值有空的删除了
        if (retrieveAll[item] == '') {
            delete retrieveAll[item];
        } else {
            a.push(item);
        }
    }
    for (let ai in retrieveAll) {
        b.push(retrieveAll[ai])
    }


    //遍历出带有参数的条件
    for (let item in wher) {
        //如果值有空的删除了
        if (wher[item] == '') {
            delete wher[item];
        } else {
            d.push(item);
        }
    }
    for (let ai in wher) {
        c.push(wher[ai]);
    }
    let wherTj = "";
    for (let i = 0; i < d.length; i++) {
        wherTj+= d[i] + " = '" + c[i]  + "' and ";
    }

    let mosql = "";
    for (let i = 0; i < a.length; i++) {
        mosql+= a[i] + " LIKE " + "'%" + b[i] + "%'"+" and "
    }
    if(mosql.length<=0){
        wherTj = wherTj.substr(0,wherTj.length - 5)
    }

    mosql=mosql.substr(0,mosql.length-5);
    const semployeeand = await CONNECTION
        .getRepository(entity)
        .createQueryBuilder()
        .skip((pageIndex - 1) * pageSize)
        .take(pageSize)
        .where(wherTj + mosql)
        .getMany();
    return semployeeand;

}

//模糊查询+总数据量(加单独条件)
async function mhcxmhzsjl(entity, werpara, parameter) {
    let retrieveAll = JSON.parse(parameter);
    let wher = JSON.parse(werpara);
    //遍历括号对象的字段
    let a = [];
    let d = [];
    //便利括号对象的值
    let b = [];
    let c = [];

    //遍历出带有参数的条件
    for (let item in retrieveAll) {
        //如果值有空的删除了
        if (retrieveAll[item] == '') {
            delete retrieveAll[item];
        } else {
            a.push(item);
        }
    }
    for (let ai in retrieveAll) {
        b.push(retrieveAll[ai])
    }


    //遍历出带有参数的条件
    for (let item in wher) {
        //如果值有空的删除了
        if (wher[item] == '') {
            delete wher[item];
        } else {
            d.push(item);
        }
    }
    for (let ai in wher) {
        c.push(wher[ai]);
    }
    let wherTj = "";
    for (let i = 0; i < d.length; i++) {
        wherTj+= d[i] + " = '" + c[i]  + "' and ";
    }
    let mosql = "";
    for (let i = 0; i < a.length; i++) {
        mosql+= a[i] + " LIKE " + "'%" + b[i] + "%'"+" and "
    }
    if(mosql.length<=0){
        wherTj = wherTj.substr(0,wherTj.length - 5)
    }
    mosql=mosql.substr(0,mosql.length-5);
    const semployeeand = await CONNECTION
        .getRepository(entity)
        .createQueryBuilder()
        .where(wherTj + mosql)
        .getMany();
    return semployeeand;

}

//模糊查询带分页(加单独条件)
async function mhcxmhfyy(entity, pageIndex, pageSize, werpara, parameter) {
    let retrieveAll = JSON.parse(parameter);
    let wher = JSON.parse(werpara);
    //遍历括号对象的字段
    let a = [];
    let d = [];
    //便利括号对象的值
    let b = [];
    let c = [];

    //遍历出带有参数的条件
    for (let item in retrieveAll) {
        //如果值有空的删除了
        if (retrieveAll[item] == '') {
            delete retrieveAll[item];
        } else {
            a.push(item);
        }
    }
    for (let ai in retrieveAll) {
        b.push(retrieveAll[ai]);
    }


    //遍历出带有参数的条件
    for (let item in wher) {
        //如果值有空的删除了
        if (wher[item] == '') {
            delete wher[item];
        } else {
            d.push(item);
        }
    }
    for (let ai in wher) {
        c.push(wher[ai]);
    }
    let wherTj = "";
    for (let i = 0; i < d.length; i++) {
        wherTj+= d[i] + " = '" + c[i]  + "' and ";
    }

    let mosql = "";
    for (let i = 0; i < a.length; i++) {
        mosql+= a[i] + " LIKE " + "'%" + b[i] + "%'"+" and "
    }
    if(mosql.length<=0){
        wherTj = wherTj.substr(0,wherTj.length - 5)
    }

    mosql=mosql.substr(0,mosql.length-5);
    if(mosql!=''){
        const semployeeand = await CONNECTION
            .getRepository(entity)
            .createQueryBuilder()
            .skip((pageIndex - 1) * pageSize)
            .take(pageSize)
            .where(mosql+" AND approvalformOverdueUnit = 0")
            .getMany();
        return semployeeand;
    }else{
        const semployeeand = await CONNECTION
            .getRepository(entity)
            .createQueryBuilder()
            .skip((pageIndex - 1) * pageSize)
            .take(pageSize)
            .where("approvalformOverdueUnit = 0")
            .getMany();
        return semployeeand;
    }
}

async function mhcxmhzsjll(entity, werpara, parameter) {
    let retrieveAll = JSON.parse(parameter);
    let wher = JSON.parse(werpara);
    //遍历括号对象的字段
    let a = [];
    let d = [];
    //便利括号对象的值
    let b = [];
    let c = [];

    //遍历出带有参数的条件
    for (let item in retrieveAll) {
        //如果值有空的删除了
        if (retrieveAll[item] == '') {
            delete retrieveAll[item];
        } else {
            a.push(item);
        }
    }
    for (let ai in retrieveAll) {
        b.push(retrieveAll[ai])
    }


    //遍历出带有参数的条件
    for (let item in wher) {
        //如果值有空的删除了
        if (wher[item] == '') {
            delete wher[item];
        } else {
            d.push(item);
        }
    }
    for (let ai in wher) {
        c.push(wher[ai]);
    }
    let wherTj = "";
    for (let i = 0; i < d.length; i++) {
        wherTj+= d[i] + " = '" + c[i]  + "' and ";
    }
    let mosql = "";
    for (let i = 0; i < a.length; i++) {
        mosql+= a[i] + " LIKE " + "'%" + b[i] + "%'"+" and "
    }
    if(mosql.length<=0){
        wherTj = wherTj.substr(0,wherTj.length - 5)
    }
    mosql=mosql.substr(0,mosql.length-5);
    const semployeeand = await CONNECTION
        .getRepository(entity)
        .createQueryBuilder()
        .where(mosql)
        .getMany();
    return semployeeand;

}



export {MultinpsearchNo,mhcxmhzsjl,mhcxmhfy,mhcxmh,zccxmh,Multisearch,Pagination,AllEnquiries,queryCondition,Singlesearch,Singlesearchh,Multinpsearch,dl,queryConditionNo,mhcxmhfyy,mhcxmhzsjll}