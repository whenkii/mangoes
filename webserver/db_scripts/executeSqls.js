
const database = require("../services/database.js");
const oracledb = require("oracledb");

const logSQL = props => {
  console.log('******************************')
  console.log(props)
  console.log('******************************')
} 

  async function weakSqls(req, res, next) {
    console.log("START","weakSqls");
    try {
    let query = "select * from products";

    const binds = {};

    if (req.params.id) {
      binds.employee_id = req.params.id;
      query += `\nwhere id = :id`;
    }

    const result = await database.simpleExecute(query, binds);
    res.status(200).json(result);
    } 
    catch (err) {
      next(err);
      res.status(400).end();
    }
    finally {
      console.log("Successfully exected - weakSqls");
    }
  }

module.exports.weakSqls = weakSqls;

async function adhocSqls(req, res, next) {
  console.log("START",`adhocSqls\n`);
  let query;

  try {

  const binds = {};

  if (req.params.sqltext) {
      query = req.params.sqltext;
  }
  else {
    res.status(201).json("SQL is missing in API call");
  }

  const result = await database.simpleExecute(query, binds);
  res.status(200).json(result);
  } 
  catch (err) {
    next(err);
    console.log(`Error while executing the SQL`);
    logSQL(query);
    res.status(400).end();
  }
  finally {
    console.log("END - adhocSqls");
  }
}



async function adhocSqlsViaBody(req, res, next) {
  console.log("START","adhocsqlsViaBody\n");
  let query;
  console.log("req" ,req.body)
  try {
  const binds = {}
  if (req.body.sqltext) {
  query = req.body.sqltext;
  }
  else {
  res.status(201).json("SQL is missing in API call");
  }
  logSQL(query);
  const result  = await database.simpleExecute (query, binds);
  console.log("Status : Successful");
  res.status(200).json(result);
}
  catch (err) {
  console.log("Status : Error!!!");
  next(err);
  console.log(`Error while executing the SQL`);
  logSQL(query);
  res.status(400).end();
  }
  finally {
  console.log("END - adhocSqlsViaBody");
  }
}

  module.exports.adhocSqlsViaBody= adhocSqlsViaBody;



  async function createAccount(req, res, next) {
    console.log("START","createAccount");
    const {p_firstname,p_lastname,p_email,p_password} = req.body.vars;
    console.log(req.body.vars);
    try {
    let query = `begin createAccount(:p_firstname,:p_lastname,:p_email,:p_password,:p_out); end;`;
    
    // console.log("STATE",req.body);
  
    const options = {bindDefs: { p_firstname          : {type: oracledb.STRING,dir: oracledb.BIND_IN,maxSize: 500},
                                 p_lastname          : {type: oracledb.STRING,dir: oracledb.BIND_IN,maxSize: 500},
                                 p_email             : {type: oracledb.STRING,dir: oracledb.BIND_IN,maxSize: 500},
                                 p_password          : {type: oracledb.STRING,dir: oracledb.BIND_IN,maxSize: 500},
                                // p_postalcode        : {type: oracledb.STRING,dir: oracledb.BIND_IN,maxSize: 500},
                                p_out               : {type: oracledb.STRING,dir: oracledb.BIND_OUT,maxSize: 500 }
                    }}
    // const options = {};
    const binds = [{p_firstname:p_firstname,
                    p_lastname:p_lastname,
                    p_email:p_email,
                    p_password:p_password
                  }];

    // console.log(binds)
  
    const result = await database.ExecuteMany_proc(query, binds,options);
    // console.log(result.outBinds[0].p_out)
                  res.status(200).json(result.outBinds[0].p_out);
    } 
    catch (err) {
      next(err);
      res.status(400).end();
    }
    finally {
      console.log("Successfully executed - createAccount");
    }
  }
  
  module.exports.createAccount = createAccount;


  async function addProduct(req, res, next) {
    console.log("START","createAccount");
    const {p_name,p_units,p_price,p_offerprice,p_inStock} = req.body.vars;
    console.log(req.body.vars);
    try {
    let query = `begin addProduct(:p_name,:p_units,:p_price,:p_offerprice,:p_inStock,:p_out); end;`;
    
    // console.log("STATE",req.body);
  
    const options = {bindDefs: { p_name          : {type: oracledb.STRING,dir: oracledb.BIND_IN,maxSize: 500},
                                 p_units         : {type: oracledb.STRING,dir: oracledb.BIND_IN,maxSize: 500},
                                 p_price         : {type: oracledb.STRING,dir: oracledb.BIND_IN,maxSize: 500},
                                 p_offerprice    : {type: oracledb.STRING,dir: oracledb.BIND_IN,maxSize: 500},
                                 p_inStock       : {type: oracledb.STRING,dir: oracledb.BIND_IN,maxSize: 500},
                                 p_out            : {type: oracledb.STRING,dir: oracledb.BIND_OUT,maxSize: 500 }
                    }}
    // const options = {};
    const binds = [{p_name:p_name,
                    p_units:p_units,
                    p_price:p_price,
                    p_offerprice:p_offerprice,
                    p_inStock:p_inStock
                  }];

    // console.log(binds)
  
    const result = await database.ExecuteMany_proc(query, binds,options);
    // console.log(result.outBinds[0].p_out)
                  res.status(200).json(result.outBinds[0].p_out);
    } 
    catch (err) {
      next(err);
      res.status(400).end();
    }
    finally {
      console.log("Successfully executed - createAccount");
    }
  }
  
  module.exports.addProduct = addProduct;

