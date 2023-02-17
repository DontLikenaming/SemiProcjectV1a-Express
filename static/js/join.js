const processJn = () => {
    let jnfrm = document.jnfrm;
    let userid = document.userid;
    if (jnfrm.userid.value === '')alert("아이디를 입력하세요!");
    else if (jnfrm.passwd.value === '')alert("비밀번호를 입력하세요!");
    else if (jnfrm.check.value === '')alert("비밀번호를 다시 입력하세요!");
    else if (jnfrm.passwd.value !== jnfrm.check.value)alert("비밀번호를 확인해주세요!");
    else if (jnfrm.name.value === '')alert("이름을 입력하세요!");
    else if (jnfrm.email.value === '')alert("이메일을 입력하세요!");
    else{
        console.log(
            jnfrm.userid.value,
            jnfrm.passwd.value,
            jnfrm.name.value,
            jnfrm.email.value
        );
        jnfrm.method = 'post';
        jnfrm.enctype = 'application/x-www-form-urlencoded';
        jnfrm.submit();
    }
}

let jnbtn = document.querySelector(`#jnbtn`);
jnbtn.addEventListener(`click`, processJn);