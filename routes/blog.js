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

router.get('/detail',function(req, res, next) {
  
  const id = req.query.id || '' 
  const result = getDetail(id)
    return result.then(detailData=>{
      res.json(
        new SuccessModel(detailData)
        )
    })
})

router.get('/search',function(req, res, next) {
    let { isadmin = "", author = "", keyword = "" } = req.query;
    if (isadmin) {
      author = req.session.username;
    }
    const result = getList(author, keyword);
    return result
      .then((data) => {
        res.json(
          new SuccessModel(data, "查询博客列表成功")
          )
      })
      .catch((error) => {
        res.json(
          new ErrorModel("查询博客列表失败：" + error)
          )
      });
})

router.post('/create', (req,res,next) => {
      // const loginCheckResult = loginCheck(req)
      // if(loginCheckResult){
      //     return loginCheckResult
      // }

      req.body.author = req.session.username
      const result = newBlog(req.body)

      return result.then(newBlog=>{
          res.json(
            new SuccessModel(newBlog)
          ) 
      })
})

router.post('/update', (req,res,next) => {
      // const loginCheckResult = loginCheck(req)
      // if(loginCheckResult){
      //     return loginCheckResult
      // }
      const id = req.query.id || '' 
      const result = updateBlog(id, req.body)

      return result.then(val => {
          if(val){
            res.json(
              new SuccessModel()
            ) 
          }else{
            res.json(
              new ErrorModel('update blog fail')
            )
              
          }
      })
})

router.post('/delete', (req,res,next) => {
      // const loginCheckResult = loginCheck(req)
      // if(loginCheckResult){
      //     return loginCheckResult
      // }
      const id = req.query.id || '' 
      const author=req.session.username
      const result = delBlog(id,author)

      return result.then(val => {
          if(val){
              res.json(
                new SuccessModel()
              ) 
          }else{
            res.json(
              new ErrorModel('delete blog fail')
              )
          }
      })
})

module.exports = router;
