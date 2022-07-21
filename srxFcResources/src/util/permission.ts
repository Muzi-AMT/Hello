import {get, udp} from "./Cache";
import stat from "./state";


export async function getpermiss(jk,req) {

    let user=req.query.user;
    let uuid=req.query.uuid;
    if(user&&uuid){
        let session=await get(user+"_"+uuid);
        if(session){
            let permission=(await get(user+"_permission"))+"";

            let jkname = jk;
            if(permission&&(permission.indexOf(jkname)>=0)) {
                if (session) {

                    await udp(user + "_" + uuid, 600);
                    // res.json({state: "业务已办理"});
                    return {state:stat.yesper}

                } else {
                    // res.json({state: "请移步登录"});
                    return {state: stat.nolog}
                }
            }else{

                // res.json({state:"无权访问"});
                return {state: stat.noper}
            }
        }else{
            // res.json({state: "请移步登录"});
            return {state: stat.nolog}
        }

    }else {
        //非空判断返回空值
        return {state:stat.nullvalue};
    }


}


export async function postpermiss(jk,req) {

    let user=req.body.user;
    let uuid=req.body.uuid;
    if(user&&uuid){
        let session=await get(user+"_"+uuid);
        if(session){
            let permission=(await get(user+"_permission"))+"";
            let jkname = jk;

            if(permission&&(permission.indexOf(jkname)>=0)) {
                if (session) {

                    await udp(user + "_" + uuid, 600);
                    // res.json({state: "业务已办理"});
                    return {state:stat.yesper}

                } else {
                    // res.json({state: "请移步登录"});
                    return {state: stat.nolog}
                }
            }else{

                // res.json({state:"无权访问"});
                return {state: stat.noper}
            }
        }else{

            // res.json({state:"无权访问"});
            return {state: stat.noper}
        }

    }else {
        //非空判断返回空值
        return {state:stat.nullvalue};
    }

}