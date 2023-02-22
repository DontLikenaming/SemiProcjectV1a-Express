const express = require("express");
const Zipcode = require("../models/Zipcode");
const router = express.Router();

router.get('/',async (req,res)=> {
    res.render('zipcode2', {title: '주소찾기 v2'});
});

router.get('/sido',async (req,res)=> {
    let sidos = new Zipcode().getSido().then((sidos) => sidos);

    res.send(JSON.stringify(await sidos));    // 조회결과를 json 형식으로 전송
});

router.get('/gugun/:sido',async (req,res)=> {
    let sido = req.params.sido;

    let guguns = new Zipcode().getGugun(sido).then((guguns) => guguns);

    res.send(JSON.stringify(await guguns));
});

module.exports = router;