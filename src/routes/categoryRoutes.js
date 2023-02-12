const express = require('express');
const {addCategory, getAllCategory, getCategory, updateCategory, deleteCategory} = require('../controllers/categoryControllers');

const router = express.Router();

router.post('/category', addCategory);
router.get('/category', getAllCategory);
router.get('/category/:id', getCategory);
router.put('/category/:id', updateCategory);
router.delete('/category/:id', deleteCategory);

module.exports = {
    routes: router
}
