// 修改代理企业保险数据
import * as express from "express";
const Router = express.Router();
export default Router;
import {addStaf} from "../../service/Staffinfo";
import {certificate, delClienSexT, delreschon, delsec, security, udpClienSexT} from "../../service/Amendlaborcontract";
import {
    fullcheck,
    fuzzy,
    querycondition, queryOnetion, selemployee,
    singlequery,
    werfullcheck,
    werfullpage, wermhfullonepage, wermhfullpage,werfullpagee
} from "../../service/Generalpagingfullcheck";
// 实体类
import {employeeregistrationform} from "../../entity/employeeregistrationform";
import {payrollinformation} from "../../entity/payrollinformation";
import { certificatelaborcontract } from "../../entity/certificatelaborcontract";
import {Modifysingleinformation, modrescind} from "../../service/Revise";
import { socialsecurityexpense } from "../../entity/socialsecurityexpense";
import stat from "../../util/state";
import {socialsecuritycost,updsoci} from "../../service/socialsecuritycost"
import {addData, udpData, updxdht} from "../../service/Addcentl";
import {laborcontract} from "../../entity/laborcontract";
import {corporateinformation} from "../../entity/corporateinformation";
import {addxdht, selxdht} from "../../service/addcon";
import {zccxmh} from "../../dao/queryDao";
import {renewchangelaborcontract} from "../../entity/renewchangelaborcontract";
import {socialsecurityfee} from "../../entity/socialsecurityfee";
import {selretire,updsbase,upd} from "../../service/retiredworkers";
import {getpermiss} from "../../util/permission";



