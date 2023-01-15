const router = require('express').Router()

const Bike = require('../models/bike.model')

router.post('/', async (req, res) => {
    try {
        const bike = new Bike(req.body)
        await bike.save()
        res.status(201).json(bike)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router