let updatebtn = document.querySelector('#updatebtn');

updatebtn?.addEventListener('click',()=>{
    let updatefrm = document.updatefrm;
    console.log(updatefrm.title.value);
    if(updatefrm.title.value === '')alert("제목을 입력하세요!");
    else if(updatefrm.contents.value === '')alert("본문을 입력하세요!");
    else if(updatefrm.userid.value !== ''){
        updatefrm.method = 'post';
        updatefrm.submit();
    }
});