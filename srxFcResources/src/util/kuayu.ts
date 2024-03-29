function kuayu(app) {

    app.all('*', (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.header('Access-Control-Allow-Methods', '*');
        res.header("X-Powered-By", ' 3.2.1')
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Content-Type", "application/json;charset=utf-8");

        next();
    });
}

export default kuayu;