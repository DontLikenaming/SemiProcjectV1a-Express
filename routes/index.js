const express = require('express');
//const path = require('path');
const router = express.Router();


router.get('/',(req,res)=>{
    res.render('index', {title:'기본화면'});
});

module.exports = router;
