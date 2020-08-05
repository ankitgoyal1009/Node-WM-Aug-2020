const fork = require('child_process').fork;

//const {fork} = require('child_process');
// const childProcess = require('child_process');
// console.log(childProcess);


console.log("Main Process: ", process.pid);

const cProcess =  fork("./compute-child.js");

cProcess.on("message", (result)=> {
    console.log("Result: ", result);
});

//cProcess.send("hello");
cProcess.send("start");
cProcess.send("exit");







console.log("End Main Process: ", process.pid);



