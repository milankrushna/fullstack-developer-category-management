var express = require('express');
var router = express.Router();
const { body, check, param } = require('express-validator');
const {processValidation,customValidation} = require("./../helpers/validation.helper")
const categoryController = require("./../controllers/category.controller")

/**
 * Category Route
 */
router.post('/',
[
    body('name')
    .notEmpty().withMessage("Category Name is required ")
    .isString().withMessage("Category should be a string"),
    body("parent_id").isNumeric().withMessage("CategoryId should be Numeric")  
],
processValidation,
categoryController.createCategory
);

router.put('/',
[
    body('id').notEmpty().withMessage("Category id is required ").isNumeric().withMessage("CategoryId should be Numeric"),
    body('name')
      .notEmpty().withMessage("Category Name is required ")
      .isString().withMessage("Category should be a string") 
],
processValidation,
categoryController.updateCategory
);

router.delete('/:category_id',
[
    param('category_id').notEmpty().withMessage("Category id is required "),
],
processValidation,
categoryController.deleteCategory
);

router.get('/',
categoryController.getCategory
);



module.exports = router;
