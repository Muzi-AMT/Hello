"use strict";
// import {set}
// exports.getCode = (req, res) => {
//     var codeConfig = {
//         size: 5,// 验证码长度
//         ignoreChars: '0o1i', // 验证码字符中排除 0o1i
//         noise: 2, // 干扰线条的数量
//         height: 44 
//     }
//     var captcha = svgCaptcha.create(codeConfig);
//   //  req.session.captcha = captcha.text.toLowerCase(); //存session用于验证接口获取文字码
//    set(req.body.uuid, captcha.text.toLowerCase());
// 	var codeData = {
//         img:captcha.data
//     }
// res.send(codeData);
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_yzm = void 0;
const svgCaptcha = require("svg-captcha");
function create_yzm() {
    const conf = {
        size: 5,
        ignoreChars: '0o1i',
        noise: 5,
        height: 70,
        width: 200,
        color: true,
        background: "409eff"
    };
    let captcha = svgCaptcha.create(conf);
    return { yzm: captcha.text.toLowerCase(), img: captcha.data };
}
exports.create_yzm = create_yzm;
//# sourceMappingURL=index.js.map