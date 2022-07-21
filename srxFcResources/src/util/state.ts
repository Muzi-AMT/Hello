const stat={
    //数据
    data:[],
    //失败 0
    defeated:0,
    //成功 1
    succeed:1,
    //重复 2
    repetition:2,
    //权限 3
    jurisdiction:3,
    //值类型错 4
    typemistake:4,
    //空值 5
    nullvalue:5,
    //判断里添加成功
    pdsucceed:6,
    //判断里添加失败
    pddefeated:7,
    //验证码错误
    yzmerror:8,
    //会话过期
    hhgq:9,
    //会话更新
    hhgx:15,
    //redis查询出错
    redselerr:10,
    //日期重复
    dat:11,
    //有权访问
    yesper:77,
    //移步登录
    nolog:78,
    //无权访问
    noper:79,
    //新用户登录
    newus:66,
    //已经登录的用户
    logus:63,
    // 添加员工，换公司添加，员工在之前公司在职
    ygsz:12,
    // 添加员工，换公司添加，员工在之前公司离职
    yglz:13,
    // 这个公司不在此地区
    mygs:14

};

export default stat