const oracledb = require('../models/Oracle');

let membersql = {
    insertsql : ' insert into member (mno, userid, passwd, name, email) values ' +
    ' (mno.nextval, :1, :2, :3, :4) ',
    loginsql : ' select count(mno) cnt from member where userid = :1 and passwd = :2 ',
    selectOne : ` select userid, name, email, to_char(regdata, 'yyyy-mm-dd HH24:MI:SS') regdata from member where userid = :1 `
};

class Member {
    constructor(userid, passwd, name, email) {
        this.userid = userid;
        this.passwd = passwd;
        this.name = name;
        this.email = email;
    }
    async insert(){
        let conn = null;
        let params = [];
        let options = {
            resultSet: true,
            outFormat: oracledb.OUT_FORMAT_OBJECT
        };

        try{
            conn = await oracledb.makeConn();
            params = [this.userid, this.passwd, this.name, this.email];

            let result = await conn.execute(membersql.insertsql, params);
            await conn.commit();
            if(result.rowsAffected > 0) console.log('회원 데이터 입력 성공');

        }catch (e){console.log(e)}
        finally {
            await oracledb.closeConn(conn);
        }
    }
    async login(uid, pwd){
        let conn = null;
        let params = [uid, pwd];
        let isLogin = 0;
        try{
            conn = await oracledb.makeConn();

            let result = await conn.execute(membersql.loginsql, params, oracledb.options);
            await conn.commit();
            let rs = result.resultSet;
            let row = null;
            while((row = await rs.getRow()))isLogin = row.CNT;

        }catch (e){console.log(e)}
        finally {
            await oracledb.closeConn(conn);
        }
        //console.log(await isLogin);
        return isLogin;
    }
    async selectOne(uid){
        let conn = null;
        let params = [uid];
        //console.log(uid);
        let mem = [];
        try{
            conn = await oracledb.makeConn();

            let result = await conn.execute(membersql.selectOne, params, oracledb.options);
            await conn.commit();
            let rs = result.resultSet;
            let row = null;
            while((row = await rs.getRow())){
                let m = new Member(row.USERID, null, row.NAME, row.EMAIL);
                m.regdata = row.REGDATA;
                mem.push(m);
            }
        }catch (e){console.log(e)}
        finally {
            await oracledb.closeConn(conn);
        }
        //console.log(mem);
        return mem;
    }
}
module.exports = Member;