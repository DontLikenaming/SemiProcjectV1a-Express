const oracledb = require('../models/Oracle');

let membersql = {
    insertsql : ' insert into member (mno, userid, passwd, name, email) values ' +
    ' (mno.nextval, :1, :2, :3, :4) ',
    logsql : ' select userid, passwd from member '
};

class Member {
    constructor(mno, userid, passwd, name, email, regdata) {
        this.mno = mno;
        this.userid = userid;
        this.passwd = passwd;
        this.name = name;
        this.email = email;
        this.regdata = regdata;
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
    async log(){
        let conn = null;
        let test = [];
        let check = 0;
        try{
            conn = await oracledb.makeConn();

            let result = await conn.execute(membersql.logsql, [], oracledb.options);
            await conn.commit();
            let rs = result.resultSet;
            let row = null;
            while(row = await rs.getRow()){
                let log = new Member(null, row.USERID, row.PASSWD, null, null, null);
                test.push(log);
            }
                for(let i=0;i<test.length;i++) {
                    if ((this.userid === test[i].userid) && (this.passwd === test[i].passwd)) check = 1;
                }

            if(check===1)console.log(`환영합니다. ${this.userid}님.`);
            else{console.log(`잘못 입력하셨습니다.`);}

        }catch (e){console.log(e)}
        finally {
            await oracledb.closeConn(conn);
        }
        return check;
    }
}
module.exports = Member;