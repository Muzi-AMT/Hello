import {Request, Response} from "express"
import {Router} from "express"
import {get} from '../../util/Cache'

let retrnyam = Router();
/**
 * 发送验证码
 */
let yzm="";
retrnyam.get("/", async (req, res) => {

    let sjm = req.query.uuid;//16位随机码   是  key
    req.setHeader('Content-Type', 'image/svg+xml');//响应消息头设置为图片格式
    let a=get(sjm);
    //response.send(a.img); //默认文本类内容  加上上边代码就会变为图片
    res.json({state:100});

});

export default retrnyam;