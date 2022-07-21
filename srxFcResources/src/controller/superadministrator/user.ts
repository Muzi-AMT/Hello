// 用户
import * as express from "express"
import {
    receive_code_yz, srx_email_gs, srxfcsuperregisterq,
} from "../../service/Clientsel";
import stat from "../../util/state";
import {get, set} from "../../util/Cache";
import {getConnection} from "typeorm";
import {administrator} from "../../entity/administrator";

const Router = express.Router();
export default Router;
const queryRunner = getConnection().createQueryRunner();
//对已发到邮箱的验证码进行验证，便于激活后续操作
Router.get("/yxyz",async(req,res)=>{
    let administratorMail= req.query.administratorMail;
    let administratorName= req.query.administratorName;
    let yzm = req.query.yzm;//发到邮箱中的验证码  6位 value
    let sjm = req.query.uuid;//16位随机码   是  key

    if(administratorMail&&administratorName&&yzm&&sjm){
        let dson = await receive_code_yz(administratorMail,administratorName,yzm,sjm);
        res.json(dson);
    }else{
        //非空判断返回空值
        res.json(stat.nullvalue);
    }


});

// 邮箱验证之发送邮件
Router.get("/yxyzyj",async(req,res)=>{

    let sj_code = req.query.uuid;   //16位key 客户端提交
    let cli_email = req.query.email_gs; //邮箱
    if(sj_code&&cli_email){
        let dson = await srx_email_gs(sj_code,cli_email);
        res.json(dson);
    }else{
        //非空判断返回空值
        res.json(stat.nullvalue);
    }


});


//管理员登录

Router.get("/glydl",async(req,res)=>{

    let user=req.query.user;
    let uuid=req.query.uuid;
    let password = req.query.password;
    let mk = req.query.mk;
    let qx = req.query.qx;
    let jksz = [];
    if(user&&uuid&&password){
        const loginmessage = await getConnection()
            .getRepository(administrator)
            .createQueryBuilder()
            .where({userName:user,userPwd:password})
            .getOne();
        if(loginmessage){
            if(loginmessage.userPermission.indexOf(mk)>=0 && loginmessage.userModule.indexOf(qx)>=0){
                // @ts-ignore
                if(loginmessage.userPermission[0]!=0){
                    for (let i = 0; i < loginmessage.userArray.length; i++){
                        let qx = await queryRunner.query("select interfaceName from interfacetable where interfaceId = " + loginmessage.userArray[i]);
                        jksz.push(qx[0].interfaceName);
                    }

                    let session=await get(user+"_"+uuid);
                    if(session){
                        res.json({state: stat.logus});
                    }else{
                        //未登录
                        await set(user+"_"+uuid,Math.floor(Math.random()*100000),600);
                        if(await get(user+"_permission") == null){
                            let jk = jksz.toString().replace(/,/g,":");
                            await set(user+"_permission",jk,864000);
                            res.json({state:stat.newus})
                        }else{
                            //新用户
                            res.json({state:stat.newus})
                        }
                    }
                } else{
                    res.json({state:stat.defeated})
                }
            }else{
                //无权访问
                res.json ({state: stat.noper})
            }
        } else{
            res.json({state:stat.defeated})
        }
    }else{
        //非空判断返回空值
        return {state:stat.nullvalue};
    }




});