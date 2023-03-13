const express = require('express')
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
app.use(cors({ credentials: true }))
app.use(cookieParser())

mongoose.connect('mongodb+srv://MU-jakka-admin:jtuSG4QLqQmcqkzb@beta.vqpizbo.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})

app.use('/api', require('./api/index'))
app.use(express.static(path.join(__dirname, './dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist', 'index.html'))
})

app.listen(3000, () => { console.log('running port 3000') })