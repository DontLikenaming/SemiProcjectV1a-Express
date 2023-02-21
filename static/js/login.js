const processLogin = () => {
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
let userid = document.querySelector(`#userid`);
let passwd = document.querySelector(`#passwd`);
loginbtn.addEventListener(`click`, processLogin);
userid.addEventListener('keydown',(event) =>{
    if(event.key==='Enter') processLogin();
});
passwd.addEventListener('keydown',(event) =>{
   if(event.key==='Enter') processLogin();
});