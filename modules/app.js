console.log("In App.js");
console.log("FileName: " + __filename);
console.log("DirName: " + __dirname);

const os = require('os');
console.log("cpu count: ", os.cpus().length);
console.log("freemem: ", os.freemem());
// console.log("cpu count: " + os.cpus().length + "  freemem: " + os.freemem());
// console.log(`cpu count: ${os.cpus().length} freemem: ${os.freemem()}`)


const chalk = require('chalk');
console.log(chalk.yellow("Hello Chalk.."));
console.log(chalk.yellow.inverse("Using a npm library"));

const math = require('./math');
console.log("math: ", math);
console.log("version: ", math.version);
console.log("sum: ", math.sum(2,3));

console.log("require math again");
const math1 = require('./math');
console.log("math1: ", math1);

const mylib = require('./my-lib');
console.log("mylib", mylib);

console.log(module);


console.log("App over");