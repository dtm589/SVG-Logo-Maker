//Import libraries and packages
const inquirer = require('inquirer');
const fs = require('fs');
const { Triangle, Square, Circle } = require('./lib/shapes');

//inquirer prompt 
function promptUser() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What three letters do you want in your logo?',
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

function writeToFile(fileName, answers) {
    let svgString = "";
    // Sets width and height of logo container
    svgString = '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
    // <g> tag wraps <text> tag so that user font input layers on top of polygon, not behind
    svgString += "<g>";
    // Takes user input for shape choice and inserts it into SVG file
    svgString += `${answers.shape}`;

    // Conditional check takes users input from choices array and then adds polygon properties and shape color to SVG string
    let shapeChoice;
    if (answers.shape === "Triangle") {
        shapeChoice = new Triangle();
        svgString += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeBackgroundColor}"/>`;
    } else if (answers.shape === "Square") {
        shapeChoice = new Square();
        svgString += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapeBackgroundColor}"/>`;
    } else {
        shapeChoice = new Circle();
        svgString += `<circle cx="150" cy="115" r="80" fill="${answers.shapeBackgroundColor}"/>`;
    }

    // <text> tag gives rise to text alignment, text-content/text-color taken in from user prompt and gives default font size of "40"
    svgString += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text>`;
    // Closing </g> tag
    svgString += "</g>";
    // Closing </svg> tag
    svgString += "</svg>";

    //write the file with the newly created svgString
    fs.writeFile(fileName, svgString, (err) => {
        err ? console.log(err) : console.log("Generated logo.svg");
    });
}

//Call function to start app
promptUser();