const mysql = require('mysql2/promise');
const { dbconfig } = require('./../cred/env');
// console.log(dbconfig);
// Create the connection pool. The pool-specific settings are the defaults
const DBClient = mysql.createPool({
  host: dbconfig.host,
  user: dbconfig.userName,
  database: dbconfig.database,
  password: dbconfig.password,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 10,
  port: dbconfig.port
}).on('connection', (connection) => {

  if (connection.error) {
    console.log("dbCOnnectError");
  } else {
    console.log("dbCOnnect")
  }
  // console.log("dbCOnnect",connection.error);
})

module.exports = DBClient