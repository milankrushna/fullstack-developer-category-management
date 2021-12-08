
const QueryHelper = require("./../helpers/query.helper")


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