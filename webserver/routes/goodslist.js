var express = require('express');
var http = require('http');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //   res.render('index', { title: 'Express' });
    // 发送请求
   
    http.get("http://localhost:3000/GET/goods",function(response){
        let str='';
        response.on('data',function(data){
            str+=data;
        });
        
        //response对象的事件end，
        response.on('end',function(){
            let obj = JSON.parse(str);
            //把拿到的数据渲染到模板里
            res.render('goodslist',{
                goodslist:obj.data
            });
        });
        //response对象的事件error，出现错误时，会捕获。
        response.on('error',function(error){		console.log(error);	});
    });

});

module.exports = router;
