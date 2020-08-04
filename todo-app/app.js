const chalk = require('chalk');
const yargs = require('yargs');
const tasks = require("./tasks");

console.log("The TODO App");

//node app.js add --taskName CallOffice --description "Call Boss"
//node app.js list
//node app.js delete --taskName CallOffice

const argv = process.argv;
//console.log(argv);
console.log(yargs.argv);

const command = process.argv[2];

if (command === "add") {
    console.log(chalk.blueBright.inverse("Adding a task"));
    const taskName = yargs.argv.taskName;
    const  desc = yargs.argv.description;
    tasks.saveTask(taskName, desc);
    console.log(chalk.blue(`Added task ${taskName}`))
}
if (command === "list") {
    console.log(chalk.greenBright.inverse("Listing all tasks"));

    const allTasks = tasks.fetchAllTasks();
    for (const task of allTasks) {
        console.log(chalk.green.inverse(`TaskName: ${task.taskName}, Desc: ${task.desc}`));
        console.log();
    }
}
if (command === "delete") {

    console.log(chalk.redBright.inverse("Delete a task"));
    const taskName = yargs.argv.taskName;
    tasks.deleteTask(taskName);
}


console.log("THE APP OVER...");