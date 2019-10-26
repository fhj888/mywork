var express = require('express');
var router = express.Router();
var vipdb = require("../db/vipdb");

router.post('/', function(req, res, next) {
    //1、接收前端数据（）
    let username = req.body.username;
    let userpass = req.body.userpass;
    
    //2、连接数据库，进行注册（mongodb）注册也要查询
    vipdb.queryVip(
        {
            username:username
        },
        (data)=>{
            if(data.length>0){
                res.render("register",{"msg":"该用户名已经存在"});
            }else{
                //插入数据
                vipdb.addVip(
                    {
                        username:username,
                        userpass:userpass
                    },
                    function(result){
                        if(result==1){
                            //3、响应
                            res.redirect("login");
                        }else{
                            res.render('register',{"msg":"注册失败！"});
                        }
                    }
                );
            }
        },
        ()=>{
            //数据库失败
            res.render("register",{"msg":"该用户名已经存在"});
        }
    )   
});

module.exports = router;
