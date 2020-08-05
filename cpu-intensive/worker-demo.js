const {Worker, isMainThread, workerData, parentPort} = require('worker_threads');

console.log("App started");

if(isMainThread){
    
    console.log("Main execution");
    const worker = new Worker(__filename, {workerData: {num: 100}});
    console.log("Main execution  contines");
    worker.on("message", (result) => {
        console.log("result from worker: ", result);
    });
}
else{

    console.log("Worker execution: ", workerData.num);
    const result = workerData.num * 12;
    parentPort.postMessage(result);

}

console.log("App over");

