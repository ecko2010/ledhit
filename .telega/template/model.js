const inquirer = require('inquirer');
const fs = require('fs')

inquirer
    .prompt([{
        name: 'name',
        message: 'Enter model name'
    }, ])
    .then(answers => {
        var example = __dirname + '/bin/model_ex.js'
        var file = __dirname + '/../../models/' + answers.name + '.js'
        fs.copyFile(example, file, err => {
            if (err) {
                console.error(err)
                return
            }
            fs.readFile(file, 'utf8', function(err, data) {
                if (err) {
                    return console.log(err)
                }
                var result = data.replace(/Users/g, answers.name);

                fs.writeFile(file, result, 'utf8', function(err) {
                    if (err) return console.log(err)
                })
            })
        })

    })