// 劳务代理企业操作权限表
import * as express from "express";
import {certificate} from "../../service/Amendlaborcontract";
import {multitableinfo,Modifyinformation} from "../../service/Empowering";
import stat from "../../util/state";
import {getpermiss} from "../../util/permission";
const Router = express.Router();
export default Router;

// 劳务代理企业操作权限表中的删除企业注册信息
Router.get("/scqyzc",async(req,res)=>{
    let per = await getpermiss("scqyzc",req);
    if(per.state==77){
        //接收前端传入
        //审批的
        let retrieve = req.query.retrieve;
        //登录的
        let retrieve1 = req.query.retrieve1;
        //企业的
        let retrieve3 = req.query.retrieve3;

        if(retrieve&&retrieve1&&retrieve3){
            let dson = await multitableinfo(retrieve,retrieve1,retrieve3);
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

// 根据企业名称修改审批表 除了登录名称 其余都可修改
// 使用业务层Empowering修改多表信息（赋权功能已完成）
Router.get("/udpwer",async (req,res)=>{

    let per = await getpermiss("udpwer",req);
    if(per.state==77){

        //获取修改审核表参数对象
        let retrieve=req.query.retrieve;
        //获取审核表条件参数对象
        let werretrieve = req.query.werretrieve;
        //获取修改登录表参数对象
        let retrieve1=req.query.retrieve1;
        //获取登录表条件参数对象
        let werretrieve1 = req.query.werretrieve1;
        //获取修改人力资源表参数对象
        let retrieve2=req.query.retrieve2;
        //获取人力资源表条件参数对象
        let werretrieve2 = req.query.werretrieve2;
        //获取修改企业表参数对象
        let retrieve3=req.query.retrieve3;
        //获取企业表条件参数对象
        let werretrieve3 = req.query.werretrieve3;
        let trname = JSON.parse(retrieve)

        //console.log(trname.approvalformPensionNumber);

        if(retrieve&&retrieve1&&retrieve2&&retrieve3&&werretrieve&&werretrieve1&&werretrieve2&&werretrieve3){
            let dson = await Modifyinformation(werretrieve,werretrieve1,werretrieve2,werretrieve3,retrieve,retrieve1,retrieve2,retrieve3);
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
Router.permissiom="udpwer:scqyzc:";
Router.des = "劳务代理企业操作权限表中的删除企业注册信息:根据企业名称修改审批表 除了登录名称 其余都可修改:";


