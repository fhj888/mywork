var express = require('express');
var http = require('http');
var querystring = require('querystring');
// var Buffer = require('buffer');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, myRes, next) {
    //1、接收前端的数据
    // req.body.goodsid;

    //2、让apiserver进行保存
    const postData = querystring.stringify({
        'goodsid':req.body.goodsid,
        'goodsname':req.body.goodsname,
        'goodsprice':req.body.goodsprice
      });
      console.log("得到的数据："+postData);
      
    //   http://localhost:3000/POST/goods
      const options = {
        hostname: '',
        port: 3000,
        path: '/POST/goods',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
          }
        };
      
      const myReq = http.request(options, (res) => {
        let str = "";
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
        //   console.log(`响应主体: ${chunk}`);
            str+=chunk;
        });
        res.on('end', () => {
            //   console.log('响应中已无数据');
            let obj = JSON.parse(str);
            if(obj.state=="success"){
                myRes.redirect('/goodslist');
            }else if(obj.state=="fail"){
                myRes.send('添加失败，请重新<a href="/addGoods.html">添加</a>');
            }
        });
      });
      
      myReq.on('error', (e) => {
        console.error(`请求遇到问题: ${e.message}`);
      });
      
      // 将数据写入请求主体。
      myReq.write(postData);
      myReq.end();
});

module.exports = router;
