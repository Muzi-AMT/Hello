//代理企业收费信息
import * as express from "express";
import stat from "../../util/state";
import {socialchargeinformation} from "../../entity/socialchargeinformation";

const Router = express.Router();
export default Router;
const fs = require("fs");
import * as multer from "multer"

let upload = multer({dest: "public"});
import {
    addcharge,
    updcharge,
    collect,
    selpayment,
    addpayment,
    updpayment,
    addapp,
    lpayment,
    summarytable
} from "../../service/enterprisecharge"
import {queryOnetion, werfullpage} from "../../service/Generalpagingfullcheck";
import {socialsecuritypayment} from "../../entity/socialsecuritypayment";
import {employeeregistrationform} from "../../entity/employeeregistrationform";
import {getConnection} from "typeorm";
import log4js from "../../util/logs";
import {getpermiss, postpermiss} from "../../util/permission";

const CONNECTION = getConnection();
const Logger = log4js.getLogger('error');

//添加社保收费信息
Router.get("/addcharge", async (req, res) => {
    let per = await getpermiss("addcharge", req);
    if (per.state == 77) {
        //获取参数对象
        let retrieve = req.query.retrieve;
        let monthofexpense = req.query.monthofexpense;

        if (retrieve) {
            let dson = await addcharge(retrieve,monthofexpense);
            // @ts-ignore
            dson.zhb = per.state
            res.json(dson);
        } else {
            //非空判断返回空值5
            res.json(stat.nullvalue);
        }
    } else {
        res.json(per);
    }

})

//查询社保收费信息
Router.get("/selcharge", async (req, res) => {

    let per = await getpermiss("selcharge", req);
    if (per.state == 77) {
        //检索查询
        let retrieve = req.query.retrieve;
        //设置每页数据量
        let pageSize = req.query.pageSize;
        //获取当前页数
        const pageIndex = req.query.pageIndex;
        if (pageSize && pageIndex && retrieve) {
            let dson = await werfullpage(socialchargeinformation, pageSize, pageIndex, retrieve);
            // @ts-ignore
            dson.zhb = per.state
            res.json(dson);
        } else {
            //非空判断返回空值5
            res.json(stat.nullvalue);
        }
    } else {
        res.json(per);
    }

});
//查询单条收费信息数据
Router.get("/selonecharge", async (req, res) => {

    let per = await getpermiss("selonecharge", req);
    if (per.state == 77) {
        let werretrieve = req.query.werretrieve;
        if (werretrieve) {
            let dson = await queryOnetion(socialchargeinformation, werretrieve);
            // @ts-ignore
            dson.zhb = per.state
            res.json(dson);
        } else {
            //非空判断返回空值5
            res.json(stat.nullvalue);
        }
    } else {
        res.json(per);
    }

});
//修改社保费用信息
Router.get("/updcharge", async (req, res) => {

    let per = await getpermiss("updcharge", req);
    if (per.state == 77) {
        let retrieve = req.query.retrieve;

        //获取条件
        let werretrieve = req.query.werretrieve;

        if (retrieve && werretrieve) {
            let dson = await updcharge(retrieve, werretrieve);
            // @ts-ignore
            dson.zhb = per.state
            res.json(dson);
        } else {
            //非空判断返回空值5
            res.json(stat.nullvalue);
        }
    } else {
        res.json(per);
    }

})
//代理企业收费汇总表
Router.get("/collect", async (req, res) => {

    let per = await getpermiss("collect", req);
    if (per.state == 77) {
        let gs = req.query.gs;
        //获取条件
        let time = req.query.timew;
        if (gs && time) {
            let dson = await collect(gs, time);
            // @ts-ignore
            dson.zhb = per.state
            res.json(dson);
        } else {
            //非空判断返回空值5
            res.json(stat.nullvalue);
        }
    } else {
        res.json(per);
    }

})

//添加社保缴纳信息
Router.get("/addpayment", async (req, res) => {
    let per = await getpermiss("addpayment", req);
    if (per.state == 77) {
//获取参数对象
        let retrieve = req.query.retrieve;

        let werretrieve = req.query.werretrieve;
        if (retrieve) {
            let dson = await addpayment(retrieve, werretrieve)
            // @ts-ignore
            dson.zhb = per.state
            res.json(dson);
        } else {
            //非空判断返回空值1
            res.json(stat.nullvalue);
        }
    } else {
        res.json(per);
    }

})

