console.log("Task started")
const elementCount = 2_000_000_000;
const arrayBuffer = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * elementCount);
const arr = new Int32Array(arrayBuffer);

//split the task to multiple unit(chunks);
const chunkSize = 4; //No of core(cpu) os.cpus().length
const numberofElementsPerChunk = elementCount / chunkSize;
const chunks = [];

console.time("tasks")
for (let i = 0; i < chunkSize; i++) {

    const start = chunks.length * numberofElementsPerChunk;
    const end = start + numberofElementsPerChunk;
    chunks.push({ index: i, start, end });
}
console.log(chunks);

function processChunk() {

    if (chunks.length !== 0) {
        const chunk = chunks.pop();
        for (let i = chunk.start; i < chunk.end; i++) {
            arr[i] = i
        }
        //processChunk()
        setImmediate(processChunk);
    }
    else{
        console.timeEnd("tasks");
        console.log("Completed");
        console.log(arr);
    }
}

//processChunk()
setImmediate(processChunk);


for (let i = 0; i < 3; i++) {
    setTimeout(() => {console.log("Timeout ", i)}, i * 1000);
}