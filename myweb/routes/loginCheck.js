var express = require('express');
var router = express.Router();
var vipdb = require("../db/vipdb");

//登录的验证
router.post('/',function(req,res,next){
    //1、接收用户的数据
    let username = req.body.username;
    let userpass = req.body.userpass;

    //2、连接数据库、进行验证
    // vipdb.queryVip({obj},function(成功){},function(失败){})

    vipdb.queryVip(
        {
            username:username,
            userpass:userpass
        },
        function(data){
            //响应
            if(data.length==0){
                res.render("login",{"errmsg":"用户名或者密码错误"});
            }else{
                //保存cookie
                res.redirect("index.html");
                
            }
        },function(){
            res.render("login",{"errmsg":"服务器出错"});
        }
    );
});

module.exports = router;