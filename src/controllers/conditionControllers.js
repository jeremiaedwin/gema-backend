'use_strict';

const firebase = require('../../db');
const Condition = require('../models/Condition');
const firestore = firebase.firestore();

const addCondition = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('conditions').doc().set(data);
        res.send('Record Saved Successfuly')
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllCondition = async(req, res) => {
    try {
        const conditions = await firestore.collection('conditions');
        const data = await conditions.get();
        const dataCondition = [];
        if (data.empty) {
            res.status(400).send('No Data');
        } else {
            data.forEach(doc => {
                const condition = new Condition(
                    doc.id,
                    doc.data().condition_type,
                    doc.data().condition_name
                );
                dataCondition.push(condition);
            });
            res.send(dataCondition);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getCondition = async(req, res) => {
    try {
        const id = req.params.id;
        const condition = await firestore.collection('conditions').doc(id);
        const data = await condition.get();
        if (!data.exists) {
            res.send('Data not found');
        } else {
            
            res.status(200).send(data.data());
        }
        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateCondition = async(req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const condition = await firestore.collection('conditions').doc(id);
        await condition.update(data);
        res.send("data updated")
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteCondition = async(req, res) => {
    try {
        const id = req.params.id;
        const condition = await firestore.collection('conditions').doc(id).delete();
        res.send("data deleted")
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addCondition,
    getAllCondition,
    getCondition,
    updateCondition,
    deleteCondition
}