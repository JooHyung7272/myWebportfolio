// import modules
var express = require('express');
var app = express();
var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');


// 라우트로 분리시켜주기

// 게시판
var boardRouter = require('./routes/board');
var userRouter = require('./routes/users');
app.use('/board', boardRouter);
app.use('/user', userRouter);
// connect mysql database


// model setting

// view setting
app.set("view engine", 'ejs');

//set middlewares
app.use(morgan('short'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:false}));

// set routes

// start server
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("Server On!");
});
// module.exports = app;
