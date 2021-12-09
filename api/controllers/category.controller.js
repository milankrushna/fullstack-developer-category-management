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

    var { name, parent_id } = req.body
    parent_id = parent_id ? parent_id : 0
    try {
        //checking the same  CategoryName is available or not 
        var category = await QueryHelper.findOne('category', { name, parent_id })

        //checking the patent id is available or not
        let isParentExit = true
        if (parent_id != 0) {
            var parent_idcheck = await QueryHelper.findOne('category', { id: parent_id })
            isParentExit = parent_idcheck.status == 1 ? true : false
        }

        if (category.status == 0 && isParentExit) {
            //inserting data into database
            var createCategory = await QueryHelper.save("category", { name, parent_id })
            res.json({ status: 1, message: "category created", data: { insertId: createCategory.data.insertId } })
        } else {
            throw { message: isParentExit === false ? 'Parent Id data not available!!!' : "Duplicate entry denied!!!" }
        }

    } catch (error) {
        res.status(400).json({
            status: 0,
            message: error.message,
            data: ""
        })
    }

}

/**
 * @path : /api/v1/category/
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

    console.log("Update-category=>", req.body);
    var { name, id } = req.body
    try {
        //checking duplicate category
        var category = await QueryHelper.findOne('category', { name })

        if (category.status == 0) {
            var createCategory = await QueryHelper.update("category", { name }, { id })

            res.json({ status: 1, message: "category Updated successfully!!!" })

        } else {
            throw { message: "Duplicate entry denied!!!" }
        }

    } catch (error) {
        res.status(400).json({
            status: 0,
            message: error.message,
            data: ""
        })
    }

}


/**
 * @path : /api/v1/:category_id
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
    var { category_id } = req.params

    try {

        var delete_category = QueryHelper.delete('category', { id: category_id })
        // deleteding parent category
        var parent_delete_category = QueryHelper.delete('category', { parent_id: category_id })
        res.json({ status: 1, message: "category Deleted successfully!!!" })
    } catch (error) {
        res.status(400).json({
            status: 0,
            message: error.message,
            data: ""
        })
    }
}


/**
 * 
 * @param {} req 
 * @param {
 * status : int
 * message : string
 * data : object
 * } res 
 */
exports.getCategory = async (req, res) => {

    console.log("Category List!!!");
    try {

        var categoryList = await QueryHelper.find('category', '')
        // console.log(categoryList);
        res.json({ status: 1, message: "category List!", data: categoryService.treeCategory(categoryList.data) })
    } catch (error) {
        res.status(400).json({
            status: 0,
            message: error.message,
            data: ""
        })
    }
}



