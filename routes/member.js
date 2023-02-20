const express = require('express');
const Member = require('../models/Member');
const Board = require("../models/Board");
const router = express.Router();


router.get('/',(req,res,next)=>{
    if(req.originalUrl==='/member'){res.redirect('member/join');}
    else if(req.originalUrl==='/member/'){res.redirect(`${req.originalUrl}join`);}
});

router.post('/join',(req,res,next)=> {
    let {userid, passwd, name, email} = req.body;
    let mb = new Member(userid, passwd, name, email);
    mb.insert();
    //mb.select();
    //mb.insertOne(1);
    res.redirect(303, '/member/login');
});

router.get('/join',(req,res)=>{
    res.render('join', {title:'회원가입'});
});

router.get('/login',(req,res)=>{
    res.render('login', {title:'회원로그인'});
});

router.post('/login',async (req,res)=>{
    let viewName = '/member/loginfail';
    let {userid, passwd} = req.body
    let rowcnt = new Member().login(userid, passwd)
        .then((result)=>result);
    if(await rowcnt > 0){
        viewName = '/member/myinfo';
        req.session.userid = userid;    //입력받은 id를 세션변수로 등록
    }
    res.redirect(303,viewName);
});

router.get('/logout',(req,res)=>{
    req.session.destroy(()=>req.session);
    res.redirect(303, '/');
});

router.get('/myinfo',(req,res)=>{
    res.render('myinfo', {title:'회원정보'});
});
module.exports = router;
