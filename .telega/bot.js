const config = require('./../config/config')
const express = require('express')
const telegram = require('node-telegram-bot-api')
const router = express.Router()
const bot = new telegram(config.token)

bot.setWebHook(`${config.url}/bot/${config.secret}`)
router.post(`/${config.secret}`, (req, res) => {
    bot.processUpdate(req.body)
    res.sendStatus(200);
})

bot.onText(/\/start/, function(msg) {
	var Default = require('./../commands/default')
	var page = new Default(msg).run()
	bot.sendMessage(page.account.chat.id, page.message, page.menu)			
})

bot.on('message', (msg) => {
	var Default = require('./../commands/default')
	var page = new Default(msg).run()
	bot.sendMessage(page.account.chat.id, page.message, page.menu)	
})

bot.on('callback_query', (msg) => {
	var Default = require('./../commands/default')
	var page = new Default(msg).run()
	bot.sendMessage(page.account.chat.id, page.message, page.menu)	
})




module.exports = router