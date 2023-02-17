const oracledb = require("oracledb");
const dbconfig = require("../dbconfig");

const Oracle = {
    initConn: () =>{
        oracledb.initOracleClient({libdir: 'C:/Java/instantclient_19_17'});
    },
    makeConn: async () => {
        try {
            return await oracledb.getConnection(dbconfig);
        } catch(e) {
            console.error(e);
        }
    },
    closeConn: async (conn) => {
        if (conn) {
            try {
                await conn.close();
                console.log('오라클 데이터베이스 접속 해제 성공')
            } catch (e) {
                console.error(e);
            }
        }
    }
}
module.exports = Oracle;

