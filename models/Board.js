const oracledb = require('../models/Oracle');

let boardsql = {
    insert : ' insert into board (bno, title, userid, contents) values ' +
                ' (bno.nextval, :1, :2, :3) ' ,
    select : ` select BNO, TITLE, USERID, VIEWS, to_char(regdate,'yyyy-mm-dd') regdate ` +
                ` from board order by bno desc `,
    selectCount : ` select count(bno) cnt from board `,
    selectOne : ` select bno, title, userid, contents, to_char(regdate,'yyyy-mm-dd hh-mi-ss') regdate ` +
                   ` from board where bno = :1 `,
    viewOne : ` update board set views = views+1 where bno = :1 `,
    update: ' update board set title = :1, contents = :2, ' +
        ' regdate = current_timestamp where bno = :3 ',
    delete : ` delete from board where bno = :1 `,
    check : ` select bno from board where  `
};

class Board {

    constructor(bno, title, userid, contents, views, regdate) {
        this.bno = bno;
        this.title = title;
        this.userid = userid;
        this.contents = contents;
        this.views = views;
        this.regdate = regdate;
    }
    async insert(){
        let conn = null;
        let params = [this.title, this.userid, this.contents];
        let insertcnt = 0;
        //console.log(this.title, this.userid, this.contents);
        try{
            conn = await oracledb.makeConn();
            let result = await conn.execute(boardsql.insert, params);
            await conn.commit();

            if(result.rowsAffected > 0) insertcnt = result.rowsAffected;

            return insertcnt;

        }catch (e){console.log(e)}
        finally {
            await oracledb.closeConn(conn);
        }
    }
    async select(){
        let conn = null;
        let result = null;
        let params = [];
        let bds = [];

        try{
            conn = await oracledb.makeConn();

            result = await conn.execute(boardsql.selectCount, params, oracledb.options);
            await conn.commit();
            let rs = result.resultSet;
            let idx = -1, row = null;
            if((row = await rs.getRow()))idx = row.CNT;  //총 게시글 수


            result = await conn.execute(boardsql.select, params, oracledb.options);
            await conn.commit();
            rs = result.resultSet;
            row = null;
            while((row = await rs.getRow())) {
                let bd = new Board(row.BNO, row.TITLE, row.USERID, null, row.VIEWS, row.REGDATE);
                bd.idx = idx--; //글번호 컬럼
                bds.push(bd);
            }
        }catch (e){console.log(e)}
        finally {
            await oracledb.closeConn(conn);
        }
        return bds;
    }
    async selectOne(bno){
        let conn = null;
        let params = [bno];
        let bds = [];

        try{
            conn = await oracledb.makeConn();

            let result = await conn.execute(boardsql.selectOne, params, oracledb.options);
            await conn.commit();
            let rs = result.resultSet;
            let row = null;
            while(row = await rs.getRow()){
                let bd = new Board(row.BNO, row.TITLE, row.USERID, row.CONTENTS, null, row.REGDATE);
                bds.push(bd);
            }
            await conn.execute(boardsql.viewOne, params);
            await conn.commit();
/*            for(let i=0;i<brd.length;i++){
                console.log(brd[i]);
            }*/
        }catch (e){console.log(e)}
        finally {
            await oracledb.closeConn(conn);
        }
        return bds;
    }
    async update(){
        let conn = null;
        let params = [this.title, this.contents, this.bno];
        console.log(this.title, this.contents, this.bno);
        let updatecnt = 0;
        let bds = [];
        try{
            conn = await oracledb.makeConn();
            let result = await conn.execute(boardsql.update, params);
            await conn.commit();

            if(result.rowsAffected > 0) updatecnt = result.rowsAffected;

            return updatecnt;
        }catch (e){console.log(e)}
        finally {
            await oracledb.closeConn(conn);
        }
    }
    async delete(bno){
        let conn = null;
        let insertcnt = 0;
        let check = 0;
        let params = [bno];
        try{
            conn = await oracledb.makeConn();
            let result = await conn.execute(boardsql.delete, params);
            await conn.commit();

            if(result.rowsAffected > 0) insertcnt = result.rowsAffected;

            return insertcnt;
        }catch (e){console.log(e)}
        finally {
            await oracledb.closeConn(conn);
        }
    }
}
module.exports = Board;