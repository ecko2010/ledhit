module.exports.keyboard = function(data) {

    var keyboard = []
   
    keyboard.push([{ text: lang.back, callback_data: 'settings/requisites/addcard/back' }]);

    var menu = {
        "reply_markup": {
            "inline_keyboard": keyboard
        }
    }
    return menu
} 