//generators
function *generate(){
    for (let i = 0; i < 10; i++) {
          yield i;
    }
    // yield 0;
    // console.log("resumed after 0");
    // yield 1;
    // console.log("resumed after 1");
    // yield 2;
}

                        //generate();  //---> 0
                        //generate();  //---> 1
                        //generate();  //---> 2

const it = generate();
// console.log(it.next());
// console.log(it.next());
// console.log(it.next())
// console.log(it.next())
for (const value of it) {
    console.log(value)
}