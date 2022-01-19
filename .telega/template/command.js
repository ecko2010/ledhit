const inquirer = require('inquirer');
const fs = require('fs')

inquirer
    .prompt([{
        name: 'name',
        message: 'Enter command name'
    }, ])
    .then(answers => {
        var example = __dirname + '/bin/command_ex.js'
        var file = __dirname + '/../../commands/' + answers.name + '.js'
        fs.copyFile(example, file, err => {
            if (err) {
                console.error(err)
                return
            }
        })

    })