
import * as express from "express";

const Router = express.Router();
import stat from "../../util/state";
import {
    selcqzgsybx, selczdwsybx, selczdwsybxcq, seldwjnsybxbdb,
    seljqsybx,
    selpdcbdwsy, selpdsybx,
    selsybxhm, selsybxjf,
    selsybxzj,
    selzgsybxjs,
    selzgsybxzj
} from "../../service/report";
import {cpus} from "os";
import {getpermiss, postpermiss} from "../../util/permission";

export default Router;

// 阳泉市平定县参保单位缴纳失业保险费人员增（减）变动表
Router.post("/selpdcbdwsy",async (req,res)=>{
    let per = await postpermiss("selpdcbdwsy",req);
    if(per.state==77){
// 公司
        let company = req.body.company;
        // 分页
        let pageIndex = req.body.pageIndex;
        let pageSize = req.body.pageSize;
        // 时间
        let bbtime = req.body.bbtime;

        if(company&&pageIndex&&pageSize&&bbtime){
            let dson = await selpdcbdwsy(company,bbtime,pageIndex,pageSize);
            // @ts-ignore
            dson.zhb = per.state
            res.json(dson);
        }else{
            res.json({state:stat.nullvalue});
        }
    }else {
        res.json(per);
    }


});

// 阳泉市郊区失业保险费人员增减花名表
Router.post("/seljqsybx",async (req,res)=>{

    let per = await postpermiss("seljqsybx",req);
    if(per.state==77){
// 公司
        let company = req.body.company;
        // 分页
        let pageIndex = req.body.pageIndex;
        let pageSize = req.body.pageSize;
        // 时间
        let bbtime = req.body.bbtime;

        if(company&&pageIndex&&pageSize&&bbtime){
            let dson = await seljqsybx(company,bbtime,pageIndex,pageSize);
            // @ts-ignore
            dson.zhb = per.state
            res.json(dson);
        }else{
            res.json({state:stat.nullvalue});
        }
    }else {
        res.json(per);
    }


});

// 阳泉市城区职工个人缴纳失业保险费花名表
Router.post("/selcqzgsybx",async (req,res)=>{
    let per = await postpermiss("selcqzgsybx",req);
    if(per.state==77){
        // 公司
        let company = req.body.company;
        // 分页
        let pageIndex = req.body.pageIndex;
        let pageSize = req.body.pageSize;
        // 时间
        let bbtime = req.body.bbtime;

        if(company&&pageIndex&&pageSize&&bbtime){
            let dson = await selcqzgsybx(company,bbtime,pageIndex,pageSize);
            // @ts-ignore
            dson.zhb = per.state
            res.json(dson);
        }else{
            res.json({state:stat.nullvalue});
        }
    }else {
        res.json(per);
    }


});

// ？？？？年？？月缴纳失业保险费人员增（减）花名表
Router.post("/selsybxzj",async (req,res)=>{
    let per = await postpermiss("selsybxzj",req);
    if(per.state==77){
        // 公司
        let company = req.body.company;
        // 分页
        let pageIndex = req.body.pageIndex;
        let pageSize = req.body.pageSize;
        // 时间
        let bbtime = req.body.bbtime;

        if(company&&pageIndex&&pageSize&&bbtime){
            let dson = await selsybxzj(company,bbtime,pageIndex,pageSize);
            // @ts-ignore
            dson.zhb = per.state
            res.json(dson);
        }else{
            res.json({state:stat.nullvalue});
        }
    }else {
        res.json(per);
    }


});

// 阳泉市职工个人缴纳失业保险 增加
Router.post("/selzgsybxzj",async (req,res)=>{
    let per = await postpermiss("selzgsybxzj",req);
    if(per.state==77){
        // 公司
        let company = req.body.company;
        // 分页
        let pageIndex = req.body.pageIndex;
        let pageSize = req.body.pageSize;
        // 时间
        let bbtime = req.body.bbtime;

        if(company&&pageIndex&&pageSize&&bbtime){
            let dson = await selzgsybxzj(company,bbtime,pageIndex,pageSize);
            // @ts-ignore
            dson.zhb = per.state
            res.json(dson);
        }else{
            res.json({state:stat.nullvalue});
        }
    }else {
        res.json(per);
    }

});

