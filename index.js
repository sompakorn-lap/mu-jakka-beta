const express = require('express')
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://MU-jakka-admin:jtuSG4QLqQmcqkzb@beta.vqpizbo.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection

db.once('open', function() {
  console.log("Connected to MongoDB!")
})

app.use('/api', require('./api/index'))
app.use(express.static(path.join(__dirname, './dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist', 'index.html'))
})

app.listen(3000)