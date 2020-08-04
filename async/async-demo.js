//function{
console.log("Async Demo..");

setTimeout(() => {
    console.log("Executed after 3 secs");
}, 3000);



// setImmediate(()=> {
//     console.log("Executed immediately");
// });
// setTimeout(() => {
//     console.log("Executed after 0 secs");
// }, 0);



console.log("Async Demo over");

//}

const fs = require('fs');

fs.readFile("test.json", (err, data) => {

    if(err){
        console.log("Some error");
        return;
    }

    console.log("read file Data: ", JSON.parse(data))

    setTimeout(() => {
        console.log("Executed after 0 secs");
    }, 0);
    setImmediate(()=> {
        console.log("Executed immediately");
    });
    process.nextTick(() => {
        console.log("Process NextTick");
    })
   

})