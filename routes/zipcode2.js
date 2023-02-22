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
    // path variable
    // REST API에서 사용하는 방식으로 경로를 변수처럼 사용하는 기법
    // express 프레임워크에서 /:'변수명'으로 사용함
    // 변수의 값을 가져오려면 req.params.'변수명'
    let sido = req.params.sido;

    let guguns = new Zipcode().getGugun(sido).then((guguns) => guguns);

    res.send(JSON.stringify(await guguns));
});

router.get('/dong/:sido/:gugun',async (req,res)=> {
    let sido = req.params.sido;
    let gugun = req.params.gugun;

    let dongs = new Zipcode().getDong(sido, gugun).then((dongs) => dongs);

    res.send(JSON.stringify(await dongs));
});

router.get('/zip/:sido/:gugun/:dong',async (req,res)=> {
    let sido = req.params.sido;
    let gugun = req.params.gugun;
    let dong = req.params.dong;

    let zips = new Zipcode().getZipcode(sido, gugun, dong).then((zips) => zips);

    res.send(JSON.stringify(await zips));
});

module.exports = router;