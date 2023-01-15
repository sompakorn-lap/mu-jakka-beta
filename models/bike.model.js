const mongoose = require('mongoose')
const { Schema } = mongoose

const BikeSchema = new Schema({
  bike_id: String,
  status: String
})

const Bike = mongoose.model('Bike', BikeSchema)

module.exports = Bike