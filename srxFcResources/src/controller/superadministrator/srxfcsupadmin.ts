// 超级管理员
import * as express from 'express'
import {qhjh} from "../../service/Clientadd";
import {srxfcchangepasswordq, srxfcsuperadmin} from "../../service/Clientupd";
import {srxfcdeldamink} from "../../service/Clientdel";
import {
    cjglhh, delredis,
    srxfcseladminij,
    srxfcseladminq,
    srxfcselEmailh,
    srxfcsessiontime,
    srxfcsuperregisterq
} from "../../service/Clientsel";
import {addStaf} from "../../service/Staffinfo";
import stat from "../../util/state";

const Router = express.Router();
export default Router;

//
Router.get("/addqhjh",async(req,res)=>{

    //定义好变量，接收前端传来的对象，修改条件
    let retrieve = req.query.retrieve;
    let werretrieve = req.query.werretrieve;
    if(retrieve&&werretrieve){
        let dson = await qhjh(retrieve,werretrieve);
        res.json(dson);
    }else{
        //非空判断返回空值
        res.json(stat.nullvalue);
    }


});

//个人中心 根据邮箱，修改密码
Router.get("/updxx",async(req,res)=>{

    let retrieve = req.query.retrieve;
    let werretrieve = req.query.werretrieve;
    if(retrieve&&werretrieve){
        let dson = await srxfcchangepasswordq(retrieve,werretrieve);
        res.json(dson);
    }else{
        //非空判断返回空值
        res.json(stat.nullvalue);
    }

});

// 删除管理员
Router.get("/delgly",async(req,res)=>{
    //定义好变量，接收前端传来的对象，修改条件
    let werretrieve = req.query.werretrieve;
    if(werretrieve){
        let dson = await srxfcdeldamink(werretrieve);
        res.json(dson);
    }else{
        //非空判断返回空值
        res.json(stat.nullvalue);
    }


})

//管理员登录
Router.get("/seldl",async(req,res)=>{

    let werretrieve = req.query.werretrieve;
    let uuid = req.query.uuid;
    if(werretrieve&&uuid){
        let dson = await srxfcseladminij(werretrieve,uuid);
        res.json(dson);
    }else{
        //非空判断返回空值
        res.json(stat.nullvalue);
    }
});

//分页查询权限表
Router.get("/selfy",async(req,res)=>{
    //设置每页数据量
    let pageSize = req.query.pageSize;
    //获取当前页数
    const pageIndex = req.query.pageIndex;
    if(pageIndex&&pageSize){
        let dson = await srxfcseladminq(pageSize,pageIndex);
        res.json(dson);
    }else{
        //非空判断返回空值
        res.json(stat.nullvalue);
    }

});

// 查询邮箱
Router.get("/selyx",async(req,res)=>{
    //接受管理员名称
    let mageName = req.query.mageName;
    if(mageName){
        let dson = await srxfcselEmailh(mageName);
        res.json(dson);
    }else{
        //非空判断返回空值
        res.json(stat.nullvalue);
    }

})

// 判断token是否过期
Router.get("/pdtokena",async (req,res)=>{
    let tokenkey = req.query.userName;
    let uuid = req.query.uuid;
    if(tokenkey&&uuid){
        let dson = await srxfcsessiontime(tokenkey,uuid);
        res.json(dson);
    }else{
        //非空判断返回空值
        res.json(stat.nullvalue);
    }

})

// 修改管理员
Router.get("/updadmin",async(req,res)=>{
    //前端传来的对象，修改前的值
    let retrieve = req.query.retrieve;
    //前端传来的对象，修改后的值（where条件）
    let werretrieve = req.query.werretrieve;
    if(retrieve&&werretrieve){
        let dson = await srxfcsuperadmin(werretrieve,retrieve);
        res.json(dson);
    }else{
        //非空判断返回空值
        res.json(stat.nullvalue);
    }

})

// 超级管理员 登录 （登录名称 登录密码）
Router.get("/superdl",async(req,res)=>{
    //获取参数对象
    let retrieve = req.query.retrieve;
    let yzmq = req.query.loginMessageLoginSecurityCode;
    let uuida = req.query.uuid;
    let uuid = req.query.cjuuid;
    if(retrieve&&yzmq&&uuida&&uuid){
        let dson = await srxfcsuperregisterq(retrieve,yzmq,uuida,uuid);
        res.json(dson);
    }else{
        //非空判断返回空值
        res.json(stat.nullvalue);
    }

})


// 超级管理员自动登录 （登录名称 登录密码）
Router.get("/zdsuperdl",async(req,res)=>{
    //获取参数对象
    let retrieve = req.query.retrieve;
    let uuid = req.query.cjuuid;
    if(retrieve&&uuid){
        let dson = await cjglhh(retrieve,uuid);
        res.json(dson);
    }else{
        //非空判断返回空值
        res.json(stat.nullvalue);
    }

})


//清除首页登录的redis会话
Router.get("/delhomereis",async(req,res)=>{
    //获取参数对象
    let username = req.query.userName;
    let uuid = req.query.uuid;
    if(username&&uuid){
        let dson = await delredis(username,uuid);
        res.json(dson);
    }else{
        //非空判断返回空值
        res.json(stat.nullvalue);
    }

})
