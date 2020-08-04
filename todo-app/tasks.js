
const fs = require('fs');

let allTasks =[];

readAllTasks();
function readAllTasks(){

    try {
        
        const data = fs.readFileSync("tasks.json");
        allTasks = JSON.parse(data);

    } catch {

        //allTasks = [];
    }
    

}

function saveTask(taskName, desc){

    const task = {
        taskName, desc
    };
    allTasks.push(task);
    fs.writeFileSync("tasks.json", JSON.stringify(allTasks));
}

function fetchAllTasks(){

}

function deleteTask(taskName){

}

module.exports = {
    saveTask,
    fetchAllTasks,
    deleteTask
}
