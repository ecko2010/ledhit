module.exports.keyboard = function(data) {
    var keyboard = data.language_list.map(
        x => [{ text: x, callback_data: 'language/lang:' + x + '/update'}]
    )
    
    keyboard.push([{ text: data.language.back, callback_data: 'language/back' }]);

    var language = {
        "reply_markup": {
            "inline_keyboard": keyboard
        }
    }
    return language
}