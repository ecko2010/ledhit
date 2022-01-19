module.exports.keyboard = function(data) {
    var back = (data.record.params.path.length <= 2) ? data.record.params.path[0] : data.record.params.path.slice(0, data.record.params.path.length - Object.keys(data.record.params.param).length).join('/')
    
    var keyboard = []
    
    keyboard.push([{ text: data.language.back, callback_data: back + '/back' }]);

    var menu = {
        "reply_markup": {
            "inline_keyboard": keyboard
        }
    }
    return menu
}