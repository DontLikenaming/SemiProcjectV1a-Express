const express = require('express');
const path = require('path');
const logger = require('morgan');
const {engine} = require("express-handlebars");
const bodyPaser = require('body-parser');
const session = require('express-session');
const oracledb = require('./models/Oracle');

const indexRouter = require('./routes/index');
const memberRouter = require('./routes/member');
const boardRouter = require('./routes/board');

const app = express();
const port = process.env.PORT || 3000;

app.engine('hbs',engine({extname:'.hbs', defaultLayout:'layout',
    helpers: {
        section: function(name, options) {
            if(!this._sections) this._sections = {}
            this._sections[name] = options.fn(this)
            return null
        },},
}));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');

// 세션
const maxAge = 1000 * 30;
const sessionObj = {
    resave: false, saveUninitialized: false,
    // secret: process.env.COOKIE_SECRET,
    secret: 'process.env.COOKIE_SECRET',
    cookie: { httpOnly: true, secure: false, },
    name: 'session-cookie',
    maxAge: maxAge
};
app.use(session(sessionObj));

app.use(express.static(path.join(__dirname,'static')));

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyPaser.json());

oracledb.initConn();

//생성한 세션을 모든 페이지에서 접근 가능하게 함
app.use(function(req, res, next){
    res.locals.session = req.session;
    next();
});

app.use('/',indexRouter);
app.use('/member',memberRouter);
app.use('/board',boardRouter);

app.use((req,res)=>{
    res.status(404);
    res.sendFile(path.join(__dirname,'public','404.html'));
});

app.use((err,req,res)=>{
    res.status(500);
    console.log(err);
    res.sendFile(path.join(__dirname,'public','500.html'));
});

app.listen(port,()=> {
    console.log('익스프레스 서버 실행 중.. 중지하려면 Ctrl + F2를 누르세요.');
});