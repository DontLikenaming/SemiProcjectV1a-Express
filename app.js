// express 모듈과 기타 미들웨어 모듈 사용 선언
const express = require('express');
const path = require('path');
const logger = require('morgan');

// 라우팅 모듈 설정
const indexRouter = require('./routes/index');
const memberRouter = require('./routes/member');
const boardRouter = require('./routes/board');

// express객체 생성 및 포트 변수 선언
const app = express();
const port = process.env.PORT || 3000;

// 라우팅 없이 바로 호출 가능해지도록 static 폴더 설정
app.use(express.static(path.join(__dirname,'static')));

app.use(logger('dev'));

//라우팅 모듈 등록 - 클라이언트 요청 처리 핵심 파트
app.use('/', indexRouter);
app.use('/member', memberRouter);
app.use('/board', boardRouter);

// 404, 500 응답코드에 대한 라우팅 처리 정의
app.use((req,res)=>{
    res.status(404);
    res.sendFile(path.join(__dirname,'public','404.html'));
});

app.use((err,req,res,next)=>{
    res.status(500);
    res.sendFile(path.join(__dirname,'public','500.html'));
});

app.listen(port,()=> {
    console.log('SemiProjectV1 서버 실행 중.. 중지하려면 Ctrl + F2를 누르세요.');
});