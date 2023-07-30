const jwt = require('jsonwebtoken')
module.exports.verifyUser = (req, res, next) => {
    try {
        const token = req.header("authorization").split(" ")[1];
        const tokenDecrypted = jwt.verify(token, "QWERTY")
        console.log(tokenDecrypted)
        req.body.email= tokenDecrypted.email
        next()
    } catch (err) {
        res.send({ success: false, message: err.message })
    }
}