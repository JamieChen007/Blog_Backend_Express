var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

const { userlogin } = require('../controller/user')
const { SuccessModel,ErrorModel } = require('../model/resModel')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

/* GET home page. */
router.post('/login', urlencodedParser, function(req, res, next) {
    const { username,password } = req.body

    const result = userlogin(username,password)
       
    return result.then(data => {
        if(data.username){
            req.session.username=data.username
            req.session.realname=data.realname
            
            return res.json(
              new SuccessModel()
            ) 
            
        }                   
        return res.json(
          new ErrorModel('userlogin fail')
        )  
    // res.json({
    // result: 'OK',
    // data: {
    //     username,
    //     password
    // }
  }
    
  )
});

router.get('/session-test', (req,res,next)=>{
  const session = req.session
  if(session.viewNum == null) {
    session.viewNum = 0
  }
  session.viewNum++

  res.json({
    viewNum: session.viewNum
  })

})

router.get('/login-test', (req,res,next)=>{
  //console.log(req.session.username)
  if(req.session.username) {
    res.json({
      errno: 0,
      msg: 'already login'
    })
    return
  }
  res.json({
    errno: -1,
    msg: 'no login'
  })


})

module.exports = router;
