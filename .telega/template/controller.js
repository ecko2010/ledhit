const inquirer = require('inquirer');
const fs = require('fs')

inquirer
    .prompt([{
        name: 'name',
        message: 'Enter controller name'
    }, ])
    .then(answers => {
        var example = __dirname + '/bin/controller_ex.js'
        var file = __dirname + '/../../controllers/' + answers.name + '.js'
        fs.copyFile(example, file, err => {
            if (err) {
                console.error(err)
                return
            }
        })

    })