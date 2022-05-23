const dbConfig = require("../config/database.js");
const oracledb = require('oracledb');

try {
  oracledb.initOracleClient(
    {libDir: '/Users/venkateshthammichetti/react/dailycart/webserver/instantclient_19_8'}
    );
} catch (err) {
  console.error('Whoops!');
  console.error(err);
  process.exit(1);
}


// *** Initialize conncetion pools ***
async function initialize() {
  await oracledb.createPool(dbConfig.hrPool);
}

module.exports.initialize = initialize;

// *** Close conncetion pools ***

async function close() {
  await oracledb.getPool().close();
}

module.exports.close = close;

// *** Execute SQL statements  and return result ***

function simpleExecute(statement, binds = [], opts = {}) {
  return new Promise(async (resolve, reject) => {
    console.log(`START - simpleExecute\n`)
    
    let conn;

    opts.outFormat = oracledb.OBJECT;
    opts.autoCommit = false;

    console.log(`Executing below SQL statement in simpleExecute ....\n\n`,statement)

    try {
      conn = await oracledb.getConnection();
      // const result1 = await conn.execute("begin dbms_lock.sleep(10); end;");
      const result = await conn.execute(statement, binds, opts);
      await conn.commit();
      resolve(result);
    } catch (err) {
      reject(err);
    } finally {
        if (conn) {
          // conn assignment worked, need to close
          try {
            console.log(`\nEND - simpleExecute\n`)
            await conn.close();
          } catch (err) {
            console.log("Failed - simpleExecute\n" + err);
          }
        }
    }
  });
}

module.exports.simpleExecute = simpleExecute;


function ExecuteMany_proc(statement, binds = [], opts = {}) {
  return new Promise(async (resolve, reject) => {
    console.log(`START - ExecuteMany_proc \n`)
    let conn;

    opts.outFormat = oracledb.OBJECT;
    opts.autoCommit = false;

    console.log(`Executing below SQL statement in ExecuteMany_proc .... \n`,statement)

  try {
      conn = await oracledb.getConnection();
      const result = await conn.executeMany(statement, binds, opts);
      resolve(result);
     } 
  catch (err) {
      reject(err);
    } 
  finally {
      if (conn) {
        // conn assignment worked, need to close
        try {
          console.log(`END - ExecuteMany_proc \n`)
          await conn.close();
        } catch (err) {
          console.log("Failed - ExecuteMany_proc\n" + err);
        }
      }
    }
  });
}

module.exports.ExecuteMany_proc = ExecuteMany_proc;


function ExecuteMany_Dyn(plsqlProc, binds = [],recName) {
  return new Promise(async (resolve, reject) => {
    console.log(`START - ExecuteMany_Dyn \n`)

    console.log(`Executing below statement  .... \n`,plsqlProc)

    let conn;
    
  try {
      conn = await oracledb.getConnection();
      const RectypeClass = await conn.getDbObjectClass(recName.toUpperCase());

      // await conn.close();

      const options = {bindDefs  : {p_in           : { type: RectypeClass },
                                    p_out          : { type: oracledb.STRING,dir: oracledb.BIND_OUT,maxSize: 500 },
                                    p_out_rec      : { type: RectypeClass, dir: oracledb.BIND_OUT },
                                  }     
                      };
        options.outFormat = oracledb.OBJECT;
        options.autoCommit = false;
      
      // conn = await oracledb.getConnection();
      const result = await conn.executeMany(plsqlProc, binds, options);
      resolve(result);
      console.log("Successful execution")
     } 
  catch (err) {
      reject(err);
    } 
  finally {
      if (conn) {
        console.log("connection is active")
        // conn assignment worked, need to close
        try {
            console.log(`Closing Connection after executing ExecuteMany_Dyn \n`)
            await conn.close();
            console.log(`Connection Closed !!! \n`)
            } 
        catch (err) {
          console.log("Failed - ExecuteMany_Dyn\n" + err);
        }
      }
    }
  });
}

module.exports.ExecuteMany_Dyn  = ExecuteMany_Dyn;



