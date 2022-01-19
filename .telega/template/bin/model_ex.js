const mongoose = require('mongoose')

const Scheme = mongoose.Schema({
	user_id: {
		type: String,
		required: true
	},
	// Add new Object
})

const Model = module.exports = mongoose.model('Users', Scheme)

/* Example
module.exports.findOne = function(query, callback) {
	Model.findOne(query, callback)
}

module.exports.save = function(data, callback) {
	data.save(callback)
}

module.exports.find = function(query, callback) {
	Model.find(query, callback)
}

module.exports.findOneAndUpdate = function(data, callback) {
	Model.findOneAndUpdate(data.filter, data.update, {
  		new: true
	}, callback)
}

module.exports.deleteOne = function(data, callback) {
	Model.deleteOne(data.filter, callback)
}
*/
