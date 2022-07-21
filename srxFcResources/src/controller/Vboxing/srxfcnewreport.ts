//新报表
import * as express from "express"
import {dxssj, gjjhjqc, yrdwlwyg, yrlwjbqkbab} from "../../service/newreport";
import {getpermiss, postpermiss} from "../../util/permission";
import {selyqgssbbyux, selYqszjbdbyux} from "../../service/Injury";
import stat from "../../util/state";
import {upd, updproportion, updproportion1, updso, updso1} from "../../service/retiredworkers";
import {liftBa, liftBa1, relation, relation1} from "../../service/Filing";

const Router = express.Router();
export default Router;


//阳泉工伤申报表(上月数，本月数)(盂县)
Router.post('/selyqgssbbyux', async (req, res) => {
    let per = await postpermiss("selyqgssbbyux", req);
    if (per.state == 77) {
        //获取条件参数
        let werretrieve = req.body.werretrieve;
        let wher = req.body.wher;
        if (werretrieve && wher) {
            let dson = await selyqgssbbyux(werretrieve, wher);
            // @ts-ignore
            dson.zhb = per.state
            res.json(dson);
        } else {
            //非空判断返回空值
            res.json(stat.nullvalue);
        }
    } else {
        res.json(per);
    }


});
//阳泉市参保单位人员增减变动表3-2(盂县)
Router.get('/selYqszjbdbyux', async (req, res) => {

    let per = await getpermiss("selYqszjbdbyux", req);
    if (per.state == 77) {
        //获取条件参数
        let werretrieve = req.query.werretrieve;
        let wher = req.query.wher;
        //设置每页数据量
        let pageSize = req.query.pageSize;
        //获取当前页数
        let pageIndex = req.query.pageIndex;

        if (werretrieve && wher && pageSize && pageIndex) {
            let dson = await selYqszjbdbyux(werretrieve, wher, pageIndex, pageSize);
            // @ts-ignore
            dson.zhb = per.state
            res.json(dson);
        } else {
            //非空判断返回空值
            res.json(stat.nullvalue);
        }
    } else {
        res.json(per);
    }


});


//2021年阳泉市《央视，国企，民营企业》新入职大学生明细表

Router.get("/dxsbasj", async (req, res) => {

    let per = await getpermiss("dxsbasj", req);
    if (per.state == 77) {
        //获取条件参数
        let werretrieve = req.query.werretrieve;
        //设置每页数据量
        let pageSize = req.query.pageSize;
        //获取当前页数
        let pageIndex = req.query.pageIndex;
        //获取模糊参数
        let wher = req.query.wher;

        let dson = await dxssj(werretrieve, wher, pageIndex, pageSize)
        // @ts-ignore
        dson.zhb = per.state
        res.json(dson)
    } else {
        res.json(per);
    }
})


//阳泉公积金汇缴清册

Router.get("/gjjhjqc", async (req, res) => {

    let per = await getpermiss("gjjhjqc", req);
    if (per.state == 77) {
        //获取条件参数
        let werretrieve = req.query.werretrieve;
        //获取模糊参数
        let wher = req.query.wher;
        //设置每页数据量
        let pageSize = req.query.pageSize;
        //获取当前页数
        let pageIndex = req.query.pageIndex;
        let dson = await gjjhjqc(werretrieve, wher, pageIndex, pageSize)
        // @ts-ignore
        dson.zhb = per.state
        res.json(dson)
    } else {
        res.json(per);
    }
})

//用人单位劳务关系人员基本情况备案表

Router.get("/yrlwjbqkbab", async (req, res) => {

    let per = await getpermiss("yrlwjbqkbab", req);
    if (per.state == 77) {
        //获取条件参数
        let werretrieve = req.query.werretrieve;
        //获取模糊参数
        let wher = req.query.wher;
        //设置每页数据量
        let pageSize = req.query.pageSize;
        //获取当前页数
        let pageIndex = req.query.pageIndex;
        let dson = await yrlwjbqkbab(werretrieve, wher, pageIndex, pageSize)
        // @ts-ignore
        dson.zhb = per.state
        res.json(dson)
    } else {
        res.json(per);
    }

})


//用人单位劳务用工基本情况备案表

