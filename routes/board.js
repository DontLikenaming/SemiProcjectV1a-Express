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
    if(req.session.userid){
        res.render('board/write', {title:'게시판 새 글쓰기'});
    }else {
        res.redirect(303,'/member/login');
    }
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
    res.render('board/view', {title:'게시글 본문 보기', bds : await bds});
});

router.post('/update',async (req,res)=>{
    let { title, userid, contents } = req.body;
    let bno = req.query.bno;
    let suid = req.session.userid;

    if (userid && suid && (userid === suid)) {
        new Board(bno, title, userid, contents, 0, 0)
            .update().then(cnt => cnt);
        res.redirect(303, `/board/view?bno=${bno}`);
    } else {
        res.redirect(303, '/board/list');
    }

});

router.get('/update',async (req,res)=>{
    let check1 = req.originalUrl;
    let check2 = "/board/delete";
    let suid = req.session.userid;
    let {userid, bno} = req.query;

    if(check1.match(check2)){res.redirect(303,'/member/login');}
    else if(suid && userid &&(suid === userid)) {
        let bds = new Board().selectOne(bno).then((bds) => bds);
        //console.log(await bds);
        res.render('board/update', {title: "게시글 수정하기", bds:await bds});
    } else {
        res.redirect(303, '/list')
    }
});

router.get('/delete',async (req,res)=>{
    let check1 = req.originalUrl;
    let check2 = "/board/delete";
    let suid = req.session.userid;
    let {userid, bno} = req.query;
    if(check1.match(check2)){res.redirect(303,'/member/login');}
    else if(suid && userid &&(suid === userid)) {   //글 작성자와 삭제 시도자가 일치하는 경우
        new Board().delete(bno).then((insertcnt) => insertcnt);
        //console.log(await bds);
        res.redirect(303,'/board/list');
    }
});
module.exports = router;
