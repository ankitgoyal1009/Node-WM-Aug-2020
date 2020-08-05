console.log("Compute Child Process: ", process.pid);


function compute(){
    for (var i = 0; i < 1000000; i++) {
    }
    return i;
}

process.on("message", (data) => {
    console.log("Message from Main Process", data);

    if(data === "start"){
        const result = compute();
        process.send({type: "start", result});
    }

    if(data === "exit"){
        process.exit();
    }
});



console.log("End Compute Child Process: ", process.pid);