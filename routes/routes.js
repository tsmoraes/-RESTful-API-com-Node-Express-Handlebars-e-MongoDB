const express = require('express');
const { model } = require('mongoose');
const Model = require('../models/model');
const router = express.Router();

//Post Method
router.post('/post', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    })

    try {
        await data.save();
        res.redirect("/")
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Get all Method
router.get('/getAll', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update by ID Method

router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.redirect("/")
    }
    catch (error) {
        alert(error.message)
        res.status(500).json({ message: error.message })
    }
})

//Delete by ID Method
router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    Model.findByIdAndDelete(id).then(function () {
        res.redirect("/")
    }).catch(function (error) {
        res.status(400).json({ message: error.message })
    })
})

module.exports = router;