//nodeJS内置的模块
var path = require('path');

//第三方的模块
var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyparser = require("body-parser");



//自定义的模块
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var regSaveRouter = require('./routes/regSave');
var regRouter = require('./routes/reg');
var loginRouter = require('./routes/login');
var loginCheckRouter = require('./routes/loginCheck');


var app = express();

//一、模板引擎
// view engine setup
//设置模板的路径
app.set('views', path.join(__dirname, 'views'));
//设置模板的引擎
app.set('view engine', 'ejs');

//二、执行第三方的中间件
//第三方的中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyparser.json());

//express的内置中间件
//express.static函数，是express框架提供的唯一的一个中间件
//express.static() 函数，是指定静态资源路径（如：Html文件，js文件，css文件，jpg文件等等）
//__dirname:表示项目的路径
app.use(express.static(path.join(__dirname, 'public')));


//自定义的中间件(任何请求，都会执行中间件)，next()函数表示继续执行下一个中间件
// app.use(function(req,res,next){
//   console.log("hello");
//   next();
// });
//app.use() 函数可以处理请求，以下代码的意思是：当前端访问根路径时，找indexRouter模块
app.use('/', indexRouter);

// app.use('/users', usersRouter02);


//当前端请求路径：“/regSave”的时候，找模块
app.use('/regSave', regSaveRouter);

app.use('/reg', regRouter);//就到注册页面（模板）
app.use('/login',loginRouter);
app.use('/loginCheck',loginCheckRouter);

//路径找不的的处理 404的
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
