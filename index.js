//Import libraries and packages
const inquirer = require('inquirer');
const fs = require('fs');
const { Triangle, Square, Circle } = require('./lib/shapes');

//inquirer prompt 
function promptUser() {
    inquirer.prompt([
        {
            type:'input',
            message:'What three letters do you want in your logo?',
            name: 'text'
        },
        {
            type: 'input',
            message: 'What should the color of the text be?',
            name: 'textColor',
        },
        {
            type: 'list',
            message: 'What shape should the logo be?',
            choices: ['Triangle', 'Square', 'Circle'],
            name: 'shape',
        },
        {
            type: 'input',
            message: 'What should the color of the background be?',
            name: 'shapeBackgroundColor',
        },
    ])
    .then((answers) => {
        //Check only three letters were entered for text variable
        if (answers.text.length > 3) {
            console.log("Only three letters can be displayed in the logo.");
            promptUser();
        } else {
            writeToFile('logo.svg', answers);
        }
    });
}

//Call function to start app
promptUser();