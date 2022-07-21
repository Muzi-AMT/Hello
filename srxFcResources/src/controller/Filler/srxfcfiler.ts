//客户端基本信息  修改密码  登录 注册

import * as express from "express";

const Router = express.Router();
export default Router;
import {addData} from "../../service/Addcentl";
import {filler} from "../../entity/filler";
import stat from "../../util/state";
import {chegpwd} from "../../service/Changepwd";
import {getpermiss} from "../../util/permission";

//添加填表人
Router.get('/addfiler', async (req, res) => {
        let per = await getpermiss("addfiler", req);
        if (per.state == 77) {
            let retrieve = req.query.retrieve;
            let werretrieve = req.query.werretrieve;
            if (retrieve && werretrieve) {
                let dson = await addData(filler, retrieve, werretrieve);
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

//修改填表人
Router.get('/udpfiler', async (req, res) => {

    let per = await getpermiss("udpfiler", req);
    if (per.state == 77) {
        //新名字
        let retrieve = req.query.retrieve;
        //旧名称和类型
        let werretrieve = req.query.werretrieve;
        if (retrieve && werretrieve) {
            let dson = await chegpwd(filler, retrieve, werretrieve);
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


Router.permissiom = "addfiler:udpfiler:";

Router.des = "添加填表人:修改填表人:";