//客户端基本信息  修改密码  登录 注册

import * as express from "express";
const Router = express.Router();
export default Router;
import {addStaf, Registered} from "../../service/Staffinfo";
import {chegpwd} from "../../service/Changepwd";
import {loginmessage} from "../../entity/loginmessage";
import {employLogin} from "../../service/Login";
import stat from "../../util/state";
//客户端 注册企业信息
Router.get("/insercenr",async(req, res)=>{

    //获取参数对象
    let retrieve=req.query.retrieve;
    //查重条件参数对象
    let werretrieve=req.query.werretrieve;


    if(werretrieve&&retrieve){
        let dson = await Registered(retrieve,werretrieve);
        res.json(dson);
    }else{
        //非空判断返回空值
        res.json(stat.nullvalue);
    }



});

//客户端企业修改登录密码
Router.get('/udpwdcenr',async (req,res)=>{

    // 用户名  旧密码  新密码
    //获取参数对象   修改参数对象
    let retrieve=req.query.retrieve;
    //获取条件参数对象
    let werretrieve=req.query.werretrieve;
    if(werretrieve&&retrieve){
        let dson = await chegpwd(loginmessage,retrieve,werretrieve);
        res.json(dson);
    }else{
        //非空判断返回空值
        res.json(stat.nullvalue);
    }


});

// 客户端中代理界面 登录 （登录名称 登录密码）

Router.get('/logincenr',async (req,res)=>{

    // 用户名  旧密码  新密码
    //获取参数对象   修改参数对象
    let retrieve=req.query.retrieve;
    if(retrieve){
        let dson = await employLogin(retrieve);
        res.json(dson);
    }else{
        //非空判断返回空值
        res.json(stat.nullvalue);
    }


});

