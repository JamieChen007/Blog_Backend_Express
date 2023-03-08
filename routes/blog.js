var express = require('express');
var router = express.Router();
const { getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
  } = require('../controller/blog')
const { SuccessModel,ErrorModel } = require('../model/resModel')

/* GET home page. */
router.get('/list', function(req, res, next) {
  const author = req.query.author || ''
  const keyword = req.query.keyword || ''
  // const listData = getList(author,keyword)
  // return new SuccessModel(listData)

  if(req.query.isadmin){
    if(req.session.username == null){
      res.json(
        new ErrorModel('no login')
      )
      return
  }
    author = req.session.username
  }

  const result = getList(author,keyword)
  return result.then(listData=>{
      res.json(new SuccessModel(listData))
  })
  
  // res.json({
  //   result: 'OK',
  //   data: 1
  // }
    
  // )
});

module.exports = router;
