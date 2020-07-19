let n = 0;
let m = 0;

module.exports.handleReqEhsas = (req, res, next) => {
    let data = req.body;

    res.json({
        response: "این سرویس " + ++n + " بار استفاده شده است" + " متن شما : " + data.input
    });
}

module.exports.handleReqKholase = (req, res, next) => {
    let data = req.body;

    res.json({
        response: "این سرویس " + ++m + " بار استفاده شده است" + " متن شما : " + data.input
    });
}