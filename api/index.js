const router = require('express').Router()

const Bike = require('../models/bike.model')
const Transaction = require('../models/Transaction.model')

router.get('/available', async (req, res) => {
    try {
        const bike = await Bike.find({'status' : 'available' })
        if (!bike) {
            return res.status(404).send('bike not found')
        }
        res.json(bike)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/exceed', async (req, res) => {
    try {
        const date = new Date()
        date.setUTCHours(0, 0, 0, 0)
    
        const transaction = await Transaction.find()
        const result = transaction.filter(item => {
            item.date.setUTCHours(0, 0, 0, 0)
            return item.date < date
        })
        res.send(result)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/lend/:student_id/:bike_id', async (req, res) => {
    const { student_id, bike_id } = req.params

    try {
        const bike = await Bike.findOne({'bike_id' : bike_id })
        const transaction = await Transaction.find({'student_id' : student_id })
        const date = new Date()

        if(transaction.length === 0){
            if(bike.status === 'available'){
                const newTransaction = new Transaction({ 'student_id' : student_id, 'bike_id' : bike_id, 'date' : date })
                await newTransaction.save()

                await Bike.findOneAndUpdate({'bike_id' : bike_id }, { 'status' : 'using' })
                
                res.json('successful')
            }
            else {
                return res.json(`${bike_id} is ${bike.status}.`)
            }
        }
        else {
            return res.json(`${student_id} does not have permission.`)
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete('/return/:bike_id', async (req, res) => {
    const { bike_id } = req.params

    try {
        await Transaction.findOneAndDelete({'bike_id' : bike_id })
        await Bike.findOneAndUpdate({'bike_id' : bike_id }, { 'status' : 'available' })
        res.json('successful')
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router