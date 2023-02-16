const express = require('express');
//const path = require('path');
const router = express.Router();


router.get('/',(req,res)=>{
    if(req.originalUrl==='/board'){res.redirect('board/list');}
    else if(req.originalUrl==='/board/'){res.redirect(`${req.originalUrl}list`);}
});

router.get('/list',(req,res)=>{
    res.render('list', {title:'게시판 목록'});
});

router.get('/write',(req,res)=>{
    res.render('write', {title:'게시판 새 글쓰기'});
});

router.get('/view',(req,res)=>{
    res.render('view', {title:'게시판 본문 보기'});
});
module.exports = router;
