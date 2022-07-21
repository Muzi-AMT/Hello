//报表分页查询  （通用）
import * as express from "express"
import {
    fullcheck, fullcheckee,
    selsp,
    selwsp,
    singlequery,
    werfullcheck,
    wermhfullonepagee
} from "../../service/Generalpagingfullcheck";
import {approvalform} from "../../entity/approvalform";
import stat from "../../util/state";
import {getpermiss} from "../../util/permission";
import {autogeneration, Socialadd} from "../../service/retiredworkers";
import {selappval} from "../../service/Staffinfo";
import {seltimeemp} from "../../service/Clientsel";
import {ylbxsbb} from "../../service/report";

const Router = express.Router();
export default Router;

////审核表 通用 分页
// 使用业务层的通用分页全查
Router.get("/rep", async (req, res) => {
    let per = await getpermiss("rep", req);

    if (per.state == 77) {
//设置每页数据量
        let pageSize = req.query.pageSize;
        //获取当前页数
        const pageIndex = req.query.pageIndex;
        let retrieve = req.query.retrieve;

        let retrieveAll  = JSON.parse(retrieve);

        if (pageIndex && pageSize && retrieve) {

            try {

             fullcheckee(approvalform, retrieve, pageSize, pageIndex).then((dson)=>{


                 if(dson){
                     // @ts-ignore
                     dson.zhb = per.state;
                     // console.log("kasnakaa:");

                     res.json(dson);

                 }else{

                     res.json({state: stat.nullvalue});
                 }

             })







            }catch (e) {

                     res.json({state: stat.nullvalue});
            }





        } else {
            res.json({state: stat.nullvalue});
        }




    } else {

        res.json(per);
    }


});

////审核表 通用 分页2
// 使用业务层的通用分页全查2
Router.get("/reps", async (req, res) => {

    let per = await getpermiss("reps", req);
    if (per.state == 77) {
        //设置每页数据量
        let pageSize = req.query.pageSize;
        //获取当前页数
        const pageIndex = req.query.pageIndex;

        if (pageIndex && pageSize) {
            let dson = await selwsp(pageSize, pageIndex);
            // @ts-ignore
            dson.zhb = per.state
            res.json(dson);
        } else {
            res.json({state: stat.nullvalue});
        }
    } else {
        res.json(per);
    }


});

////审核表 通用 分页
// 使用业务层的通用带条件分页全查
Router.get("/werapp", async (req, res) => {

    let per = await getpermiss("werapp", req);
    if (per.state == 77) {
        let werretrieve = req.query.werretrieve;

        if (werretrieve) {
            let dson = await singlequery(werretrieve);
            // @ts-ignore
            dson.zhb = per.state
            res.json(dson);
        } else {
            res.json({state: stat.nullvalue});
        }
    } else {
        res.json(per);
    }

});

// 模糊查询公司
Router.get("/selgsmc", async (req, res) => {

    // 获取前端传入的页数总数
    let pageIndex = req.query.pageIndex;
    let pageSize = req.query.pageSize;
    // 获取where条件参数
    let werretrieve = req.query.werretrieve;
    //获取单个条件企业名称条件
    let werpara = req.query.werpara;
    if (werretrieve && pageSize && pageIndex && werpara) {
        let dson = await wermhfullonepagee(approvalform, pageSize, pageIndex, werpara, werretrieve);
        res.json(dson);
    } else {
        //非空判断返回空值
        res.json({state: stat.nullvalue});
    }


});

//自动添加下个月的社保费用和补差
Router.get("/autosoci", async (req, res) => {
    let per = await getpermiss("autosoci", req);
    if (per.state == 77) {
        //公司和上月
        let corporateInformationTradeName = req.query.corporateInformationTradeName;
        //本月
        let socialsecurityexpenseDate = req.query.socialsecurityexpenseDate;
        if (socialsecurityexpenseDate && corporateInformationTradeName) {
            let dson = await autogeneration(corporateInformationTradeName, socialsecurityexpenseDate);
            // @ts-ignore
            dson.zhb = per.state
            res.json(dson);
        } else {
            //非空判断返回空值1
            res.json({state: stat.nullvalue});
        }
    } else {
        res.json(per);
    }
});

// 根据公司名称查询公司
Router.get("/selappval", async (req, res) => {
    let werretrieve = req.query.werretrieve;
    let selgsmc = await selappval(werretrieve);
    if (selgsmc) {
        // 查询成功
        res.json(selgsmc);
    } else {
        // 查询失败
        res.json({state: stat.defeated});
    }
})

// 根据时间段和公司查询本公司的员工
Router.get("/seltimeemp", async (req, res) => {
    let per = await getpermiss("seltimeemp", req);
    if (per.state == 77) {
        // company,beforetime,aftertime
        let company = req.query.company;
        let beforetime = req.query.beforetime;
        let aftertime = req.query.aftertime;
        let lm = req.query.lm;
        let pageIndex = req.query.pageIndex;
        let pageSize = req.query.pageSize;

        if (company && beforetime && aftertime) {
            let dson = await seltimeemp(company, beforetime, aftertime, lm, pageIndex, pageSize);
            // @ts-ignore
            dson.zhb = per.state;
            res.json(dson);
        } else {
            res.json({state: stat.nullvalue});
        }
    } else {
        res.json(per);
    }
});
//社保明细添加
Router.get("/Socialadd", async (req, res) => {
    let retrieve = req.query.retrieve;
    if(retrieve){
        let selgsmc = await Socialadd(retrieve);
        if (selgsmc) {
            //修改成功 返回1
            return {state: stat.succeed}
        } else {
            //返回状态值0  修改失败
            return {state: stat.defeated}
        }
    }else {
        res.json({state: stat.nullvalue});
    }

})


Router.permissiom = "rep:reps:werapp:autosoci:selappval:seltimeemp:";

Router.des = "使用业务层的通用分页全查:使用业务层的通用分页全查2:使用业务层的通用带条件分页全查:自动添加下个月的社保费用和补差:根据公司名称查询公司:根据时间段和公司查询本公司的员工:";