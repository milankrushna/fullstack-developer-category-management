const DBClient = require("./../cred/databse")

module.exports = class QueryHelper {

/**
 * execute the generated query
 * @param {*} query 
 * @param {*} runtype 
 * @returns 
 */
 static runQuery(query = '', runtype = 'execute') {

  // console.log("runQuery ==>", query);
  return new Promise((resolve, reject) => {
    try {

      DBClient[runtype](query)
        .then(result => {
          resolve({ status: 1, message: "Query run successfully", data: result[0] })
        })
        .catch(error => {
          console.log("runQuery -=>", error.message);
          reject({ status: 0, message: error.message }, null)

        });
    } catch (error2) {
      console.log("runQuery2 -=>", error2.message);
      reject({ status: 0, message: error2.message }, null)
    }
  })
}


/**
* query generator using incoming object
* @param {*} data 
* @param {*} delimeter 
* @returns 
*/
static generateQueryString(data, delimeter = ' AND ') {

  var condArray = []
  for (const key in data) {
    if (typeof data[key] == "string") {
      condArray.push(key + " = '" + data[key] + "'")

    } else {
      condArray.push(key + " = " + data[key])
    }
  }
  return delimeter ? condArray.join(delimeter) : condArray.join(" AND ")

}

/**
* 
* Fetch the multiple row 
* @param {*} table 
* @param {*} cond 
* @param {*} fields 
* @returns 
*/
static find(table = '', cond = {}, fields = []) {

  var selectedField = fields.length > 0 ? fields.join() : '*'
  var query = `SELECT ${selectedField} FROM ${table} `
  var condModel = ""

  if (cond) {
    condModel = " WHERE "
    condModel += this.generateQueryString(cond)
  }// condArray.join(" AND ")
  query += condModel
  console.log(query);

  return new Promise((resolve, reject) => {
    DBClient.query(query).then((result) => {

      if (result[0].length > 0) {
        resolve({ status: 1, data: result[0] })
      } else {
        resolve({ status: 0, message: `Record not found!`, data: [] })
      }

    }).catch(error => {
      console.log("find -=>", error);
      reject({ status: 0, message: error.message })
    })

  })

}


/**
 * will fetch only onc raw as per your condition
 * @param {*} table 
 * @param {*} cond 
 * @param {*} fields 
 * @returns 
 */

static findOne(table = '', cond = {}, fields = []) {

  var selectedField = fields.length > 0 ? fields.join() : '*'
  var query = `SELECT ${selectedField} FROM ${table} `
  var condModel = ""

  if (cond) {
    condModel = " WHERE "
    condModel += this.generateQueryString(cond)
  }// condArray.join(" AND ")
  query += condModel
  console.log(query);

  return new Promise((resolve, reject) => {
    DBClient.query(query).then((result) => {

      if (result[0].length > 0) {

        resolve({ status: 1, data: result[0][0] })

      } else {
        resolve({ status: 0, message: `Record not found!`, data: {} })
      }

    }).catch(error => {
      console.log("find -=>", error);
      reject({ status: 0, message: error.message })
    })

  })

}


/**
 * will fetch the data using raw select query
 * 
 * @param {
 * Raw SELECT Query
 * } query 
 * @returns 
 */
static fetchQuery(query = '') {
  return new Promise((resolve, reject) => {
    DBClient.execute(query)
      .then(result => {

        if (result[0].length > 0) {

          resolve({ status: 1, data: result[0] })

        } else {
          resolve({ status: 0, message: `Record not found!` })
        }

      })
      .catch(error => {
        console.log("fetchQuery -=>", error);
        reject({ status: 0, message: error.message })
      });
  })

}

  static insertQuery(table, data) { 
    var query = "INSERT INTO " + table + " ("
    var column = Object.keys(data).join()
    query += column + " ) VALUES ( "
    var valueArray = []
    for (const key in data) {
      console.log(typeof data[key], data[key]);
      if (typeof data[key] == "string") {
        valueArray.push("'" + data[key] + "'")
      } else {
        valueArray.push(data[key])
      }
    }
    query += valueArray.join() + " )"
    return query

  }

  static updateQuery(table, data, cond) {

    var query = "UPDATE " + table
    var dataModel = " SET "
    var dataArray = []
    for (const key in data) {
      if (typeof data[key] == "string") {
        dataArray.push(key + " = '" + data[key] + "'")

      } else {
        dataArray.push(key + " = " + data[key] + "")
      }
    }
    dataModel += dataArray.join()
    query += dataModel
    var condModel = " WHERE "
    var condArray = []
    for (const key in cond) {
      if (typeof cond[key] == "string") {
        condArray.push(key + " = '" + cond[key] + "'")

      } else {
        condArray.push(key + " = " + cond[key])
      }
    }
    condArray.join(" AND ")
    condModel += condArray.join(" AND ")
    query += condModel
    return query

    //SET update_time = '"+created_time+"',last_active_time = '"+created_time+"',last_transaction_type='fastag' WHERE id = "+cusData['id']+"";


  }
  static save(table, data) {

    return this.runQuery(this.insertQuery(table, data))
  }

  static update(table, data, cond) {

    return this.runQuery(this.updateQuery(table, data, cond))
  }

  static delete(table, cond) {

    var query = `DELETE FROM ${table} WHERE `
    query += this.generateQueryString(cond)
    return this.runQuery(query)
  }


}