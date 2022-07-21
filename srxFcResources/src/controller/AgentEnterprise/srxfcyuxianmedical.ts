// 盂县参保单位医疗保险申报表
import * as express from "express";
import {
    selyangquan,
    selyangquanreduce,
    selyangquanshbx,
    selylhtjs, selylhtxz,
    selzgjibyl, ylbxsbb,
    YuxianMedical
} from "../../service/report";
const Router = express.Router();
import stat from "../../util/state";
import {getpermiss, postpermiss} from "../../util/permission";

export default Router;

//盂县参保单位保险申报表
Router.post("/selyuxianyl",async (req,res)=>{
    let per = await postpermiss("selyuxianyl",req);
    if(per.state==77){
        // 公司
        let company = req.body.company;
        // 时间
        let ddtime = req.body.ddtime;
        // 地区
        let area = req.body.area;

        if(company&&ddtime){
            let dson = await YuxianMedical(company,ddtime,area);
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

// 阳泉市参保单位缴纳医疗保险费变动表（增加）
Router.post("/selyq",async (req,res)=>{

    let per = await postpermiss("selyq",req);
    if(per.state==77){
// 公司
        let company = req.body.company;
        let pageIndex = req.body.pageIndex;
        let pageSize = req.body.pageSize;
        let bbtime = req.body.bbtime;

        if(company&&pageIndex&&pageSize&&bbtime){
            let dson = await selyangquan(company,pageIndex,pageSize,bbtime);
            // @ts-ignore
            dson.zhb = per.state
            res.json(dson);
        }else{
            res.json({state:stat.nullvalue})
        }
    }else {
        res.json(per);
    }


});

// 阳泉市参保单位缴纳医疗保险费变动表（减少）
Router.post("/selyqjs",async (req,res)=>{
    let per = await postpermiss("selyqjs",req);
    if(per.state==77){
        // 公司
        let company = req.body.company;

        let pageIndex = req.body.pageIndex;
        let pageSize = req.body.pageSize;
        let bbtime = req.body.bbtime;

        if(company&&pageIndex&&pageSize&&bbtime){
            let dson = await selyangquanreduce(company,pageIndex,pageSize,bbtime);
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

// 阳泉市社会保险缴费申报表
Router.post("/selyqshbxjf",async (req,res)=>{
    let per = await postpermiss("selyqshbxjf",req);
    if(per.state==77){
        // 公司
        let company = req.body.company;
        // 时间
        let bbtime = req.body.bbtime;

        //地区
        let area = req.body.area;
        if(company&&bbtime){
            let dson = await selyangquanshbx(company,bbtime,area);
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

// 职工基本医疗保险参保登记表
Router.post("/selzgjbyl",async (req,res)=>{
    let per = await postpermiss("selzgjbyl",req);
    if(per.state==77){
        // 公司
        let company = req.body.company;
        // 时间+
        let bbtime = req.body.bbtime;
        let pageIndex = req.body.pageIndex;
        let pageSize = req.body.pageSize;
        let area = req.body.area;
        if(company&&pageIndex&&pageSize&&bbtime){
            let dson = await selzgjibyl(company,bbtime,pageIndex,pageSize,area);
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

// ***单位*年*月减少人员合同花名表
Router.post("/selylhtjs",async (req,res)=>{
    let per = await postpermiss("selylhtjs",req);
    if(per.state==77){
// 公司
        let company = req.body.company;
        // 时间
        let bbtime = req.body.bbtime;

        let pageIndex = req.body.pageIndex;
        let pageSize = req.body.pageSize

        if(company&&bbtime&&pageSize&&pageIndex){
            let dson = await selylhtjs(company,bbtime,pageIndex,pageSize);
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

// ***单*年*月新增人员合同花名表
Router.post("/selylhtxz",async (req,res)=>{

    let per = await postpermiss("selylhtxz",req);
    if(per.state==77){
        // 公司
        let company = req.body.company;
        // 时间
        let bbtime = req.body.bbtime;

        let pageIndex = req.body.pageIndex;
        let pageSize = req.body.pageSize;

        if(company&&bbtime&&pageSize&&pageIndex){
            let dson = await selylhtxz(company,bbtime,pageIndex,pageSize);
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

// 企业基本养老保险费申报表
Router.get("/ylbxsbb", async (req, res) => {
    let per = await getpermiss("ylbxsbb", req);
    if (per.state == 77) {
        // 公司
        let werretrieve = req.query.werretrieve;
        // 时间
        let ctime = req.query.ctime;
        if (werretrieve && ctime) {
            let dson = await ylbxsbb(werretrieve, ctime);
            // @ts-ignore
            dson.zhb = per.state;
            res.json(dson);
        } else {
            //非空判断返回空值
            res.json({state: stat.nullvalue});
        }
    } else {
        res.json(per);
    }
});


Router.permissiom="selyuxianyl:selyq:selyqjs:selyqshbxjf:selzgjbyl:selylhtjs:selylhtxz:ylbxsbb:";

Router.des = "盂县参保单位保险申报表:阳泉市参保单位缴纳医疗保险费变动表（增加）:阳泉市参保单位缴纳医疗保险费变动表（减少）:阳泉市社会保险缴费申报表:职工基本医疗保险参保登记表:**单位*年*月减少人员合同花名表:单*年*月新增人员合同花名表:企业基本养老保险费申报表:";