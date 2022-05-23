// module.exports = {
//   hrPool: {
//     user: process.env.HR_USER,
//     password: process.env.HR_PASSWORD,
//     connectString: process.env.HR_CONNECTIONSTRING,
//     poolMin: 10,
//     poolMax: 10,
//     poolIncrement: 0,
//   },
// };

// echo "export HR_USER=hr" >> ~/.bashrc
// echo "export HR_PASSWORD=oracle" >> ~/.bashrc
// echo "export HR_CONNECTIONSTRING=127.0.0.1/orcl" >> ~/.bashrc
// source ~/.bashrc

module.exports = {
  hrPool: {
    // user: "system",
    // password: "tnr311083",
    user: "sggr",
    password: "venki311083",
    connectString: "localhost:1521/xe",
    // user: "admin",
    // password: "tnrstore123",
    // connectString: "tnr-datastore-v1.cusb9jdjhyrr.us-east-1.rds.amazonaws.com:1521/TNRSTORE",
    poolMin: 20,
    poolMax: 20,
    poolIncrement: 0,
    queueMax:0
  },
};
