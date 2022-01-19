require('dotenv').config()

process.env.NTBA_FIX_319 = 1

module.exports.url = process.env.SERVER_URL || 'SERVER_URL'
module.exports.token = process.env.TOKEN || 'TOKEN'
module.exports.port = process.env.PORT || 'PORT'
module.exports.mongodb = process.env.MONGODB_URL || 'MONGODB_URL'
module.exports.secret = process.env.SECRET || 'SECRET'
module.exports.folderapp = process.env.FOLDER_APP || 'FOLDER_APP'