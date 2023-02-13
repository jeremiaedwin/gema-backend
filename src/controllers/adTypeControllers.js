'use_strict';

const firebase = require('../../db');
const AdType = require('../models/AdType');
const firestore = firebase.firestore();

const addAdType = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('ad_types').doc().set(data);
        res.send('Record Saved Successfuly')
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllAdType = async(req, res) => {
    try {
        const ad_types = await firestore.collection('ad_types');
        const data = await ad_types.get();
        const dataAdType = [];
        if (data.empty) {
            res.status(400).send('No Data');
        } else {
            data.forEach(doc => {
                const ad_type = new adType(
                    doc.id,
                    doc.data().ad_type_name
                );
                dataAdType.push(ad_type);
            });
            res.send(dataAdType);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAdType = async(req, res) => {
    try {
        const id = req.params.id;
        const adType = await firestore.collection('ad_types').doc(id);
        const data = await adType.get();
        if (!data.exists) {
            res.send('Data not found');
        } else {
            
            res.status(200).send(data.data());
        }
        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateAdType = async(req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const adType = await firestore.collection('ad_types').doc(id);
        await adType.update(data);
        res.send("data updated")
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteAdType= async(req, res) => {
    try {
        const id = req.params.id;
        const adType= await firestore.collection('ad_types').doc(id).delete();
        res.send("data deleted")
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addAdType,
    getAllAdType,
    getAdType,
    updateAdType,
    deleteAdType
}