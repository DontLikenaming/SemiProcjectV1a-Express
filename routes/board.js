const express = require('express');
const Board = require('../models/Board');
const {raw} = require("express");
//const path = require('path');
const router = express.Router();


router.get('/',(req,res)=>{
    if(req.originalUrl==='/board'){res.redirect('board/list');}
    else if(req.originalUrl==='/board/'){res.redirect(`${req.originalUrl}list`);}
});

router.get('/list',async (req,res)=>{
    let bds = new Board().select().then((bds) =>  bds);
    //console.log(await bds);
    res.render('board/list', {title:'게시판 목록', bds: await bds});
});

router.get('/write',(req,res)=>{
    res.render('board/write', {title:'게시판 새 글쓰기'});
});

router.post('/write',async (req,res)=>{
    let viewName = '/board/failWrite';
    let {title, userid, contents} = req.body;
    //console.log(title, userid, contents);

    let rowcnt = new Board(null, title, userid, contents, null, null).insert()
        .then((result)=>result);
    if(await rowcnt > 0) viewName = '/board/list';

    res.redirect(303,viewName);
});

router.get('/view',async (req,res)=>{
    let bno = req.query.bno;
    let bds = new Board().selectOne(bno).then(async bds => {return bds;});
    res.render('board/view', {title:'게시판 본문 보기', bds : await bds});
});
module.exports = router;
