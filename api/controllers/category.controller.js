const QueryHelper = require("./../helpers/query.helper")
const categoryService = require("./../service/category.service")


/**
 * @path : /api/v1/category/
 * @method : POST
 * @body {
 *  name:string,
 *  parent_id:int
 * } req 
 * @param {
 *  status : int
 *  message : string
 * data : Object
 * } res 
 */
exports.createCategory = async (req, res) => {

    categoryService.newCategory(req.body).then(resp => {
        res.json(resp)
    }).catch(error => {
        res.status(400).json(error)
    })


}

/**
 * @path : /api/v1/category
 * @method : PUT
 * @body {
 *  name:string,
 *  id:int
 * } req 
 * @param {
 *  status : int
 *  message : string
 *  data : Object
 * } res 
 */

exports.updateCategory = async (req, res) => {

    categoryService.updateCategory(req.body).then(resp => {
        res.json(resp)
    }).catch(error => {
        res.status(400).json(error)
    })

}


/**
 * @path : /api/v1/category/:category_id
 * @method : DELETE
 * @params {
 *  category_id:int
 * } req 
 * @param {
 *  status : int
 *  message : string
 * data : Object
 * } res 
 */

exports.deleteCategory = async (req, res) => {

    categoryService.deleteCategory(req.params).then(resp => {
        res.json(resp)
    }).catch(error => {
        res.status(400).json(error)
    })

}


/**
 * @path : /api/v1/category
 * @method : GET
 * @param {} req 
 * @param {
 * status : int
 * message : string
 * data : object
 * } res 
 */
exports.getCategory = async (req, res) => {

    categoryService.fetchCategory(req).then(resp => {
        res.json(resp)
    }).catch(error => {
        res.status(400).json(error)
    })

}



