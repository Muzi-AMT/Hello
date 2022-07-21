//备案报表
import * as express from "express";
import stat from "../../util/state";
import {empba, liftBa, relation, yxbahm} from "../../service/Filing";
import {ConnectionIsNotSetError} from "typeorm";
import {getpermiss} from "../../util/permission";
const Router = express.Router();
export default Router;

//用人单位劳动关系人员基本情况备案表
Router.get("/yrdwbab", async (req, res) => {
    let per = await getpermiss("yrdwbab",req);
    if(per.state==77){
        //获取条件参数
        let werretrieve = req.query.werretrieve;
        //设置每页数据量empbeian
        let pageSize = req.query.pageSize;
        //获取当前页数
        let pageIndex = req.query.pageIndex;
        //获取模糊参数
        let wher = req.query.wher;
        if(werretrieve&&pageIndex&&pageSize&&wher){
            let dson = await relation(werretrieve,wher,pageIndex,pageSize);
            // @ts-ignore
            dson.zhb = per.state
            res.json(dson);
        }else{
            //非空判断返回空值
            res.json(stat.nullvalue);
        }
    }else {
        res.json(per);
    }



});


//用人单位终止或解除劳动合同备案表
Router.get("/yrdwjchtba", async (req, res) => {
    let per = await getpermiss("yrdwjchtba",req);
    if(per.state==77){
        //获取条件参数
        let werretrieve = req.query.werretrieve;
        //设置每页数据量
        let pageSize = req.query.pageSize;
        //获取当前页数
        let pageIndex = req.query.pageIndex;
        //获取模糊参数
        let wher = req.query.wher;

        if(werretrieve&&pageIndex&&pageSize&&wher){
            let dson = await liftBa(werretrieve,wher,pageIndex,pageSize);
            // @ts-ignore
            dson.zhb = per.state
            res.json(dson);
        }else{
            //非空判断返回空值
            res.json(stat.nullvalue);
        }
    }else {
        res.json(per);
    }



});


//(同盂县备案花名表)
Router.get("/yxbahmb", async (req, res) => {
    let per = await getpermiss("yxbahmb",req);
    if(per.state==77){
        //获取条件参数
        let werretrieve = req.query.werretrieve;
        //设置每页数据量
        let pageSize = req.query.pageSize;
        //获取当前页数
        let pageIndex = req.query.pageIndex;
        //获取模糊参数
        let wher = req.query.wher;
        if(werretrieve&&pageIndex&&pageSize&&wher){
            let dson = await yxbahm(werretrieve,wher,pageIndex,pageSize);
            // @ts-ignore
            dson.zhb = per.state
            res.json(dson);
        }else{
            //非空判断返回空值
            res.json(stat.nullvalue);
        }
    }else {
        res.json(per);
    }


});


//用人单位劳动用工基本情况备案表
Router.get("/empbeian", async (req, res) => {

    let per = await getpermiss("empbeian",req);
    if(per.state==77){
//获取条件参数
        let werretrieve = req.query.werretrieve;
        let where = req.query.where;
        if(werretrieve){
            let dson = await empba(werretrieve,where);
            // @ts-ignore
            dson.zhb = per.state
            res.json(dson);
        }else{
            //非空判断返回空值
            res.json(stat.nullvalue);
        }
    }else {
        res.json(per);
    }

});


Router.permissiom="yrdwbab:yrdwjchtba:yxbahmb:empbeian:";

Router.des = "用人单位劳动关系人员基本情况备案表:用人单位终止或解除劳动合同备案表:同盂县备案花名表:用人单位劳动用工基本情况备案表:";