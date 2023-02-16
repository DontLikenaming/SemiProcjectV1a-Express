const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/',(req, res)=>{
    console.log(req.originalUrl);
    if(req.originalUrl==='/board'){res.redirect('board/list');}
    else if(req.originalUrl==='/board/'){res.redirect(`${req.originalUrl}list`);}
    res.sendFile(path.join(__dirname,'../public','list.html'));
});
router.get('/list',(req, res)=>{
    res.sendFile(path.join(__dirname,'../public','list.html'));
});

router.get('/write',(req, res)=>{
    res.sendFile(path.join(__dirname,'../public','write.html'));
});

router.get('/view',(req, res)=>{
    res.sendFile(path.join(__dirname,'../public','view.html'));
});

module.exports = router;
