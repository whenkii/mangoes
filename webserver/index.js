// *** Database Initialize/close/run of we server modules ***
const webServer = require("./services/web-server.js");
// *** Database config such as username/password/connection string/Pool values ***
const dbConfig = require("./config/database.js");
// *** Database Initialize/close/run of DB modules ***
const database = require("./services/database.js");

const path = require("path");


const defaultThreadPoolSize = 4;

// Increase thread pool size by poolMax
process.env.UV_THREADPOOL_SIZE =
  dbConfig.hrPool.poolMax + defaultThreadPoolSize;

async function startup() {
  console.log("Starting application");

  //Start/Initialize DB modules

  try {
    await database.initialize();
    console.log("Database module started !!!");
  } catch (err) {
    console.error(err);

    process.exit(1); // Non-zero failure code
  }

  // Start/Initialize WebServer modules
  try {
    // console.log("Initializing web server module");

    await webServer.initialize();
    console.log("Web server started !!! ");
  } catch (err) {
    console.error(err);
    process.exit(1); // Non-zero failure code
  }
}

startup();

// shutdown function is not called like startup but calls when serevr is stopped explicitly like Cntrl+c
// *** This Shutdown function calls when server process is closed manually/forcibly
async function shutdown(e) {
  let err = e;

  console.log("Shutting down");

  // *** Stop web server modules at the last ***

  try {
    await webServer.close();
    console.log("Web server stopped !!!");
  } catch (e) {
    if ((e.code = "ERR_SERVER_NOT_RUNNING")) {
      console.log("Alert !!!! - Web Server already stopped.");
    } else {
      console.log("Encountered an error", e);
      err = err || e;
    }
  }

  // *** Stop running DB modules exiting the process ***

  try {
    console.log("Closing database module");
    await database.close();
  } catch (err) {
    console.log("Encountered an error", e);
    err = err || e;
  }

  console.log("Exiting process");

  if (err) {
    process.exit(1); // Non-zero failure code
  } else {
    console.log(
      "NodeJs programme - " +
        path.basename(__filename) +
        " stopped successfully"
    );
    process.exit(0);
  }
}

// The events like SIGTERM,SIGINT etc are triggered when someone killed processes manually lke Cntrl+c

process.on("SIGTERM", () => {
  console.log("Received SIGTERM");

  shutdown();
});

process.on("SIGINT", () => {
  console.log("Received SIGINT");

  shutdown();
});

process.on("uncaughtException", (err) => {
  console.log("Uncaught exception");
  console.error(err);

  shutdown(err);
});
