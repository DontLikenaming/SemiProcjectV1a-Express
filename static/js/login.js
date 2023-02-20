const processLog = () => {
    let logfrm = document.logfrm;
    if (logfrm.userid.value === '')alert("아이디를 입력하세요!");
    else if (logfrm.passwd.value === '')alert("비밀번호를 입력하세요!");
    else{
        logfrm.method = 'post';
        logfrm.enctype = 'application/x-www-form-urlencoded';
        logfrm.submit();
    }
}

let loginbtn = document.querySelector(`#loginbtn`);
loginbtn.addEventListener(`click`, processLog);