const { ErrorModel } = require('../model/resModel')

module.exports = (res,req,next) => {
    if(req.session.username){
        next()
        return
    }
    res.json(
        new ErrorModel('no login')
    )
}