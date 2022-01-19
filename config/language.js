var list = [
	'ru', 
	'en'
]

var Default = 'en'

var lang = function(language) {
	if (!list.includes(language)) 
		language = Default
		
	return require('./../language/' + language)
}

module.exports.list = list
module.exports.Default = Default
module.exports.lang = lang