
const chalk = require('chalk')
const yargs = require('yargs')
const tasks = require("./async-task");

console.log(chalk.blue("TODO Application"));

//node app.js add --taskName CallOffice --description "Call Boss"
//node app.js list
//node app.js delete --taskName CallOffice

yargs
    .command("add", "To add a task", (yargs) => {
        yargs
            .option("taskName", {alias: "t", demand: true})
            .option("desc", {alias: "d", demand: true})
    }, (args) => {
        console.log(chalk.blackBright("Add a task"));
        const taskName = args.taskName;
        const desc = args.desc;
        tasks.saveTask(taskName, desc, () => {
            console.log(chalk.blue.inverse("Saved"))
        }, (err) => {
            console.log(chalk.red.inverse("Error in save", err));
        });
    })
    .command("list", "To List all tasks", (yargs) => {}, async (args) => {

        console.log(chalk.blackBright("List all tasks"));
        // var promise = tasks.fetchAllTasks();
        // promise.then((data) => {
        //     console.log("List", data);
        // }, (err) => {
        //     console.log("error")
        // })

        try {
            
            const results = await tasks.fetchAllTasks();
            for (const result of results) {
                console.log(chalk.green(`TaskName: ${result.taskName}, Desc: ${result.desc}`));
            }
        } catch (error) {
            console.log("List task error")
        }
    })
    .command("delete", "To delete a task", (yargs) => {

        yargs
            .option("taskName", {alias: "t", demand: true});

    }, (args) => {


    })
    .argv;