// 阳泉市职工个人缴纳失业保险 减少
Router.post("/selzgsybxjs",async (req,res)=>{
    let per = await postpermiss("selzgsybxjs",req);
    if(per.state==77){
        // 公司
        let company = req.body.company;
        // 分页
        let pageIndex = req.body.pageIndex;
        let pageSize = req.body.pageSize;
        // 时间
        let bbtime = req.body.bbtime;

        if(company&&pageIndex&&pageSize&&bbtime){
            let dson = await selzgsybxjs(company,bbtime,pageIndex,pageSize);
            // @ts-ignore
            dson.zhb = per.state
            res.json(dson);
        }else{
            res.json({state:stat.nullvalue});
        }
    }else {
        res.json(per);
    }

});
//----------------------------------------------------------------------------------------------------------------------
// 失业保险花名表
Router.get("/selsybxhm",async (req,res)=>{
    let per = await getpermiss("selsybxhm",req);
    if(per.state==77){
        // 公司
        let company = req.query.company;
        // 分页
        let pageIndex = req.query.pageIndex;
        let pageSize = req.query.pageSize;
        // 时间
        let bbtime = req.query.bbtime;

        if(company&&pageIndex&&pageSize&&bbtime){
            let dson = await selsybxhm(company,bbtime,pageIndex,pageSize);
            // @ts-ignore
            dson.zhb = per.state
            res.json(dson);
        }else{
            res.json({state:stat.nullvalue});
        }
    }else {
        res.json(per);
    }

});

// 阳泉市失业保险缴费申报表
Router.post("/selsybxjf",async (req,res)=>{
    let per = await postpermiss("selsybxjf",req);
    if(per.state==77){
        // 公司
        let company = req.body.company;
        // 时间
        let bbtime = req.body.bbtime;
        if(company&&bbtime){
            let dson = await selsybxjf(company,bbtime);
            // @ts-ignore
            dson.zhb = per.state
            res.json(dson);
        }else{
            res.json({state:stat.nullvalue});
        }
    }else {
        res.json(per);
    }

});

// 城镇企事业单位缴纳失业保险金月（季）报表
Router.post("/selczdwsybx",async (req,res)=>{
    let per = await postpermiss("selczdwsybx",req);
    if(per.state==77){
// 公司
        let company = req.body.company;
        // 时间
        let bbtime = req.body.bbtime;

        if(company&&bbtime){
            let dson = await selczdwsybx(company,bbtime);
            // @ts-ignore
            dson.zhb = per.state
            res.json(dson);
        }else{
            res.json({state:stat.nullvalue});
        }
    }else {
        res.json(per);
    }


});

// 城镇企业（国家机关、事业单位）缴纳失业保险金月（季、年）报表
Router.post("/selczdwsybxcq",async (req,res)=>{
    let per = await postpermiss("selczdwsybxcq",req);
    if(per.state==77){
        // 公司
        let company = req.body.company;
        // 时间
        let bbtime = req.body.bbtime;
        if(company&&bbtime){
            let dson = await selczdwsybxcq(company,bbtime);
            // @ts-ignore
            dson.zhb = per.state
            res.json(dson);
        }else{
            res.json({state:stat.nullvalue});
        }
    }else {
        res.json(per);
    }


});

// 平定县失业保险缴费申报表
Router.get("/selpdsybx",async (req,res)=>{
    let per = await getpermiss("selpdsybx",req);
    if(per.state==77){
        // 公司
        let company = req.query.company;
        // 时间
        let bbtime = req.query.bbtime;

        if(company&&bbtime){
            let dson = await selpdsybx(company,bbtime);
            // @ts-ignore
            dson.zhb = per.state
            res.json(dson);
        }else{
            res.json({state:stat.nullvalue});
        }
    }else {
        res.json(per);
    }


});

// 阳泉市参保单位缴纳失业保险费人员增（减）变动表
Router.get("/seldwjnsybxbdb",async (req,res)=>{
    let per = await getpermiss("seldwjnsybxbdb",req);
    if(per.state==77){
        // 公司
        let company = req.query.company;
        // 分页
        let pageIndex = req.query.pageIndex;
        let pageSize = req.query.pageSize;
        // 时间
        let bbtime = req.query.bbtime;
        let area = req.query.area;

        if(company&&pageIndex&&pageSize&&bbtime){
            let dson = await seldwjnsybxbdb(company,bbtime,area,pageIndex,pageSize);
            // @ts-ignore
            dson.zhb = per.state
            res.json(dson);
        }else{
            res.json({state:stat.nullvalue});
        }
    }else {
        res.json(per);
    }



});

Router.permissiom="selpdcbdwsy:seljqsybx:selcqzgsybx:selsybxzj:selzgsybxzj:selzgsybxjs:selsybxhm:selsybxjf:selczdwsybx:selczdwsybxcq:selpdsybx:seldwjnsybxbdb:";

Router.des = "阳泉市平定县参保单位缴纳失业保险费人员增（减）变动表:阳泉市郊区失业保险费人员增减花名表:阳泉市城区职工个人缴纳失业保险费花名表:？？？？年？？月缴纳失业保险费人员增（减）花名表:阳泉市职工个人缴纳失业保险 增加:阳泉市职工个人缴纳失业保险 减少:失业保险花名表:阳泉市失业保险缴费申报表:城镇企事业单位缴纳失业保险金月（季）报表:城镇企业（国家机关、事业单位）缴纳失业保险金月（季、年）报表:平定县失业保险缴费申报表:阳泉市参保单位缴纳失业保险费人员增（减）变动表:";