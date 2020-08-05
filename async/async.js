//sync
function compute(num) {

    if (num > 10) {
        return num * num;
    }
    else {
        return -1;
    }

}

//const result = compute(5);
//console.log(result);


//async callbacks
function computeAsync(num, sucessCb, errorCb) {

    setImmediate(() => {

        if (num > 10) {
            sucessCb(num * num);
        }
        else {
            errorCb();
        }
    })
}
// computeAsync(5, (result) => {
//     console.log("Succes Async result", result);
// }, () => {
//     console.log("Async error");
// });

//async promises

function computeWithPromise(num) {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            if (num > 10) {
                resolve(num * num)
            }
            else {
                reject("Invalid number");
            }
        }, 2000)

    })
}

// const promise = computeWithPromise(5);
// promise.then((result) => {
//     console.log("success", result);
// }, (error) => {
//     console.log("error", error);
// });

//chaining
// computeWithPromise(15)
//     .then((result) => {
//         console.log("success", result);

//     }, (error) => {
//         console.log("error", error);
//     });


//ES 7 async-await => promise
// IIFE - Immediatly invoked function expression

// (async () => {

//     try {
//         var result = await computeWithPromise(15);
//         console.log("success", result);
//         var result1 = await computeWithPromise(result);
//         console.log("success", result1);

//     } catch (error) {
//         console.log("error", error)
//     }

// })();
// console.log("App over")



//events

const { EventEmitter } = require('events');

class ComputeEventEmitter extends EventEmitter {

    compute(num) {

        setTimeout(() => {

            if (num > 10) {
                this.emit("success", num * num)
            }
            else {
                this.emit("error", "invalid number")
            }
        }, 2000)
    }
};
const computeEmitter = new ComputeEventEmitter();


computeEmitter.on("success", (result) => {
    console.log("success event", result);
})
computeEmitter.on("error", (error) => {
    console.log("error event", error);
})
computeEmitter.compute(2);






