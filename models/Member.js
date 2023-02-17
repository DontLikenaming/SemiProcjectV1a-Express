const oracledb = require('../models/Oracle');

class Member {
    insertsql = ' insert into member (mno, userid, passwd, name, email) values ' +
        ' (mno.nextval, :1, :2, :3, :4) ';


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

            let result = await conn.execute(this.insertsql, params);
            await conn.commit();
            if(result.rowsAffected > 0) console.log('데이터 입력 성공');

        }catch (e){console.log(e)}
        finally {
            await oracledb.closeConn(conn);
        }
    }
    //성적 전체조회
    async select(){
        let conn = null;

        let sql = ' select * from member ';
        let params = [];
        let options = {
            resultSet: true,
            outFormat: oracledb.OUT_FORMAT_OBJECT
        };

        try{
            conn = await oracledb.makeConn();

            let result = await conn.execute(sql);
            await conn.commit();

        }catch (e){console.log(e)}
        finally {
            await oracledb.closeConn(conn);
        }
    }
    //성적 상세조회
    async insertOne(num){
        let conn = null;

        let sql = ' select * from member where mno = :1 ';
        let params = [];
        let options = {
            resultSet: true,
            outFormat: oracledb.OUT_FORMAT_OBJECT
        };

        try{
            conn = await oracledb.makeConn();
            params = [num];

            let result = await conn.execute(sql, params);
            await conn.commit();

        }catch (e){console.log(e)}
        finally {
            await oracledb.closeConn(conn);
        }
    }
}
module.exports = Member;