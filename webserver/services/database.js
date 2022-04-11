const dbConfig = require("../config/database.js");
const oracledb = require('oracledb');

try {
  oracledb.initOracleClient(
    // {libDir: '/Users/venkateshthammichetti/react/dailycart/webserver/instantclient_19_8'}
    );
} catch (err) {
  console.error('Whoops!');
  console.error(err);
  process.exit(1);
}


// *** Initialize conncetion pools ***
async function initialize() {
  const pool = await oracledb.createPool(dbConfig.hrPool);
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
      const result = await conn.execute(statement, binds, opts);
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
    } catch (err) {
      reject(err);
    } finally {
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



