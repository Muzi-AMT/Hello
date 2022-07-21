//代理数据查询
import * as express from "express";
const Router = express.Router();
export default Router;
import { employeeregistrationform } from '../../entity/employeeregistrationform';
import {querycondition, singlequery, werfullcheck} from '../../service/Generalpagingfullcheck';
import {approvalform} from "../../entity/approvalform";
import stat from "../../util/state";
import {getpermiss} from "../../util/permission";

Router.get("/cprq",async(req,res)=>{
    let per = await getpermiss("cprq",req);
    if(per.state==77){
        //检索查询
        let werretrieve = req.query.werretrieve;

        if(werretrieve){
            let emp = await querycondition(employeeregistrationform,werretrieve);
            // @ts-ignore
            emp.zhb = per.state
            res.json(emp);
        }else{
            res.json({state:stat.nullvalue});
        }
    }else {
        res.json(per);
    }



});


Router.permissiom="cprq:";
Router.des = "代理数据查询:";