// 解除劳动合同证明中的添加新证明
Router.get("/jcthzm",async (req,res)=>{
    let per = await getpermiss("jcthzm",req);
    if(per.state==77){
//获取参数对象
        let retrieve = req.query.retrieve;
        //获取条件参数对象
        let werretrieve = req.query.werretrieve;

        if(retrieve&&werretrieve){
            let dson = await certificate(retrieve,werretrieve);
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

// 社保费用中 删除个人社保费用信息
Router.get("/scgesbfyxx",async(req,res)=>{

    let per = await getpermiss("scgesbfyxx",req);
    if(per.state==77){
//接收前端传入的对象
        let retrieve = req.query.retrieve;
        if(retrieve){
            let dson = await delsec(retrieve);
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

//职工登记信息表+分页
//分页全查
Router.get("/zgdjxx",async(req,res)=>{
    let per = await getpermiss("zgdjxx",req);
    if(per.state==77){
        //设置每页数据量
        let pageSize = req.query.pageSize;
        //获取当前页数
        const pageIndex = req.query.pageIndex;

        if(pageSize&&pageIndex){
            let dson = await fullcheck(employeeregistrationform,pageSize,pageIndex);
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

//职工登记信息表  模糊查询+分页+显示职工基本信息
Router.get("/zgdjxxmucx",async(req,res)=>{
    let per = await getpermiss("zgdjxxmucx",req);
    if(per.state==77){
        //检索全部条件
        let retrieve = req.query.retrieve;
        //设置每页数据量
        let pageSize = req.query.pageSize;
        //获取当前页数
        const pageIndex = req.query.pageIndex;

        if(pageSize&&pageIndex&&retrieve){
            let dson = await werfullcheck(employeeregistrationform,pageSize,pageIndex,retrieve);
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

//添加职工信息  没上传图片
//使用业务添加职工
Router.get("/addzgxx",async(req,res)=>{
    let per = await getpermiss("addzgxx",req);
    if(per.state==77){
//获取参数对象
        let retrieve = req.query.retrieve;
        //查重条件参数对象
        let werretrieve = req.query.werretrieve;
        //查重条件参数对象
        let wherer = req.query.wherer;

        let gsmm = req.query.gsmm;
        if(werretrieve&&retrieve&&wherer){
            let dson = await addStaf(retrieve,werretrieve,wherer,gsmm);
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

// 模糊查询解除合同信息
Router.get("/mucxjcht",async(req,res)=>{
    let per = await getpermiss("mucxjcht",req);
    if(per.state==77){
//检索全部条件
        let retrieve = req.query.retrieve;
        //设置每页数据量
        let pageSize = req.query.pageSize;
        //获取当前页数
        const pageIndex = req.query.pageIndex;
        //获取单个条件企业名称条件
        let werpara = req.query.werpara;
        if(pageSize&&pageIndex&&retrieve){
            let dson = await wermhfullonepage(certificatelaborcontract,pageSize,pageIndex,werpara,retrieve);
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

// 分页查询工资发放信息表(根据日期检索查询    根据姓名检索查询)
// 使用业务层Generalpagingfullcheck 分页全查带条件
Router.get("/fycxgzff",async(req,res)=>{

    let per = await getpermiss("fycxgzff",req);
    if(per.state==77){
//检索查询
        let retrieve = req.query.retrieve;
        //设置每页数据量
        let pageSize = req.query.pageSize;
        //获取当前页数
        const pageIndex = req.query.pageIndex;
        if(pageSize&&pageIndex&&retrieve){
            let dson = await werfullcheck(payrollinformation,pageSize,pageIndex,retrieve);
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

// 查询解除劳动合同证明 根据身份证号码查询
//使用业务层Generalpagingfullcheck带条件查询分页
Router.get("/selldhezm",async(req,res)=>{

    let per = await getpermiss("selldhezm",req);
    if(per.state==77){
        let werretrieve=req.query.werretrieve;
        //设置每页数据量
        let pageSize = req.query.pageSize;
        //获取当前页数
        const pageIndex = req.query.pageIndex;
        if(pageSize&&pageIndex&&werretrieve){
            let dson = await werfullcheck(employeeregistrationform,pageSize,pageIndex,werretrieve);
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

    // 根据公司查询职工基本信息
// 使用业务层Generalpagingfullcheck带条件查询分页
Router.get("/selzgjbxx",async(req,res)=>{
    let per = await getpermiss("selzgjbxx",req);
    if(per.state==77){
//条件参数对象
        let werretrieve=req.query.werretrieve;
        //设置每页数据量
        let pageSize = req.query.pageSize;
        //获取当前页数
        const pageIndex = req.query.pageIndex;
        if(pageSize&&pageIndex&&werretrieve){
            let dson = await werfullpage(employeeregistrationform,pageSize,pageIndex,werretrieve);
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

// 根据公司名称查询(赋权特殊)
// 使用业务层Generalpagingfullcheck带条件查询
Router.get("/selgsmcspb",async(req,res)=>{
    let per = await getpermiss("selgsmcspb",req);
    if(per.state==77){
//检索查询
        let retrieve = req.query.retrieve;
        if(retrieve){
            let dson = await singlequery(retrieve);
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

// 根据员工身份证号查询
// 使用业务层Generalpagingfullcheck带条件查询
Router.get("/selygxmsfz",async(req,res)=>{
    let per = await getpermiss("selygxmsfz",req);
    if(per.state==77){
        //获取条件参数对象
        let werretrieve = req.query.werretrieve;
        if(werretrieve){
            let emp = await selemployee(werretrieve);
            // @ts-ignore
            emp.zhb = per.state
            res.json(emp);
        }else{
            //非空判断返回空值
            res.json(stat.nullvalue);
        }
    }else {
        res.json(per);
    }



});

// 查询解除合同信息
Router.get("/selfyjchexx",async (req,res)=>{

    let per = await getpermiss("selfyjchexx",req);
    if(per.state==77){
        // 获取前端传入的页数总数
        let pageIndex = req.query.pageIndex;
        let pageSize = req.query.pageSize;
        // 获取where条件参数
        let werretrieve = req.query.werretrieve;
        if(pageIndex&&pageSize&&werretrieve){
            let dson = await werfullpage(certificatelaborcontract,pageSize,pageIndex,werretrieve);
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

// 添加解除合同表
Router.get("/updjchtb",async(req,res)=>{
    let per = await getpermiss("updjchtb",req);
    if(per.state==77){
        //获取参数对象
        let retrieve = req.query.retrieve;
        //获取条件参数对象
        let werretrieve = req.query.werretrieve;
        //获取修改职工信息状态值
        let retrieve1 = req.query.retrieve1;

        if(retrieve&&werretrieve&&retrieve1){
            let dson = await modrescind(certificatelaborcontract,retrieve,werretrieve);
            if(dson.state==2){
                res.json(dson)
            }else{
                await Modifysingleinformation(employeeregistrationform,retrieve1,werretrieve);
                // @ts-ignore
                dson.zhb = per.state
                res.json(dson);
            }

        }else{
            //非空判断返回空值
            res.json(stat.nullvalue);
        }
    }else {
        res.json(per);
    }


});

// 删除职工信息全部数据（6个表）
Router.get("/delcliensex",async (req,res)=>{
    let per = await getpermiss("delcliensex",req);
    if(per.state==77){
//获取参数对象
        let werretrieve = req.query.werretrieve;
        if(werretrieve){
            let dson = await delClienSexT(werretrieve);
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


// 修改职工信息全部数据（6个表）
Router.get("/udpcliensex",async (req,res)=>{
    let per = await getpermiss("udpcliensex",req);
    if(per.state==77){
//获取参数对象
        let werretrieve = req.query.werretrieve;

        //修改职工信息表
        let retrieve = req.query.retrieve;
        //住房公积金
        let retrieve1 = req.query.retrieve1;
        //家庭成员
        let retrieve2 = req.query.retrieve2;
        // 医疗保险
        let retrieve3 = req.query.retrieve3;
        //养老保险
        let retrieve4 = req.query.retrieve4;
        //失业保险
        let retrieve5 = req.query.retrieve5;

        if(werretrieve&&retrieve&&retrieve1&&retrieve2&&retrieve3&&retrieve4&&retrieve5){
            let dson = await udpClienSexT(retrieve,retrieve1,retrieve2,retrieve3,retrieve4,retrieve5,werretrieve);
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

//解除劳动合同删除
Router.get("/delresc", async (req,res)=>{

    let per = await getpermiss("delresc",req);
    if(per.state==77){
//根据身份证号和企业名称删除
        let werretrieve = req.query.werretrieve;

        //获取状态值为0修改
        let retrieve = req.query.retrieve;

        if(werretrieve&&retrieve){
            let dson = await delreschon(werretrieve,retrieve);
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

//修改解除劳动合同
Router.get("/udpresc", async (req,res)=>{

    let per = await getpermiss("udpresc",req);
    if(per.state==77){
        let retrieve = req.query.retrieve;
        let werretrieve = req.query.werretrieve;

        if(retrieve&&werretrieve){
            let dson = await Modifysingleinformation(certificatelaborcontract,retrieve,werretrieve);
            // @ts-ignore
            dson.zhb = per.state
            res.json(dson);
        }else {
            //非空判断返回空值
            res.json(stat.nullvalue);
        }
    }else {
        res.json(per);
    }



});

//解除劳动合同单挑数据查询
Router.get("/seloneCer",async (req,res)=> {
    let per = await getpermiss("seloneCer",req);
    if(per.state==77){
//条件是身份证号码和企业名称
        let werretrieve = req.query.werretrieve;
        if(werretrieve){
            let dson = await queryOnetion(certificatelaborcontract,werretrieve);
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



//解除劳动合同单挑数据查询（职工表）
Router.get("/seloneempcor",async (req,res)=> {

    let per = await getpermiss("seloneempcor",req);
    if(per.state==77){
        //条件是身份证号码和企业名称
        let werretrieve = req.query.werretrieve;
        if(werretrieve){
            let dson = await queryOnetion(employeeregistrationform,werretrieve);
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



//保险缴纳信息查询分页
Router.get("/selsecur",async (req,res)=>{
    let per = await getpermiss("selsecur",req);
    if(per.state==77){
        // 获取前端传入的页数总数
        let pageIndex = req.query.pageIndex;
        let pageSize = req.query.pageSize;
        if(pageIndex&&pageSize){
            let dson = await fullcheck(socialsecurityexpense,pageSize,pageIndex);
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

// +  保险缴纳 年月条件检索查询分页
Router.get("/selwersecur",async (req,res)=>{
    let per = await getpermiss("selwersecur",req);
    if(per.state==77){
// 获取前端传入的页数总数
        let pageIndex = req.query.pageIndex;
        let pageSize = req.query.pageSize;
        let werretrieve = req.query.werretrieve;
        if(pageIndex&&pageSize&&werretrieve){
            let dson = await werfullcheck(socialsecurityexpense,pageSize,pageIndex,werretrieve);
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


//社保费用（新）查询单挑数据
Router.get("/selwerOnesecur",async (req,res)=> {

    let per = await getpermiss("selwerOnesecur",req);
    if(per.state==77){
        let werretrieve = req.query.werretrieve;
        if(werretrieve){
            let dson = await queryOnetion(socialsecurityexpense,werretrieve);
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

//添加劳务合同
Router.get("/addLabo",async (req,res)=> {
    let per = await getpermiss("addLabo",req);
    if(per.state==77){
        let retrieve = req.query.retrieve;
        let werretrieve = req.query.werretrieve;
        if(retrieve&&werretrieve){
            let dson = await addData(laborcontract,retrieve,werretrieve);
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

//修改劳务合同
Router.get("/udpLabo",async (req,res)=> {
    let retrieve = req.query.retrieve;
    let werretrieve = req.query.werretrieve;
    if(retrieve&&werretrieve){
        let dson = await udpData(laborcontract,retrieve,werretrieve);
        res.json(dson);
    }else{
        //非空判断返回空updbase值
        res.json(stat.nullvalue);
    }

});



//劳务合同企业表查询不加分页
Router.get("/sellaboqy",async (req,res)=> {

    let per = await getpermiss("sellaboqy",req);
    if(per.state==77){
        //条件是企业名称
        let werretrieve = req.query.werretrieve;
        if(werretrieve){
            let dson = await queryOnetion(corporateinformation,werretrieve);
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

//劳务合同职工表查询不加分页
Router.get("/sellabozg",async (req,res)=> {

    let per = await getpermiss("sellabozg",req);
    if(per.state==77){
        //条件是身份证号码和企业名称
        let werretrieve = req.query.werretrieve;
        if(werretrieve){
            let dson = await queryOnetion(employeeregistrationform,werretrieve);
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

//劳务合同查询单挑数据
Router.get("/sellabo",async (req,res)=> {

    let per = await getpermiss("sellabo",req);
    if(per.state==77){
        let werretrieve = req.query.werretrieve;
        if(werretrieve){
            let dson = await queryOnetion(laborcontract,werretrieve);
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


// 添加续订、变更合同
Router.get("/addcontract",async (req,res)=>{

    let per = await getpermiss("addcontract",req);
    if(per.state==77){
        //获取参数对象
        let werretrieve = req.query.werretrieve;
        let retrieve = req.query.retrieve;
        if(werretrieve&&retrieve){
            let dson = await addxdht(retrieve,werretrieve);
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

// 查询续订、变更合同
Router.get("/selcontract",async (req,res)=>{
    let per = await getpermiss("selcontract",req);
    if(per.state==77){
        //获取参数对象
        let werretrieve = req.query.werretrieve;
        //设置每页数据量
        let pageSize = req.query.pageSize;
        //获取当前页数
        const pageIndex = req.query.pageIndex;
        if(werretrieve&&pageSize&&pageIndex){
            let dson = await werfullpage(renewchangelaborcontract,pageSize,pageIndex,werretrieve);
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


// 修改续订、变更合同
Router.get("/updcontract" , async (req,res)=>{
    let per = await getpermiss("updcontract",req);
    if(per.state==77){
        // 获取修改条件
        let werretrieve = req.query.werretrieve;
        // 获取修改内容
        let retrieve = req.query.retrieve;

        if(werretrieve&&retrieve){
            let dson = await updxdht(retrieve,werretrieve);
            // @ts-ignore
            dson.zhb = per.state
            res.json(dson);
        }else{
            res.json(stat.nullvalue);
        }
    }else {
        res.json(per);
    }

})



// 社保费用中的添加社保费用
Router.get("/addsbfy",async(req,res)=>{
    let per = await getpermiss("addsbfy",req);
    if(per.state==77){
//获取参数对象
        let retrieve = req.query.retrieve;
        //获取条件参数对象
        let werretrieve = req.query.werretrieve;
        //获取条件参数对象
        let werdata =req.query.werdata;
        if(retrieve && werretrieve &&werdata){
            let dson = await socialsecuritycost(retrieve,werretrieve,werdata);
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

//社保费用（新）查询单挑数据
Router.get("/selsoci",async (req,res)=> {
    let per = await getpermiss("selsoci",req);
    if(per.state==77){
        let retrieve = req.query.retrieve;
        if(retrieve){
            let dson = await queryOnetion(socialsecurityexpense,retrieve);
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


//修改社保费用表
Router.get("/updsoci",async (req,res)=>{
    let per = await getpermiss("updsoci",req);
    if(per.state==77){
//获取参数对象
        let retrieve = req.query.retrieve;
        //获取条件参数对象
        let werdata =req.query.werdata;

        if(retrieve  &&werdata){
            let dson = await updsoci(retrieve,werdata);
            if(dson){
            // @ts-ignore
            dson.zhb = per.state
            res.json(dson);
            }else{
                res.json(stat.nullvalue);
            }
        }else{
            //非空判断返回空值
            res.json(stat.nullvalue);
        }
    }else {
        res.json(per);
    }

})


//根据身份证号查询社保费用表  分页
Router.get("/selpagesoci",async(req,res)=>{

    let per = await getpermiss("selpagesoci",req);
    if(per.state==77){
//检索查询
        let retrieve = req.query.retrieve;
        //设置每页数据量
        let pageSize = req.query.pageSize;
        //获取当前页数
        const pageIndex = req.query.pageIndex;
        if(pageSize&&pageIndex&&retrieve){
            let dson = await werfullpage(socialsecurityexpense,pageSize,pageIndex,retrieve);
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


// 社保费用中 删除个人社保费用信息   (弃用)
Router.get("/scgesbfyxxaaa",async(req,res)=>{

    let per = await getpermiss("scgesbfyxxaaa",req);
    if(per.state==77){
//接收前端传入的对象
        let retrieve = req.query.retrieve;
        if(retrieve){
            let dson = await delsec(retrieve);
            // @ts-ignore
            dson.zhb = per.state
            res.json(dson);
        }else{
            res.json(stat.nullvalue);
        }
    }else {
        res.json(per);
    }


});


//查询劳动合同信息加分页
Router.get("/sellwht",async(req,res)=>{

    let per = await getpermiss("sellwht",req);
    if(per.state==77){
        // 获取前端传入的页数总数
        let pageIndex = req.query.pageIndex;
        let pageSize = req.query.pageSize;
        // 获取where条件参数
        let werretrieve = req.query.werretrieve;
        if(pageIndex&&pageSize&&werretrieve){
            let dson = await werfullpage(laborcontract,pageSize,pageIndex,werretrieve);
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


//模糊查询劳动合同信息加分页
Router.get("/selmhlwht",async(req,res)=>{

    let per = await getpermiss("selmhlwht",req);
    if(per.state==77){
// 获取前端传入的页数总数
        let pageIndex = req.query.pageIndex;
        let pageSize = req.query.pageSize;
        // 获取where条件参数
        let werretrieve = req.query.werretrieve;
        //获取单个条件企业名称条件
        let werpara = req.query.werpara;
        if(werretrieve&&pageSize&&pageIndex&&werpara){
            let dson = await wermhfullonepage(laborcontract,pageSize,pageIndex,werpara,werretrieve);
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

// 公司名称查询员工
Router.get("/selcxyg", async (req,res)=>{

    let per = await getpermiss("selcxyg",req);
    if(per.state==77){
        // 获取公司名称
        let werretrieve = req.query.werretrieve;
        if(werretrieve){
            let dson = await querycondition(employeeregistrationform,werretrieve);
            // @ts-ignore
            dson.zhb = per.state
            res.json(dson);
        }else{
            res.json(stat.nullvalue);
        }
    }else {
        res.json(per);
    }

});



//模糊查询职工信息表加分页
Router.get("/selmhemp",async(req,res)=>{

    let per = await getpermiss("selmhemp",req);
    if(per.state==77){
        // 获取前端传入的页数总数
        let pageIndex = req.query.pageIndex;
        let pageSize = req.query.pageSize;
        // 获取where条件参数
        let werretrieve = req.query.werretrieve;
        //获取单个条件企业名称条件
        let werpara = req.query.werpara;
        if(werretrieve&&pageSize&&pageIndex&&werpara){
            let dson = await wermhfullonepage(employeeregistrationform,pageSize,pageIndex,werpara,werretrieve);
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


//模糊查询续订合同加分页
Router.get("/selmhrenw",async(req,res)=>{

    let per = await getpermiss("selmhrenw",req);
    if(per.state==77){
// 获取前端传入的页数总数
        let pageIndex = req.query.pageIndex;
        let pageSize = req.query.pageSize;
        // 获取where条件参数
        let werretrieve = req.query.werretrieve;
        //获取单个条件企业名称条件
        let werpara = req.query.werpara;
        if(werretrieve&&pageSize&&pageIndex&&werpara){
            let dson = await wermhfullonepage(renewchangelaborcontract,pageSize,pageIndex,werpara,werretrieve);
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



//续订合同查询单挑数据
Router.get("/selonerenw",async (req,res)=> {
    let per = await getpermiss("selonerenw",req);
    if(per.state==77){
        let retrieve = req.query.werretrieve;
        if(retrieve){
            let dson = await queryOnetion(renewchangelaborcontract,retrieve);
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

//根据身份证号查询社保费用表  分页
Router.get("/selpagesocifee",async(req,res)=>{
    let per = await getpermiss("selpagesocifee",req);
    if(per.state==77){
//检索查询
        let retrieve = req.query.retrieve;
        //设置每页数据量
        let pageSize = req.query.pageSize;
        //获取当前页数
        const pageIndex = req.query.pageIndex;
        if(pageSize&&pageIndex&&retrieve){
            let dson = await werfullpage(socialsecurityfee,pageSize,pageIndex,retrieve);
            // @ts-ignore
            dson.zhb = per.state
            res.json(dson);
        }else{
            //非空判断返回空值1
            res.json(stat.nullvalue);
        }
    }else {
        res.json(per);
    }

});

// 查询该退休员工
Router.get("/seltuixiu", async (req,res)=>{
    let per = await getpermiss("seltuixiu",req);
    if(per.state==77){
        let gs = req.query.gs;
        let agea = req.query.agea;
        if(gs&&agea){
            let dson = await selretire(gs,agea);
            // @ts-ignore
            dson.zhb = per.state
            res.json(dson);
        }else {
            //非空判断返回空值5
            res.json(stat.nullvalue);
        }
    }else {
        res.json(per);
    }


});

//修改后调基数

Router.get("/updbase",async (req,res)=>{
    let per = await getpermiss("updbase",req);
    if(per.state==77){
        //参保险种
        let base=req.query.base;
        //值
        let retrieve = req.query.retrieve;
        //条件
        let werretrieve = req.query.werretrieve;

        if(base&&werretrieve&&retrieve){
            let dson=await updsbase(retrieve,werretrieve,base);

            let d=await upd(werretrieve);
            // @ts-ignore
            dson.zhb = per.state
            res.json(dson);

        }else{
            //非空判断返回空值1
            res.json(stat.nullvalue);
        }
    }else {
        res.json(per);
    }

});


//导出表格接口

Router.get("/empdc",async (req,res)=>{
    //条件
    let werretrieve = req.query.werretrieve;

    if(werretrieve){
        let dson=await querycondition(employeeregistrationform,werretrieve);
        res.json(dson);

    }else{
        //非空判断返回空值1
        res.json(stat.nullvalue);
    }

});

Router.permissiom=("jcthzm:scgesbfyxx:zgdjxx:zgdjxxmucx:addzgxx:mucxjcht:fycxgzff:selldhezm:selzgjbxx:selgsmcspb:selygxmsfz:selfyjchexx:updjchtb:delcliensex:udpcliensex:delresc:udpresc:seloneCer:seloneempcor:selsecur:selwersecur:selwerOnesecur:addLabo:sellaboqy:sellabozg:sellabo:addcontract:selcontract:updcontract:addsbfy:selsoci:updsoci:selpagesoci:scgesbfyxxaaa:sellwht:selmhlwht:selcxyg:selmhemp:selmhrenw:selonerenw:selpagesocifee:seltuixiu:updbase:");
Router.des = "解除劳动合同证明中的添加新证明:社保费用中 删除个人社保费用信息:职工登记信息表+分页:职工登记信息表  模糊查询+分页+显示职工基本信息:添加职工信息  没上传图片:模糊查询解除合同信息:分页查询工资发放信息表(根据日期检索查询    根据姓名检索查询):查询解除劳动合同证明 根据身份证号码查询:根据公司查询职工基本信息:根据公司名称查询(赋权特殊): 根据员工身份证号查询:查询解除合同信息:添加解除合同表:删除职工信息全部数据（6个表）:修改职工信息全部数据（6个表）:解除劳动合同删除:修改解除劳动合同:解除劳动合同单挑数据查询:解除劳动合同单挑数据查询（职工表）:保险缴纳信息查询分页:保险缴纳 年月条件检索查询分页:社保费用（新）查询单挑数据:添加劳务合同:劳务合同企业表查询不加分页:劳务合同职工表查询不加分页:劳务合同查询单挑数据:添加续订、变更合同:查询续订、变更合同:修改续订、变更合同:社保费用中的添加社保费用:社保费用（新）查询单挑数据:修改社保费用表:根据身份证号查询社保费用表  分页:社保费用中 删除个人社保费用信息（弃用）:查询劳动合同信息加分页:模糊查询劳动合同信息加分页:公司名称查询员工:模糊查询职工信息表加分页:模糊查询续订合同加分页:续订合同查询单挑数据:根据身份证号查询社保费用表  分页:查询该退休员工:修改后调基数:";
