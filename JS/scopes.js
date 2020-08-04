
//var x, y;

console.log("x: ", x);
var x = 10; // Hoisting
console.log("x: ", x);

var y;
console.log("y: ", y);

//console.log("z: ", z);
//foo();
function foo(){

    //var msg;
    console.log("foo..");
    if(x < 100){
        let msg = "Hello"; // no hoisting, block scope
        console.log(msg);
    }
}
foo();

console.log("App over");

