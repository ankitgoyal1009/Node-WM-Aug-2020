const fs = require('fs');
const express = require('express');
//Create the Server
const app = express();



app.get("/", (req, resp) => {

    resp.writeHead(200, { "Content-Type": "text/html" });
    resp.write("<html><h2>Welcome to the REST Server</h2></html");
    resp.end();
});
app.get("/about", (req, resp) => {

    setTimeout(() => {

        resp.writeHead(200, { "Content-Type": "text/html" });
        resp.write("<html><h2>REST API for Training invoked async</h2></html");
        resp.end();

    }, 2000);
});
app.get("/fetchMedia", (req, resp) => {

    const readStream = fs.createReadStream("D:\\temp\\video1.mp4");
    resp.writeHead(200, { "Content-Type": "video/mp4" });
    readStream.pipe(resp);
})




//Listen/ Start the server
const PORT = 9010;
app.listen(PORT, () => {
    console.log(`REST API started at port: ${PORT}`)
})