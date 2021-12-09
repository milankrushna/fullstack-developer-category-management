const { newCategory, updateCategory, fetchCategory, deleteCategory } = require("./../service/category.service")


/**
 * new Category Test Cases
 */

    test('Create A new Category', async() => {
        return newCategory({
            "name": "A Category Name",
            "parent_id": 0
        }).then(resp => {
            expect(resp.status).toBe(1);
            expect(resp.message).toBe('category created');
            expect(resp.data.insertId).toBeGreaterThan(0)
        }).catch(error => {
            expect(error.status).toBe(0);
            expect(error.message).toBe('Duplicate entry denied!!!');
        });
    });

/**
 * Update Category Test
 */
    test('update A Category', async() => {
        return updateCategory({
            "name": "Update Category",
            "id": 1
        }).then(resp => {
            expect(resp.status).toBe(1);
            expect(resp.message).toBe('category Updated successfully!!!');
        }).catch(error => {
            expect(error.status).toBe(0);
            expect(error.message).toBe('This Category Not available to Update!!!');
        });
    });

/**
 * Delete Category Test
 */
    test('Delete A  Category', async() => {
        return deleteCategory({
            "category_id": 1
        }).then(resp => {
            expect(resp.status).toBe(1);
            expect(resp.message).toBe('category Deleted successfully!!!');
        }).catch(error => {
            expect(error.status).toBe(0);
        });
    });

/**
 * Fetch Category Test
 */

 test('Get All Category', async() => {
    return fetchCategory().then(resp => {
        expect(resp.status).toBe(1);
        expect(resp.message).toBe('category List!');
        expect(resp.data.length).toBeGreaterThanOrEqual(0);
    }).catch(error => {
        console.log('----->',error.status);
        expect(error.status).toEqual(0);
    });
});