//单查代理企业社保缴纳信息
Router.get("/selonpayment", async (req, res) => {

    let per = await getpermiss("selonpayment", req);
    if (per.state == 77) {
        let werretrieve = req.query.werretrieve;
        if (werretrieve) {
            let dson = await queryOnetion(socialsecuritypayment, werretrieve);
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

//查询代理企业社保缴纳信息
Router.get("/selpayment", async (req, res) => {

    let per = await getpermiss("selpayment", req);
    if (per.state == 77) {
        let gs = req.query.gs;
        //获取条件
        let time = req.query.timew;
        if (gs && time) {
            let dson = await selpayment(gs, time);
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

})

//修改代理企业社保缴纳信息
Router.get("/updpayment", async (req, res) => {
    let per = await getpermiss("updpayment", req);
    if (per.state == 77) {
        let retrieve = req.query.retrieve;

        //获取条件
        let werretrieve = req.query.werretrieve;
        if (retrieve && werretrieve) {
            let dson = await updpayment(retrieve, werretrieve);
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

})
//企业缴纳各项费用汇总表
Router.get("/payment", async (req, res) => {
    let per = await getpermiss("payment", req);
    if (per.state == 77) {
        let gs = req.query.gs;
        //获取条件
        let time = req.query.timew;
        if (gs && time) {
            let dson = await lpayment(gs, time);
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

})
//代理企业各项费用(月)汇总表(生成)
Router.get("/summarytable", async (req, res) => {
    let per = await getpermiss("summarytable", req);
    if (per.state == 77) {
        //获取条件
        let time = req.query.timew;
        //设置每页数据量
        let pageSize = req.query.pageSize;
        //获取当前页数
        const pageIndex = req.query.pageIndex;
        if (pageSize && pageIndex && time) {
            let dson = await summarytable(time, pageSize, pageIndex);
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

})
//企业注册
Router.get("/addapp", async (req, res) => {
    let retrieve = req.query.retrieve;

    //获取条件
    let werretrieve = req.query.werretrieve;
    if (retrieve && werretrieve) {
        let dson = await addapp(retrieve, werretrieve);
        res.json(dson);
    } else {
        //非空判断返回空值
        res.json(stat.nullvalue);
    }

})
//上传头像
Router.post("/upload", upload.any(), async (req, res) => {

    try {
        let per = await postpermiss("upload", req);
        if (per.state == 77) {
            let file = req.files;
            let employeeregistrationformIDNumber = req.body.employeeregistrationformIDNumber

            let productPath = "photo/" + file[0].filename + ".jpg";
            fs.renameSync(file[0].path, "public/" + productPath);
            res.json({data: productPath})
            let upd = await CONNECTION
                .createQueryBuilder()
                .update(employeeregistrationform)
                .set({employeeregistrationformPhoto: productPath})
                .where({employeeregistrationformIDNumber: employeeregistrationformIDNumber})
                .execute();

            if (upd) {
                return {state: stat.succeed, data: productPath}//修改成功返回1
            } else {
                return {state: stat.defeated}//修改失败返回0
            }
        } else {
            res.json(per);
        }

    } catch (e) {
        Logger.error("-----controller  / AgencyExpense  / chargeinformation  / upload ---------", e)
    }
})
//上传工伤
Router.post("/uploadocc", upload.any(), async (req, res) => {

    try {
        let per = await postpermiss("uploadocc", req);
        if (per.state == 77) {
            let file = req.files;
            let employeeregistrationformIDNumber = req.body.employeeregistrationformIDNumber

            let productPath = "occ/" + file[0].filename + ".jpg";
            fs.renameSync(file[0].path, "public/" + productPath);
            res.json({data: productPath})
            let upd = await CONNECTION
                .createQueryBuilder()
                .update(employeeregistrationform)
                .set({employeeregistrationformInjuryRecorddata: productPath})
                .where({employeeregistrationformIDNumber: employeeregistrationformIDNumber})
                .execute();
            if (upd) {
                return {state: stat.succeed, data: productPath}//修改成功返回1
            } else {
                return {state: stat.defeated}//修改失败返回0
            }
        } else {
            res.json(per);
        }

    } catch (e) {
        Logger.error("-----controller  / AgencyExpense  / chargeinformation  / uploadocc ---------", e)
    }

});


Router.permissiom = "addcharge:selcharge:selonecharge:updcharge:collect:addpayment:selonpayment:selpayment:updpayment:payment:summarytable:addapp:upload:uploadocc:";

Router.des = "添加社保收费信息:查询社保收费信息:查询单条收费信息数据:修改社保费用信息:代理企业收费汇总表:添加社保缴纳信息:单查代理企业社保缴纳信息:查询代理企业社保缴纳信息:修改代理企业社保缴纳信息:企业缴纳各项费用汇总表:代理企业各项费用(月)汇总表(生成):企业注册:上传头像:上传工伤:";