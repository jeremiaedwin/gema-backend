'use_strict';

const firebase = require('../../db');
const Status = require('../models/Status');
const firestore = firebase.firestore();

const addStatus = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('status').doc().set(data);
        res.send('Record Saved Successfuly')
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllStatus = async(req, res) => {
    try {
        const statuses = await firestore.collection('status');
        const data = await statuses.get();
        const dataStatus = [];
        if (data.empty) {
            res.status(400).send('No Data');
        } else {
            data.forEach(doc => {
                const status = new Status(
                    doc.id,
                    doc.data().status_type,
                    doc.data().status_name
                );
                dataStatus.push(condition);
            });
            res.send(dataStatus);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getStatus = async(req, res) => {
    try {
        const id = req.params.id;
        const status = await firestore.collection('status').doc(id);
        const data = await status.get();
        if (!data.exists) {
            res.send('Data not found');
        } else {
            
            res.status(200).send(data.data());
        }
        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateStatus = async(req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const status = await firestore.collection('status').doc(id);
        await status.update(data);
        res.send("data updated")
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteStatus = async(req, res) => {
    try {
        const id = req.params.id;
        const status = await firestore.collection('status').doc(id).delete();
        res.send("data deleted")
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addStatus,
    getAllStatus,
    getStatus,
    updateStatus,
    deleteStatus
}