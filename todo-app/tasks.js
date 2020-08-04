
const fs = require('fs');

let allTasks =[];

readAllTasks();
//console.log(allTasks);
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

    return allTasks;

}

function deleteTask(taskName){

    const index = allTasks.findIndex(item => item.taskName === taskName);
    if(index === -1){
        console.log("No Task Found");
    }
    else{
        allTasks.splice(index, 2);
        fs.writeFileSync("tasks.json", JSON.stringify(allTasks));
    }
}

module.exports = {
    saveTask,
    fetchAllTasks,
    deleteTask
}
