var express = require('express');
var router = express.Router();
var goodsdb = require("../db/goodsdb");

router.get(/^\//,function(req,res,next){
    console.log("get");
    console.log(req.url);
    let obj = {};
    if(req.url!=='/'){
        obj.goodsid = req.url.substring(1);
    }
    console.log(obj);
    goodsdb.querygoods(obj,function(data){
        res.json(
            {
                "state":"success",
                "data":data
            }
        );
    },function(){
        res.json({
                "state":"fail"
            })
    });
});


router.post('/',function(req,res,next){
    console.log("00000000000");

    goodsdb.addgoods({
        "goodsid":req.body.goodsid,
        "goodsname":req.body.goodsname,
        "goodsprice":req.body.goodsprice
    },function(str){
        res.json({
            state:str
        })
    });
});

module.exports = router;