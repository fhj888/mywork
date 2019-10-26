var express = require('express');
let bcrypt = require("bcrypt");
var router = express.Router();
var vipdb = require("../db/vipdb");
//登录的验证
router.post('/', function(req, res, next) {
     //1、接收用户的数据
    let username =  req.body.username;
    let userpass =  req.body.userpass;
   
    //2、连接数据库，进行验证
    vipdb.queryVip(
        {
            username:username
        },
        function(data){
            //3、响应
            if(data.length==0){
                res.render("login",{"errmsg":"用户名或者密码错误！"});
            }else{
                let pass =  data[0].userpass;
                let isMatch = bcrypt.compareSync(userpass,pass);
                if(isMatch==false){
                    res.render("login",{"errmsg":"用户名或者密码错误！"});
                }else{
                    //保存cookie
                    res.redirect("index.html");
                }
            }
        },function(){
            //3、响应
            res.render("login",{"errmsg":"服务器出错了"});
        }
    );
});

module.exports = router;


//----------------未加密的做法-------------------//

// var express = require('express');
// var router = express.Router();
// var vipdb = require("../db/vipdb");
// //登录的验证
// router.post('/', function(req, res, next) {
//      //1、接收用户的数据
//     let username =  req.body.username;
//     let userpass =  req.body.userpass;
   
//     //2、连接数据库，进行验证
//     vipdb.queryVip(
//         {
//             username:username,
//             userpass:userpass
//         },
//         function(data){
//             //3、响应
//             if(data.length==0){
//                 res.render("login",{"errmsg":"用户名或者密码错误！"});
//             }else{
//                 //保存cookie
//                 res.redirect("index.html");
//             }
//         },function(){
//             //3、响应
//             res.render("login",{"errmsg":"服务器出错了"});
//         }
//     );
// });

// module.exports = router;
