

//function(......){

    //function scope
    var x = 10;
    console.log("x: ", x);
    console.log("x using global: ", global.x)

    y = 30;
    console.log("y: ", y);
    console.log("y using global: ", global.y)


    global.z = 40;
    console.log("z: ", z);
    global.console.log("z using global: ", global.z)

    console.log(process.pid);

//}

