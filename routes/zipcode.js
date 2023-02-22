const express = require("express");
const Zipcode = require("../models/Zipcode");
const router = express.Router();

router.get('/',async (req,res)=> {
    let sido = req.query.sido;
    let gugun = req.query.gugun;
    let dong = req.query.dong;
    let [guguns, dongs, zips] = [null, null, null];

    let sidos = new Zipcode().getSido().then((sidos) => sidos);

    if (sido !== undefined) {
        guguns = new Zipcode().getGugun(sido).then((guguns) => guguns);
    }

    if(sido !== undefined && gugun !== undefined) {
        dongs = new Zipcode().getDong(sido, gugun).then((dongs) => dongs);
    }
    if(sido !== undefined && gugun !== undefined && dongs !== undefined) {
        zips = new Zipcode().getZipcode(sido, gugun, dong).then((zips) => zips);
    }
    //console.log(await zips);
    res.render('zipcode', {title:'시군구동 찾기',
        sidos: await sidos, guguns: await guguns, dongs: await dongs, zips: await zips,
        sido: sido, gugun: gugun, dong: dong});
});

module.exports = router;