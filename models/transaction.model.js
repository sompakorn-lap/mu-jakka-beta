const mongoose = require('mongoose')
const { Schema } = mongoose

const TransactionSchema = new Schema({
  student_id: String,
  student_name: String,
  student_tel: String,
  bike_id: String,
  date: Date
})

const Transaction = mongoose.model('Transaction', TransactionSchema)

module.exports = Transaction