async function adhocSqlsViaPost(req, res, next) {
  console.log("START","adhocSqlsViaPost");
  let query;

  try {

  const binds = {};

  if (req.body.sqltext) {
      query = req.params.sqltext;
  }
  else {
    res.status(201).json("SQL text is missing in API call");
  }

  const result = await database.simpleExecute(query, binds);
  console.log(result);
  res.status(200).json(result);
  } 
  catch (err) {
    next(err);
    console.log(`Error while executing the SQL\n ${query}`);
    res.status(400).end();
  }
  finally {
    console.log("END - adhocSqlsViaPost");
  }
}



module.exports.adhocSqls = adhocSqls;


async function executeProc(req, res, next) {
  console.log("START","executeProc");
  var seq;

  //Get seq_id
  try {
    let query = "select orders_seq.nextval seqid from dual";
    const binds = {};

    const result = await database.simpleExecute(query, binds);
    seq = result.rows[0].SEQID;
    console.log("Successfully got the order SEQ_ID - executeProc");
    } 
    catch (err) {
      console.log("Error while getting SEQ_ID\n");
      next(err);
      res.status(400).end();
    }
    finally {
      console.log("END - Get SEQ_ID\n");
    }
  
  try {
  let query = `call pkg_orders.create_order(${seq},'whenkii@yahoo.co.in',:id,:QTY,:PRICE,:p_error_string)`;
  
  // console.log("STATE",req.body);

  const options = {bindDefs: {ID             : {type: oracledb.NUMBER,dir: oracledb.BIND_IN},
                              QTY            : {type: oracledb.NUMBER,dir: oracledb.BIND_IN},
                              PRICE          : {type: oracledb.NUMBER,dir: oracledb.BIND_IN},
                              p_error_string : {type: oracledb.STRING,dir: oracledb.BIND_OUT,maxSize: 500 }
                  }}

  const binds = req.body;

  const result = await database.ExecuteMany_proc(query, binds,options);
                res.status(200).json(result);
  } 
  catch (err) {
    next(err);
    res.status(400).end();
  }
  finally {
    console.log("Successfully executed - executeProc");
  }
}

module.exports.executeProc = executeProc;



async function executeProc_log_order(req, res, next) {
  console.log("START","executeProc_log_order\n");
  var seq;

  //Get seq_id
  try {
    let query = "select orders_seq.nextval seqid from dual";
    const binds = {};

    const result = await database.simpleExecute(query, binds);
    seq = result.rows[0].SEQID;
    // console.log(result.rows[0].SEQID);
    } 
    catch (err) {
      next(err);
      res.status(400).end();
    }
    finally {
      console.log("Successfully got the order SEQ_ID - executeProc");
    }
  
  let conn = await oracledb.getConnection();
  try {
  let script = `call create_order(${seq},:EMAIL,:PRODID,:QTY,:PRICE,:DELMODE,:ADDRESS,:LOCATION,:DELIVERYCHARGES,:PAYMENTMODE,:p_out)`;
  
  // console.log("STATE",req.body);

  const options = {bindDefs: {EMAIL          : {type: oracledb.STRING,dir: oracledb.BIND_IN,maxSize: 500},
                              PRODID         : {type: oracledb.NUMBER,dir: oracledb.BIND_IN},
                              QTY            : {type: oracledb.NUMBER,dir: oracledb.BIND_IN},
                              PRICE          : {type: oracledb.NUMBER,dir: oracledb.BIND_IN},
                              DELMODE        : {type: oracledb.STRING,dir: oracledb.BIND_IN,maxSize: 500},
                              ADDRESS        : {type: oracledb.STRING,dir: oracledb.BIND_IN,maxSize: 500},
                              LOCATION       : {type: oracledb.STRING,dir: oracledb.BIND_IN,maxSize: 500},
                              DELIVERYCHARGES : {type: oracledb.NUMBER,dir: oracledb.BIND_IN},
                              PAYMENTMODE     : {type: oracledb.STRING,dir: oracledb.BIND_IN,maxSize: 500},
                              p_out          : {type: oracledb.STRING,dir: oracledb.BIND_OUT,maxSize: 500 }
                  }}

  const binds = req.body;

  const result = await conn.executeMany(script, binds, options);
  // console.log(result)
  let {outBinds} = result;
  // console.log(outBinds)
  // let errorArray = outBinds.map(item => item.p_out);
  // let lengthOferrorArray = errorArray.filter(a => a && a.length > 0).length;

  // console.log("outBinds",errorArray.filter(a => a && a.length > 0));
// If any errors send unsuccessful exit code 201
  if ( outBinds[0].p_out !== 'OK' ) {
    console.log("Error while executing the proc -  executeProc_log_order. Transactions is being rolledback");
    console.log("Error ARRAY in executeProc_log_order\n",outBinds[0].p_out)
        await conn.rollback();
        res.status(201).json(result);
      }
  else {
        console.log("Successful execution -  executeProc_log_order. Transactions is comitted");
        await conn.commit();
        res.status(200).json(result);
       } 
     }
  catch (err) {
    next(err);
    console.log("Failed - executeProc_log_order" + err);
    res.status(400).end();
  }
  finally {
    console.log("END","executeProc_log_order");
    await conn.close();
  }
}

module.exports.executeProc_log_order = executeProc_log_order;