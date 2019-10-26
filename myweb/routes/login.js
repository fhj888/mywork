var express = require('express');
var router = express.Router();
var vipdb = require('../db/vipdb');

router.get('/',function(req,res,next){
    res.render("login",{"errmsg":""});
});


module.exports = router;

