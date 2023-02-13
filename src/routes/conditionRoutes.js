const express = require('express');
const {addCondition, getAllCondition, getCondition, updateCondition, deleteCondition} = require('../controllers/conditionControllers');

const router = express.Router();

router.post('/condition', addCondition);
router.get('/condition', getAllCondition);
router.get('/condition/:id', getCondition);
router.put('/condition/:id', updateCondition);
router.delete('/condition/:id', deleteCondition);

module.exports = {
    routes: router
}
