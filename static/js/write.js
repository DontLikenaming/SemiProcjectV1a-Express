const processWrite = () => {
    let wrtfrm = document.write;
    if (wrtfrm.title.value === '')alert("제목을 입력하세요!");
    else if (wrtfrm.contents.value === '')alert("본문을 입력하세요!");
    else if (wrtfrm.userid.value !== ''){
        wrtfrm.method = 'post';
        wrtfrm.enctype = 'application/x-www-form-urlencoded';
        wrtfrm.submit();
    }
}
let wrtbtn = document.querySelector(`#wrtbtn`);
wrtbtn.addEventListener(`click`, processWrite);