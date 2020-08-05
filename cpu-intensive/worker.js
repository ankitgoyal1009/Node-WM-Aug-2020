const {workerData, parentPort} = require('worker_threads');

 console.log("Worker execution: ", workerData.num);
 const result = workerData.num * 12;
 parentPort.postMessage(result);