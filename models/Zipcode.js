const oracledb = require('../models/Oracle');

let zipcodesql={
    sidosql : ' select distinct sido from zipcode2013 order by sido ',
    gugunsql : ' select distinct gugun from zipcode2013 where sido = :1 order by gugun ',
    dongsql : ' select distinct dong from zipcode2013 where sido = :1 and gugun = :2 order by dong ',
    zipsql : ' select * from zipcode2013 where sido = :1 and gugun = :2 and dong = :3 order by zipcode '
}
class Zipcode{
    constructor(zipcode, sido, gugun, dong, ri, bunji) {
        this.zipcode = zipcode;
        this.sido = sido;
        this.gugun = gugun;
        this.dong = dong;
        this.ri = ri;
        this.bunji = bunji;
    }
    async getSido(){
        let conn = null;
        let params = [];
        let sidos = [];
        try{
            conn = await oracledb.makeConn();
            let result = await conn.execute(zipcodesql.sidosql, params, oracledb.options);
            await conn.commit();
            let rs = result.resultSet;
            let row = null;
            while((row = await rs.getRow())){
                let sd = new Zipcode(null, row.SIDO, null, null, null, null);
                sidos.push(sd);
            }
        }
        catch (e){console.log(e)}
        finally {
            await oracledb.closeConn(conn);
        }

        return sidos;
    }

    async getGugun(sido){
        let conn = null;
        let params = [sido];
        let guguns = [];
        try{
            conn = await oracledb.makeConn();
            let result = await conn.execute(zipcodesql.gugunsql, params, oracledb.options);
            await conn.commit();
            let rs = result.resultSet;
            let row = null;
            while((row = await rs.getRow())){
                let gg = new Zipcode(null, null, row.GUGUN, null, null, null);
                guguns.push(gg);
            }
        }
        catch (e){console.log(e)}
        finally {
            await oracledb.closeConn(conn);
        }

        return guguns;
    }

    async getDong(sido, gugun){
        let conn = null;
        let params = [sido, gugun];
        let dongs = [];
        try {
            conn = await oracledb.makeConn();
            let result = await conn.execute(zipcodesql.dongsql, params, oracledb.options);
            await conn.commit();
            let rs = result.resultSet;
            let row = null;
            while ((row = await rs.getRow())) {
                let dg = new Zipcode(null, null, null, row.DONG, null, null);
                dongs.push(dg);
            }
        }
        catch (e){console.log(e)}
        finally {
            await oracledb.closeConn(conn);
        }

        return dongs;
    }

    async getZipcode(sido, gugun, dong){
        let conn = null;
        let params = [sido, gugun, dong];
        let zips = [];
        try{
            conn = await oracledb.makeConn();
            let result = await conn.execute(zipcodesql.zipsql, params, oracledb.options);
            await conn.commit();
            let rs = result.resultSet;
            let row = null;
            while((row = await rs.getRow())){
                let zp = new Zipcode(row.ZIPCODE, row.SIDO, row.GUGUN, row.DONG, row.RI, row.BUNJI);
                zips.push(zp);
            }
        }
        catch (e){console.log(e)}
        finally {
            await oracledb.closeConn(conn);
        }

        return zips;
    }

}

module.exports = Zipcode;