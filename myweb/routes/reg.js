var express = require('express');
var router = express.Router();

/* GET home page. */
//get请求
router.get('/', function(req, res, next) {
  res.render('register', { msg:"亲，请认真填写"});

});

module.exports = router;
