import * as path from 'path';
import {quaxian} from "./routeUtil";
import {interfacetable} from "../entity/interfacetable";
import {getConnection} from "typeorm";


export function test() {
    try {
        let permiss={
            permiss:'',
            des:''
        };
        let des;
        var rs = quaxian();
        for (let i = 0; i < rs.length; i++) {
            if(rs[i].qx!=undefined){

                permiss.permiss += rs[i].qx;
            }
            if(rs[i].ms!=undefined){
                permiss.des += rs[i].ms;
            }


        }
        permiss.permiss = permiss.permiss.slice(0,permiss.permiss.length-1);
        permiss.des = permiss.des.slice(0,permiss.des.length-1);
        return permiss;
    } catch (err) {
        console.log("路由文件有问题");
    }
}
export async function perm(){

    getConnection().createQueryRunner().query("DELETE FROM interfacetable");


    let a = test();
    let b = a.des.split(":");
    let c = a.permiss.split(":");
    let arr = {
        interfaceId:0,
        interfaceName:"",
        interfaceDescribe:""
    };
    let dson;
    for (let i = 0; i < c.length; i++) {
        arr.interfaceId = i+1;
        arr.interfaceName = c[i];
        arr.interfaceDescribe = b[i];
        dson = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(interfacetable)
            .values(arr)
            .execute();

    }
    return dson;
}
