const http = require("http");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./router.js");
const webServerConfig = require("../config/web-server.js");

let httpServer;

// var   fs = require("fs");
// const path = require("path");

// var privateKey = fs.readFileSync(path.join(__dirname,'../certs','generated-private-key.txt'), 'utf8');
// var certificate = fs.readFileSync(path.join(__dirname,'../certs','6b7d09109d01c6d5.pem'), 'utf8');

// const privateKey= fs.readFileSync('./key.pem', 'utf8');
// const certificate = fs.readFileSync('./server.crt', 'utf8');

// var certificate = fs.readFileSync('certs/6b7d09109d01c6d5.crt');
// const ca = fs.readFileSync('certs/gd_bundle-g2-g1.crt');


// var credentials = {key: privateKey, cert: certificate};
const credentials = {
  // key: privateKey,
  // cert: certificate,
  // ca: [
  //         // fs.readFileSync(path.join(__dirname,'../certs','gdig2_bundle.crt'), 'utf8')
  //         fs.readFileSync(path.join(__dirname,'../certs','gdig2_bundle.crt'), 'utf8'), 
  //         // fs.readFileSync(path.join(__dirname,'../certs','gd2.crt'), 'utf8'),
  //   //    fs.readFileSync(path.join(__dirname,'../certs','gd3.crt'), 'utf8')
  //      ]
};

// var server = http.createServer(credentials,function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Hello World\n');
// });

function initialize() {
  return new Promise((resolve, reject) => {
    const app = express();
    // httpServer = https.createServer(app);
    const httpServer = http.createServer(credentials, app);

    // web server logging
    app.use(morgan("combined"));
    app.use(cors());

    app.use(
      express.json({
        reviver: reviveJson,
      })
    );

    app.use("/api", router);

    httpServer
      .listen(webServerConfig.port)
      .on("listening", () => {
        console.log(
          `Web server listening on localhost:${webServerConfig.port}`
        );

        resolve();
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

module.exports.initialize = initialize;

// previous code above this line

function close() {
  return new Promise((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

module.exports.close = close;

const iso8601RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;

function reviveJson(key, value) {
  // revive ISO 8601 date strings to instances of Date
  if (typeof value === "string" && iso8601RegExp.test(value)) {
    return new Date(value);
  } else {
    return value;
  }
}
