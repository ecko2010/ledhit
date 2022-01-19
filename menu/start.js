module.exports.keyboard = function(data) {
    //console.log(data)
    var keyboard = []
   
    keyboard.push([{ text: data.language.language, callback_data: 'language' }]);
    keyboard.push([{ text: data.language.get, callback_data: 'start/store' }]);

    var menu = {
        "reply_markup": {
            "inline_keyboard": keyboard
        }
    }
    return menu
} 