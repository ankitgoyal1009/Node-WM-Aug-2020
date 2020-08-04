console.log("In math.js");

const version = "1.0.0.0";


function compute(x, y){
    return x * y;
}

//exports

//exports.version = version;
//exports.sum = compute;

module.exports = {
    version, 
    sum: compute
}