const oracledb = require("oracledb");
const database = require("../services/database.js");

async function find(req) {
  //   const paarams = json(context.params);
  try {
    console.log("inside find API");
    // console.log(req.body.email);
    const result = await database.simpleExecute(
      "begin :var := fn_insert_issue(:email,:issue); commit; end;",
      {
        var:   { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
        email: {
                type: oracledb.STRING,
                dir: oracledb.BIND_IN,
                val: req.body.email,
               },
        issue: {
                type: oracledb.STRING,
                dir: oracledb.BIND_IN,
                val: req.body.details,
               },
      }
    );
    return result.outBinds;
  } catch (err) {
    console.log("Error in find (logissueAPI) - " + err);
  }
}

module.exports.find = find;
