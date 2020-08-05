const { Worker } = require('worker_threads');

console.log("App started");

console.log("Main execution");
const worker = new Worker(__dirname + "/worker.js", { workerData: { num: 100 } });
console.log("Main execution  contines");
worker.on("message", (result) => {
    console.log("result from worker: ", result);
});

console.log("App over");

