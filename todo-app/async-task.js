

const fs = require('fs');
const { resolve } = require('path');
const fileName = "tasks.json";

const { EventEmitter } = require('events');

function saveTask(taskName, desc, successCb, errorCb) {

    let allTasks = [];
    fs.readFile(fileName, (err, data) => {

        if (err) {

        }
        else {
            allTasks = JSON.parse(data);
        }
        allTasks.push({ taskName, desc });
        fs.writeFile(fileName, JSON.stringify(allTasks), (err) => {

            if (err) {
                errorCb(err);
                return;
            }

            successCb();
        });
    });
    //return "";

}

function fetchAllTasks() {

    return new Promise((resolve, reject) => {

        fs.readFile(fileName, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(JSON.parse(data));
            }
        });
    });
}

class TaskEventEmitter extends EventEmitter { }
const tasksEmitter = new TaskEventEmitter();

async function deleteTask(taskName) {

    try {

        const allTasks = await fetchAllTasks();
        const index = allTasks.findIndex(item => item.taskName === taskName);
        if (index === -1) {
            tasksEmitter.emit("error", "No Task Found");
        }
        else {
            allTasks.splice(index, 1);
            fs.writeFile("tasks.json", JSON.stringify(allTasks), (err) => {
                if(err){
                    tasksEmitter.emit("error", "Failed to save");
                    return;
                }
                tasksEmitter.emit("deleted", taskName);
            });
        }


    } catch (error) {
        tasksEmitter.emit("error", error)
    }
}

module.exports = {
    saveTask, fetchAllTasks, deleteTask,tasksEmitter
};