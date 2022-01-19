const config = require('./config//config')

process.env.NTBA_FIX_319 = 1

const express = require('express')
const mongoose = require('mongoose')

const app = express();
const bot = require('./' + config.folderapp + '/bot')

mongoose.connect(config.mongodb)

mongoose.connection.on('connected', () => {
    console.log('🔗 Successful connection to the database');
})

mongoose.connection.on('error', () => {
    console.log('❌ Failed to connect to DB');
})

app.listen(config.port, () => {
    console.log(`🚀 Express server is listening on ${config.port}`);
})

app.use(express.json())

app.use('/bot', bot)
