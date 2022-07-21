


import * as svgCaptcha from 'svg-captcha'

export function create_yzm() {
    const conf = {
        size: 4,// 验证码长度
        ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        noise: 1, // 干扰线条的数量
        height: 70,
        width: 200,
        color: false,
        background: '#ffffff'
        // background:"409eff"
    }
    let captcha = svgCaptcha.create(conf);
    return {yzm: captcha.text.toLowerCase(), img: captcha.data}
}
