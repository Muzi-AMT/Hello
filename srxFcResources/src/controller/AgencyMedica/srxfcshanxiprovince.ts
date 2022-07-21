// 山西省参加社会保险人员增减申报表
import * as express from "express";
const Router = express.Router();
import {selPensionReduction} from "../../service/report";
import stat from "../../util/state";
import {getpermiss, postpermiss} from "../../util/permission";

export default Router;

// 分页查询养老
Router.post("/selfyyl", async (req,res)=>{
    let per = await postpermiss("selfyyl",req);
    if(per.state==77){
        let werretrieve = req.body.werretrieve;
        let pageIndex = req.body.pageIndex;
        let pageSize = req.body.pageSize;
        let bbtime = req.body.bbtime;
        if(werretrieve&&pageSize&&pageIndex&&bbtime){
            let dson =await  selPensionReduction(werretrieve,bbtime,pageIndex,pageSize);
            // @ts-ignore
            dson.zhb = per.state
            res.json(dson);
        }else{
            //非空判断返回空值5
            res.json(stat.nullvalue);
        }
    }else {
        res.json(per);
    }




});
Router.permissiom="selfyyl:";
Router.des = "分页查询养老:";