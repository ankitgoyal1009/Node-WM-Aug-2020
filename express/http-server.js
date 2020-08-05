const http = require('http');

//create the Http Server
const server = http.createServer();

//process the requests
server.on("request", (req, resp) => {

    resp.writeHead(200, {"Content-Type": "text/html"});
    resp.write("<html><h2>Welcome to the Node HTTP Server</h2></html");
    resp.end();
});


// start/listen for requests
server.listen(9000, () => {
    console.log("Http Server started");
})