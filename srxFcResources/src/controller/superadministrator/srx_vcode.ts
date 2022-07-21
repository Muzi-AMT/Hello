import {Request, Response} from "express"
import {Router} from "express"
import {create_yzm} from '../../util'
import {set} from '../../util/Cache'

let srx_vcode = Router();
/**
 * 存入验证码
 */
let yzm = "";
srx_vcode.get("/", async (request: Request, response: Response) => {
    let sjm = request.query.uuid;//16位随机码   是  key
    //创建了验证码
     response.setHeader('Content-Type', 'image/svg+xml');//响应消息头设置为图片格式

    if (sjm != null) {
        let yzm = create_yzm();
        let yzma = set(sjm,yzm.yzm);
        response.send(yzm.img); //默认文本类内容  加上上边代码就会变为图片
    }

});

export default srx_vcode;