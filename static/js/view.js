let updatebtn = document.querySelector('#updatebtn');
let deletebtn = document.querySelector('#deletebtn');
let bno = document.querySelector('#bno').value;
let userid = document.querySelector('#userid').value;

updatebtn?.addEventListener('click',()=>{
    if(confirm('정말 수정하시겠습니까?'))
    location.href = '/board/update?bno=' + bno + '&uid=' + userid;
});
deletebtn?.addEventListener('click',()=>{
    if(confirm('정말 삭제하시겠습니까?'))
    location.href = '/board/delete?bno=' + bno + '&uid=' + userid;
});