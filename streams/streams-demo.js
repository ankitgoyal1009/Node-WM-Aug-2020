const fs = require('fs');
const { Readable } = require('stream'); 

console.log("Streams App");


// process.stdin.on("data", (data)=> {
//     console.log(data.toString());
// })

// process.stdin.on("data", (data)=> {
//     process.stdout.write(data);
// });

//Pipe
//process.stdin.pipe(process.stdout);

// Mode ==> Paused(default) and Flow
// Paused ==> readStream.read()
// Flow ==> event==> data==< calllback
//const readStream = fs.createReadStream("data.txt", {highWaterMark: 1200});
const readStream = fs.createReadStream("data.txt");
readStream.on("error", (error) => {
    console.log("-------------Error------------")
});

// Change to Flow  ==> resume() or register the data event
    // readStream.on("data", (chunk) => {
    //     console.log(chunk.toString());
    //     console.log("-------------chunk------------")
    // });

    // readStream.on("end", () => {
        
    //     console.log("-------------End of data------------")
    // });


//Paused Mode(default)  ==> pause()
    // readStream.on("readable", () => {

    //     let chunk = readStream.read();
    //     while(null !== chunk){
    //         console.log(chunk.toString());
    //         chunk = readStream.read();
    //     }
    // });


//Copy with a pipe
//readStream.pipe(fs.createWriteStream("copy.txt"));

function *generate(){
    for (let i = 0; i < 10; i++) {
          yield i;
    }
}

const rs = Readable.from(generate());
rs.on("data", (ch)=> {
    console.log(ch);
});



