var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/list', function(req, res, next) {
  res.json({
    result: 'OK',
    data: 1
  }
    
  )
});

module.exports = router;
