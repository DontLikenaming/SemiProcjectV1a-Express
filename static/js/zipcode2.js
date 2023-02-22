const makeopt = (elm, text) => {
    let opt = document.createElement('option');
    let txt = document.createTextNode(text);
    opt.appendChild(txt);
    elm.appendChild(opt);
};

const makeAddr = (objs) => {
    let obj = [];
    for(let i=0;i<objs.length;i++){
        obj=objs[i];

        let p = document.createElement('p');
        let txt = document.createTextNode(`${obj.zipcode} : ${obj.sido} ${obj.gugun} ${obj.dong} ${obj.ri} ${obj.bunji}`);
        p.appendChild(txt);
        zipcode.appendChild(p);
    }
};

const getGugun = () => {
    fetch(`/zipcode2/gugun/${sido.value}`)
        .then(response=>response.text())
        .then(text=>setGugun(text));

    while(dong.lastChild){
        dong.removeChild(dong.lastChild);
    }
    makeopt(dong, '-- 읍면동 --');
};

const setGugun = (guguns) => {
    let objs = JSON.parse(guguns);
    while(gugun.lastChild){
        gugun.removeChild(gugun.lastChild);
    }
    makeopt(gugun, '-- 시군구 --');
    objs.forEach((obj, idx)=>{
        makeopt(gugun, obj.gugun);
    });
};

const getDong = () => {
    fetch(`/zipcode2/dong/${sido.value}/${gugun.value}`)
        .then(response=>response.text())
        .then(text=>setDong(text));
};

const setDong = (dongs) => {
    let objs = JSON.parse(dongs);
    while(dong.lastChild){
        dong.removeChild(dong.lastChild);
    }
    makeopt(dong, '-- 읍면동 --');
    objs.forEach((obj, idx)=>{
        makeopt(dong, obj.dong);
    });
};

const setSido = (sidos) => {
    let objs = JSON.parse(sidos);
    objs.forEach((obj, idx)=>{
        makeopt(sido, obj.sido);
    });
};

const getSido = () => {     //서버에 시도 데이터 요청
    fetch('/zipcode2/sido').then(response=>response.text()).then(text=>setSido(text));
};

const setZip = (zips) => {
    while(zipcode.lastChild){
        zipcode.removeChild(zipcode.lastChild);
    }

    let objs = JSON.parse(zips);
    makeAddr(objs);
};

const getZip = () => {     //서버에 시도 데이터 요청
    fetch(`/zipcode2/zip/${sido.value}/${gugun.value}/${dong.value}`)
    .then(response=>response.text())
    .then(text=>setZip(text));
};

getSido();
let sido = document.querySelector('#sido');
let gugun = document.querySelector('#gugun');
let dong = document.querySelector('#dong');
let zipcode = document.querySelector('#zipcode');

sido.addEventListener('change', getGugun);
gugun.addEventListener('change', getDong);
dong.addEventListener('change', getZip);

/*
const getGugun = () => {
    let url = '?sido=' + sido.value;
    location.href=url;
};
const getDong = () => {
    let url = '?sido=' + sido.value + '&gugun=' + gugun.value;
    location.href=url;
};
const showAddr = () => {
    let url = '?sido=' + sido.value + '&gugun=' + gugun.value + '&dong=' + dong.value;
    location.href=url;
};

let sido = document.querySelector('#sido');
let gugun = document.querySelector('#gugun');
let dong = document.querySelector('#dong');

sido.addEventListener('change', getGugun);
gugun.addEventListener('change', getDong);
dong.addEventListener('change', showAddr);*/
