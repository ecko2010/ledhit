const colors = require('colors');

const commands = require('./../config/commands')
const actions = require('./../config/actions')
const language = require('./../config/language')

class Navigation {
    constructor(msg) {
        this.msg = msg
        this.account = new Object(undefined)

        this.data = new Object(undefined)

        this.commands = commands.list
        this.default_command = commands.Default
        this.actions = actions.list
        this.language_list = language.list

		this.path = undefined
    }

    user(account = false) {
        if (this.msg.chat != undefined) {
            this.account['chat'] = this.msg.chat
        }

        if (this.msg.message != undefined) {
            this.account['chat'] = this.msg.message.chat
        }
        if (account == false) {
            this.data['language'] = language.lang(this.msg.from.language_code)
            this.data['language_list'] = this.language_list
            this.account.chat['language'] = this.msg.from.language_code
        } else {
            //account model
        }


        this.data['account'] = this.account
    }

    page() {
        if (this.msg != undefined) {
            if (this.msg.entities !== undefined) {
                let path = (this.commands.includes(this.msg.text.substr(1))) ? this.msg.text.substr(1) : this.default_command
                this.path = path.split('/')
            }
            
            if (this.msg.text !== undefined) {
                
            }

            if (this.msg.data != undefined) {
                this.path = this.msg.data.split('/')
            }

            return this.path
        } else {
            return false
        }
    }

    message(path) {
        this.user()
        
        if (! Array.isArray(path) || path == undefined) return this.data
        
        var data, act

        function func(path) {
			if (path.length <= 1) return false
			
            let data = new Object(undefined)
            let arr = []
            for (var i = 0; i < path.length; i++) {
                let values = path[i].split(':')
                arr[i] = (values.length >= 2) ? values : false
            }
            arr = arr.filter(word => Array.isArray(word))

            let obj = Object.fromEntries(arr)

            data['params'] = {
                'path': path,
                'controller': path[0],
                'func': (path[1].split(':').length >= 2) ? 'default' : path[1],
                'act': path[path.length - 1],
                'param': obj
            }
			
            if (Object.keys(data.params.param)[0] + ':' + Object.values(data.params.param)[0] == data.params.controller) return false
            
            return data
        }

        function ucFirst(str) {
            if (!str) return str;

            return str[0].toUpperCase() + str.slice(1);
        }

        if (this.msg != undefined) {
            var menu = path[path.length - 1]

            if (this.actions.includes(menu)) {
                data = act = func(path)
                menu = path[0]
            }

            if (menu === 'pagination') {
                data = func(path)
                menu = path[path.length - 3]
            }

            if (menu === 'input') {
                data = act = func(path)
                menu = menu
            }

            if (menu === 'back') {
                menu = (path.length - 3 >= 0) ? path[path.length - 3] : this.default_command
            }
			
            if (data != false) {
                this.data['record'] = data
            } else {
                console.log('Actions need to be applied to something. Example: `settings/input`'.red)
            }            
			
            if (typeof act === 'object') {
                let controller = ucFirst(act.params.controller) + ucFirst(act.params.func)
                try {
                    let Controller = require('./../controllers/' + controller)
					this.data['record'] = new Controller()[act.params.act](this.data)
                } catch (err) {
					if (err.code == 'MODULE_NOT_FOUND') {
						console.log(`${controller} - An error occurred while loading the controller`.red)
						console.log('Enter `npm run controller`'.red)
					} else {
						console.log(err.red)
					}
                    
                }
            }

            if (menu != undefined && this.data.record != false) {
                try {
                    this.data['menu'] = require('./../menu/' + menu).keyboard(this.data)
                } catch (err) {
					if (err.code == 'MODULE_NOT_FOUND') {
						console.log(`${menu} - An error occurred while loading the keyboard`.red)
						console.log('Enter `npm run menu`'.red)
					} else {
						console.log(err.red)
					}
                }
            }
        }
        
        console.log(data)

        return this.data
    }
}

module.exports = Navigation