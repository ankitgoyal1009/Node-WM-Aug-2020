const fs = require('fs');
const { Transform, pipeline } = require('stream'); 
const {createGzip} = require("zlib");

const transform = new Transform({
    transform(chuck, encoding, callback){
        console.log(encoding);
        const output = chuck.toString().toUpperCase();
        callback(null, output);
    }
});

//process.stdin.pipe(transform).pipe(process.stdout);

//fs.createReadStream("data.txt").pipe(createGzip()).pipe(fs.createWriteStream("data.gz"));

pipeline(
    fs.createReadStream("data.txt"),
    createGzip(),
    fs.createWriteStream("data1.gz"),
    (err) => {
        if (err) {
          console.error('Pipeline failed.', err);
        } else {
          console.log('Pipeline succeeded.');
        }
      }
)



