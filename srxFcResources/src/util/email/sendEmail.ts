 import * as nmail from "nodemailer"
// import {log} from "../log4j"
 var  em=nmail.createTransport({
	 host:"smtp.163.com", //服务器邮箱
	 service:"163",  //163服务必须写  不然发送不成功
	 secureConnection: true, //使用ssl加密  更安全安全
	 auth:{
	 	   user:"Z17535302957@163.com",
	       pass:"AICPYEMEQRPPZGQX" 
	      }
 });

export  function sendEmail(a){

	const conf={
		from:'Z17535302957@163.com',//发送方 邮件来源
		to:a.receive,  //邮件接收方
		subject:a.sub,  //邮件主题
		html:a.html,  //邮件内容（网页）
		text:a.text, //邮件内容（文本）
		attachments:a.fj ,//邮件附件
		bcc:'z17535302957@163.com',  //抄送自己一份，防止554错误
		port: 465
	};
	return new Promise(function(resolve,reject){

		em.sendMail(conf,function(error,info){
			if(error){
				reject(error);
			}else{
				resolve(info);
			}
		})

	})

}