Router.get("/yrdwlwyg", async (req, res) => {

    let per = await getpermiss("yrdwlwyg", req);
    if (per.state == 77) {
        //获取条件参数
        let werretrieve = req.query.werretrieve;
        let where = req.query.wher;
        let dson = await yrdwlwyg(werretrieve,where)
        // @ts-ignore
        dson.zhb = per.state
        res.json(dson)
    } else {
        res.json(per);
    }
})
//修改全部比例
Router.get("/updproportion",async (req,res)=>{
    let per = await getpermiss("updproportion",req);
    if(per.state==77){
    //参保险种
    let base=req.query.base;
    //值
    let retrieve = req.query.retrieve;
    //条件
    let werretrieve = req.query.werretrieve;
    if(base&&werretrieve&&retrieve){
        let dson=await updproportion(retrieve,werretrieve,base);

        await updso(werretrieve);
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
//修改工伤比例
Router.get("/gongshangbili",async (req,res)=>{
    let per = await getpermiss("gongshangbili",req);
    if(per.state==77){
    //参保险种
    let base=req.query.base;
    //值
    let retrieve = req.query.retrieve;
    //条件
    let werretrieve = req.query.werretrieve;
    if(base&&werretrieve&&retrieve){
        let dson=await updproportion1(retrieve,werretrieve,base);

        await updso1(werretrieve);
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
//(劳务派遣)用人单位劳动关系人员基本情况备案表
Router.get("/paiqianyrdwbab", async (req, res) => {
    let per = await getpermiss("paiqianyrdwbab",req);
    if(per.state==77){
        //获取条件参数
        let werretrieve = req.query.werretrieve;
        //设置每页数据量empbeian
        let pageSize = req.query.pageSize;
        //获取当前页数
        let pageIndex = req.query.pageIndex;
        //获取模糊参数
        let wher = req.query.wher;
        //区域
        let area=req.query.area
        if(werretrieve&&pageIndex&&pageSize&&wher){
            let dson = await relation1(werretrieve,wher,pageIndex,pageSize,area);
            // @ts-ignore
            // dson.zhb = per.state
            res.json(dson);
        }else{
            //非空判断返回空值
            res.json(stat.nullvalue);
        }
    }else {
        res.json(per);
    }
});
//用人单位终止或解除劳动合同备案表(市区)
Router.get("/yrdwjchtbashiqu", async (req, res) => {
    let per = await getpermiss("yrdwjchtbashiqu",req);
    if(per.state==77){
        //获取条件参数
        let werretrieve = req.query.werretrieve;
        //设置每页数据量
        let pageSize = req.query.pageSize;
        //获取当前页数
        let pageIndex = req.query.pageIndex;
        //获取模糊参数
        let wher = req.query.wher;
        //区域
        let area =req.query.area
        if(werretrieve&&pageIndex&&pageSize&&wher){
            let dson = await liftBa1(werretrieve,wher,pageIndex,pageSize,area);
            // @ts-ignore
            // dson.zhb = per.state
            res.json(dson);
        }else{
            //非空判断返回空值
            res.json(stat.nullvalue);
        }
    }else {
        res.json(per);
    }
});

//计算金额 特殊
Router.get("/jisuan",async (req,res)=>{
    // let per = await getpermiss("gongshangbili",req);
    // if(per.state==77){
    //条件
    let werretrieve = req.query.werretrieve;
    if(werretrieve){
        let dson=await upd(werretrieve);
        // // @ts-ignore
        // dson.zhb = per.state
        res.json(dson);
    }else{
        //非空判断返回空值1
        res.json(stat.nullvalue);
    }
    // }else {
    //     res.json(per);
    // }
});


Router.permissiom = "selyqgssbbyux:selYqszjbdbyux:dxsbasj:gjjhjqc:yrlwjbqkbab:yrdwlwyg:updproportion:gongshangbili:paiqianyrdwbab:yrdwjchtbashiqu:"
Router.des = "阳泉工伤申报表(上月数，本月数)(盂县):阳泉市参保单位人员增减变动表3-2(盂县):2021年阳泉市《央视，国企，民营企业》新入职大学生明细表:阳泉公积金汇缴清册:用人单位劳务关系人员基本情况备案表:用人单位劳务用工基本情况备案表:修改全部比例:修改工伤比例:(劳务派遣)用人单位劳动关系人员基本情况备案表:用人单位终止或解除劳动合同备案表(市区):"