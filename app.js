const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const team = []

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function createManager() {
    inquirer.prompt([
        {
            name : 'name',
            type : 'input',
            message : 'What is the name of manager?'
        },

        {
            name : 'id',
            type : 'input',
            message : 'What is the id of manager?'
        },

        {
            name : 'email',
            type : 'input',
            message : 'What is the email of manager?'
        },

        {
            name : 'officeNumber',
            type : 'input',
            message : 'What is the office number of manager?'
        },
    ]).then(answers => {
        const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
        team.push(manager)
        
        createTeam();
    });
}
// createManager()

function createIntern(){
    inquirer.prompt([
        {
            name : 'name',
            type : 'input',
            message : 'What is the name of intern?'
        },

        {
            name : 'id',
            type : 'input',
            message : 'What is the id of intern?'
        },

        {
            name : 'email',
            type : 'input',
            message : 'What is the email of intern?'
        },

        {
            name : 'school',
            type : 'input',
            message : 'What is the school intern attended?'
        },

    ]).then(answers => {
        const intern = new Intern (answers.name, answers.id, answers.email, answers.school)
        team.push(intern)

        createTeam();
  
});
}
function createEngineer(){
    inquirer.prompt([
        {
            name : 'name',
            type : 'input',
            message : 'What is the name of engineer?'
        },

        {
            name : 'id',
            type : 'input',
            message : 'What is the id of engineer?'
        },

        {
            name : 'email',
            type : 'input',
            message : 'What is the email of engineer?'
        },

        {
            name : 'github',
            type : 'input',
            message : 'What is the github account of engineer?'
        },
       
    ]).then(answers => {
        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github)
        team.push(engineer)

        createTeam();

});

}

function buildTeam() {
    const newPage = render(team);
    fs.writeFile(outputPath, newPage, function(err){
        if (err) {
            console.log(err);
        }
    });
}

function createTeam() {
    inquirer.prompt([
        {
            type : 'list',
            name : 'employeeChoice',
            message : 'Which type of employee would you like to add',
            choices : ['Manager','Engineer', 'Intern', 'No more member to add']
        }
    ]).then(answer => {
        switch(answer.employeeChoice){
            case 'Manager':
                createManager()
                break;

            case 'Engineer':
                createEngineer()
                break;

            case 'Intern':
                createIntern()
                break;

            default:
                buildTeam()
        }
    });
};

createTeam();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ``
