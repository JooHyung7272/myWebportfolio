var express = require('express');
var router = express.Router();
var mysql_odbc = require('../db/db_conn')();
var conn = mysql_odbc.init();
var fs = require('fs');
var ejs = require('ejs');
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended:false}));

router.get('/page', function(req, res, next){
  res.redirect('/board/page/1');
});

// 게시글 리스트
router.get('/page/:page',function(req,res,next)
{
    var page = req.params.page;
    var sql = "select idx, name, title, date_format(modidate,'%Y-%m-%d %H:%i:%s') modidate, " +
        "date_format(regdate,'%Y-%m-%d %H:%i:%s') regdate,hit from board";
    conn.query(sql, function (err, rows) {
        if (err) console.error("err : " + err);
        res.render('page', {title: ' 게시판 리스트', rows: rows, page:page, length:rows.length-1, page_num:10, pass:true});
        console.log(rows.length-1);
    });
});

// 글쓰기
router.get('/write', function(req,res,next){
    res.render('write',{title : "게시판 글 쓰기"});
});

// 글쓰기 DB에 입력
router.post('/write', function(req,res,next){
    var name = req.body.name;
    var title = req.body.title;
    var content = req.body.content;
    var passwd = req.body.passwd;
    var datas = [name,title,content,passwd];


    var sql = "insert into board(name, title, content, regdate, modidate, passwd,hit) values(?,?,?,now(),now(),?,0)";
    conn.query(sql,datas, function (err, rows) {
        if (err) console.error("err : " + err);
        res.redirect('/board/page');
    });
});

// 글 조회
router.get('/read/:idx',function(req,res,next)
{
    var idx = req.params.idx;
    var sql = "select idx, name, title, content, date_format(modidate,'%Y-%m-%d %H:%i:%s') modidate, " +
        "date_format(regdate,'%Y-%m-%d %H:%i:%s') regdate,hit from board where idx=?";
    conn.query(sql,[idx], function(err,row)
    {
        if(err) console.error(err);
        res.render('read', {title:"글 상세", row:row[0]});
    });
});


// 글 수정
router.get('/update/:idx',function(req,res,next)
{
    var idx = req.params.idx;
    var sql = "select idx, name, title, content, date_format(modidate,'%Y-%m-%d %H:%i:%s') modidate, " +
        "date_format(regdate,'%Y-%m-%d %H:%i:%s') regdate,hit from board where idx=?";
    conn.query(sql,[idx], function(err,row)
    {
        if(err) console.error(err);
        res.render('update', {title:"글 수정", row:row[0]});
    });
});

router.post('/update',function(req,res,next)
{
    var idx = req.body.idx;
    var name = req.body.name;
    var title = req.body.title;
    var content = req.body.content;
    var passwd = req.body.passwd;
    var datas = [name,title,content,idx,passwd];

    var sql = "update board set name=? , title=?,content=?, modidate=now() where idx=? and passwd=?";
    conn.query(sql,datas, function(err,result)
    {
        if(err) console.error(err);
        if(result.affectedRows == 0)
        {
            res.send("<script>alert('패스워드가 일치하지 않습니다.');history.back();</script>");
        }
        else
        {
            res.redirect('/board/read/'+idx);
        }
    });
});

// 글 삭제
router.get('/delete/:idx',function(req,res,next)
{
    var idx = req.params.idx;
    var sql = "select idx, name, title, content, date_format(modidate,'%Y-%m-%d %H:%i:%s') modidate, " +
        "date_format(regdate,'%Y-%m-%d %H:%i:%s') regdate,hit from board where idx=?";
    conn.query(sql,[idx], function(err,row)
    {
        if(err) console.error(err);
        res.render('delete', {title:"글 삭제", row:row[0]});
    });
});
router.post('/delete',function(req,res,next)
{
    var idx = req.body.idx;
    var passwd = req.body.passwd;
    var datas = [idx,passwd];

    var sql = "delete from board where idx=? and passwd=?";
    conn.query(sql,datas, function(err,result)
    {
        if(err) console.error(err);
        if(result.affectedRows == 0)
        {
            res.send("<script>alert('패스워드가 일치하지 않습니다.');history.back();</script>");
        }
        else
        {
            res.redirect('/board/page/');
        }
    });
});

module.exports = router;
