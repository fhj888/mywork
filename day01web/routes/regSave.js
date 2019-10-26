var express = require('express');
let bcrypt = require("bcrypt");
var router = express.Router();

var vipdb = require("../db/vipdb");


router.post('/', function(req, res, next) {
    //1、接收前端数据（）
    let username = req.body.username;
    let userpass = req.body.userpass;

    ///加密 userpass;
    //salt的迭代次数
    let salCount = 10;

    //生产salt
    let salt = bcrypt.genSaltSync(salCount);
  
    //加密
    let hash = bcrypt.hashSync(userpass,salt);
  
    //2、连接数据库，进行注册（mongodb）
    //1)、查询数据库中有没有
    vipdb.queryVip(
        {
            username:username
        },
        (data)=>{
            if(data.length>0){
                //2)、如果有，告知前端
                res.render("register",{"msg":"该用户名已经存在"});
            }else{
                //3）、如果没有，就插入数据
                vipdb.addVip(
                    {
                        username:username,
                        userpass:hash
                    },
                    function(result){
                        if(result==1){
                            //3、响应
                            res.redirect("login");//跳转到登录页面，重新请求一个路径，或者说改变了一下地址栏的地址
                        }else{
                            res.render('register',{"msg":"注册失败！"});
                        }
                    }
                ); 
            }
        },
        ()=>{
            //数据库失败
            res.render("register",{"msg":"服务器出错"});
        }
    );
    
     
});

module.exports = router;
