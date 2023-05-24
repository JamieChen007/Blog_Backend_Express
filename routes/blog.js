var express = require('express');
var router = express.Router();
const { getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const loginCheck = require('../middleware/loginCheck')

/* GET home page. */
router.get('/list', (req, res, next) => {
  var author = req.query.author || ''
  const keyword = req.query.keyword || ''

  if (req.query.isadmin) {
    console.log('is admin')

    if (req.session.username == null) {
      console.error('is admin,but no login')
      res.json(
        new ErrorModel('no login')
      )
      return
    }
    author = req.session.username
  }

  const result = getList(author, keyword)
  return result.then(listData => {
    res.json(new SuccessModel(listData))
  })

  // res.json({
  //   result: 'OK',
  //   data: 1
  // }

  // )
});

router.get('/detail', (req, res, next) => {

  const id = req.query.id || ''
  const result = getDetail(id)
  return result.then(detailData => {
    res.json(
      new SuccessModel(detailData)
    )
  })
})

router.get('/search', (req, res, next) => {
  let { isadmin = "", author = "", keyword = "" } = req.query;
  if (isadmin) {
    author = req.session.username;
  }

  const result = getList(author, keyword);
  return result
    .then((data) => {
      res.json(
        new SuccessModel(data, "list blog success")
      )
    })
    .catch((error) => {
      res.json(
        new ErrorModel("list blog fail:" + error)
      )
    });
})

router.post('/create', loginCheck, (req, res, next) => {

  req.body.author = req.session.username
  const result = newBlog(req.body)

  return result.then(newBlog => {
    res.json(
      new SuccessModel(newBlog)
    )
  })
})

router.post('/update', loginCheck, (req, res, next) => {

  const id = req.query.id || ''
  const result = updateBlog(id, req.body)

  return result.then(val => {
    if (val) {
      res.json(
        new SuccessModel()
      )
    } else {
      res.json(
        new ErrorModel('update blog fail')
      )

    }
  })
})

router.post('/delete', loginCheck, (req, res, next) => {

  const id = req.query.id || ''
  const author = req.session.username
  const result = delBlog(id, author)

  return result.then(val => {
    if (val) {
      res.json(
        new SuccessModel()
      )
    } else {
      res.json(
        new ErrorModel('delete blog fail')
      )
    }
  })
})

module.exports = router;
