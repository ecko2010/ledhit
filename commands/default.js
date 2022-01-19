const Navigation = require('./../.telega/navigation')

class Command extends Navigation {
	constructor(msg) {
		super(msg)
		this.page = this.message(this.page())
	}
	
	run() {
		this.page['message'] = this.page.language.helloworld 

		return this.page
	}
}

module.exports = Command