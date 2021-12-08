const activeENV = (process.env.NODE_ENV) ? process.env.NODE_ENV : 'development'
console.log("envRuning on", activeENV);
const environmentSetup = require(`./../environment/env.${activeENV}.js`)

// console.log(environmentSetup);

//DB config
exports.dbconfig = {
    host : environmentSetup.DBenvironment.DOC_HOST,
    database : environmentSetup.DBenvironment.DOC_DATABASE,
    userName : environmentSetup.DBenvironment.DOC_USERNAME, 
    password : environmentSetup.DBenvironment.DOC_PASSWORD,
    port : environmentSetup.DBenvironment.DOC_PORT
}

// server
exports.app_port = environmentSetup.serverPort
exports.base_url = environmentSetup.base_url