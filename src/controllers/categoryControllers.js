'use_strict';

const firebase = require('../../db');
const Category = require('../models/Category');
const firestore = firebase.firestore();

const addCategory = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('categories').doc().set(data);
        res.send('Record Saved Successfuly')
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllCategory = async(req, res) => {
    try {
        const categories = await firestore.collection('categories');
        const data = await categories.get();
        const dataCategory = [];
        if (data.empty) {
            res.status(400).send('No Data');
        } else {
            data.forEach(doc => {
                const category = new Category(
                    doc.id,
                    doc.data().category_name
                );
                dataCategory.push(category);
            });
            res.send(dataCategory);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getCategory = async(req, res) => {
    try {
        const id = req.params.id;
        const category = await firestore.collection('categories').doc(id);
        const data = await category.get();
        if (!data.exists) {
            res.send('Data not found');
        } else {
            
            res.status(200).send(data.data());
        }
        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateCategory = async(req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const category = await firestore.collection('categories').doc(id);
        await category.update(data);
        res.send("data updated")
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteCategory = async(req, res) => {
    try {
        const id = req.params.id;
        const category = await firestore.collection('categories').doc(id).delete();
        res.send("data deleted")
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addCategory,
    getAllCategory,
    getCategory,
    updateCategory,
    deleteCategory
}