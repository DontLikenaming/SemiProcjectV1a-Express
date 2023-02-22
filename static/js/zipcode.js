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
dong.addEventListener('change', showAddr);