

const fs = require('fs');
const { resolve } = require('path');
const fileName = "tasks.json";

function saveTask(taskName, desc, successCb, errorCb){

    let allTasks = [];
    fs.readFile(fileName, (err, data) => {

        if(err){
            
        }
        else{
            allTasks = JSON.parse(data);
        }
        allTasks.push({taskName, desc});
        fs.writeFile(fileName, JSON.stringify(allTasks), (err) => {

            if(err){
                errorCb(err);
                return;
            }

            successCb();
        });
    });
    //return "";

}

function fetchAllTasks(){

    return new Promise( (resolve, reject) => {

        fs.readFile(fileName, (err, data)=> {
            if(err){
                reject(err);
            }
            else{
                resolve(JSON.parse(data));
            }
        });
    });
}

function deleteTask(taskName){
    
}

module.exports =  {
    saveTask, fetchAllTasks, deleteTask
};