const inquirer = require('inquirer');
const fs = require('fs')

inquirer
    .prompt([{
        name: 'name',
        message: 'Enter menu name'
    }, ])
    .then(answers => {
        var example = __dirname + '/bin/menu_ex.js'
        var file = __dirname + '/../../menu/' + answers.name + '.js'
        fs.copyFile(example, file, err => {
            if (err) {
                console.error(err)
                return
            }
        })

    })