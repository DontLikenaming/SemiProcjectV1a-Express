const makeopt = (elm, text) => {
    let opt = document.createElement('option');
    let txt = document.createTextNode(text);
    opt.appendChild(txt);
    elm.appendChild(opt);
};

const getGugun = () => {     //서버에 시도 데이터 요청
    fetch('/zipcode2/gugun/'+sido.value)
        .then(response=>response.text())
        .then(text=>setGugun(text));
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

const setSido = (sidos) => {
    let objs = JSON.parse(sidos);
    objs.forEach((obj, idx)=>{
        makeopt(sido, obj.sido);
    });
};

const getSido = () => {     //서버에 시도 데이터 요청
    fetch('/zipcode2/sido').then(response=>response.text()).then(text=>setSido(text));
};

getSido();
let sido = document.querySelector('#sido');
let gugun = document.querySelector('#gugun');
let dong = document.querySelector('#dong');

sido.addEventListener('change', getGugun);
/*gugun.addEventListener('change', );
dong.addEventListener('change', );*/

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
