
const QueryHelper = require("./../helpers/query.helper")

/**
 * New Category
 * @param {*} req 
 * @returns 
 */
exports.newCategory = (req) => {

    return new Promise(async (resolve, reject) => {

        var { name, parent_id } = req
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
                resolve({ status: 1, message: "category created", data: { insertId: createCategory.data.insertId } })
            } else {
                throw { message: isParentExit === false ? 'Parent Id data not available!!!' : "Duplicate entry denied!!!" }
            }

        } catch (error) {
            reject({
                status: 0,
                message: error.message,
                data: ""
            })
        }
    })
}

/**
 * Update Category
 * @param {*} req 
 * @returns 
 */

exports.updateCategory = (req) => {

    console.log("Update-category=>", req);
    return new Promise(async (resolve, reject) => {


        var { name, id } = req
        try {
            //checking duplicate category
            var category = await QueryHelper.findOne('category', { id })
            console.log(category);
            if (category.status == 1) {
                var createCategory = await QueryHelper.update("category", { name }, { id })

                resolve({ status: 1, message: "category Updated successfully!!!" })

            } else {
                throw { message: "This Category Not available to Update!!!" }
            }

        } catch (error) {
            reject({
                status: 0,
                message: error.message,
                data: ""
            })
        }
    })
}


/**
 * Delete Category
 * @param {*} req 
 * @returns 
 */
exports.deleteCategory = (req) => {

    return new Promise(async (resolve, reject) => {

        var { category_id } = req
        try {

            var delete_category = await QueryHelper.delete('category', { id: category_id })
            // deleteding parent category
            var parent_delete_category = await QueryHelper.delete('category', { parent_id: category_id })
            resolve({ status: 1, message: "category Deleted successfully!!!" })
        } catch (error) {
            reject({
                status: 0,
                message: error.message,
                data: ""
            })
        }
    })
}


/**
 * Fetch Category
 * @returns 
 */
exports.fetchCategory = () => {

    return new Promise(async (resolve, reject) => {

        console.log("Category List!!!");
        try {

            var categoryList = await QueryHelper.find('category', '')
            // console.log(categoryList);
            resolve({ status: 1, message: "category List!", data: this.treeCategory(categoryList.data) })
        } catch (error) {
            reject({
                status: 0,
                message: error.message,
                data: ""
            })
        }
    })
}

/**
 * generating tree view list with n number of level
 * @param {*} data 
 * @returns 
 */
exports.treeCategory = (data) => {

    var tree = []
    for (const it of data) {
        if (it.parent_id == 0) {
            it.child = []
            tree.push(fetchchild(it))
        }
    }

    function fetchchild(el, lvl) {
        // console.log('------>',el);
        function closerFn(el) {
            for (const it2 of data) {

                if (it2.parent_id == el.id) {
                    it2.child = []
                    el.child.push(it2)
                    closerFn(it2)
                }
            }
        }
        closerFn(el)
        return el
    }
    return tree

}