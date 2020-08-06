const fs = require('fs');
const bodyParser = require('body-parser');
var cors = require('cors');
const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = "This key is to be used for signing";
//Create the Server

const express = require('express');
const io = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const socketio = io(server);

const allSockets = [];
socketio.on("connection", (socket) => {

    console.log("The client connected");
    allSockets.push(socket);
    socket.send("hello");
})

const products = [];

const initData = () => {
    products.push({ id: 1, name: "Samsung Galaxy", price: 40000 });
    products.push({ id: 2, name: "IPad", price: 65000 });
    products.push({ id: 3, name: "iBall mouse", price: 1200 });
    products.push({ id: 4, name: "MS Surface", price: 70000 });

}
initData();

//middleware
//app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser());

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/", (req, resp, next) => {

    console.log(`Request ${req.url} handled by the process: ${process.pid}` );
    next();

});

app.use("/products", (req, resp, next) => {

    const authToken = req.header("authorization");
    console.log("authToken", authToken);
    if(authToken){
        
        const token = authToken.toString().split(" ")[1];
        jwt.verify(token, JWT_SECRET_KEY, (err, data) => {

            if(err){
                resp.status(403).end();
                return;
            }
            else{
                console.log("middleware: ", data);
                next();
            }

        } )

    }
    else{
        resp.status(401).end()
    }
    

   

})

app.post("/login", (req, resp) => {

    const user = req.body;
    if(user){

        if(user.username === "admin"){
            //retrun jwt token
            const token = jwt.sign(user, JWT_SECRET_KEY, {expiresIn: "5m"});
            resp.json({token});
        }
        else{
            resp.status(401).end();
        }

    }
    else{
        resp.status(401).end();
    }

})


app.get("/", (req, resp) => {

    // for (let i = 0; i < 1_000_000_000; i++) {   
    // }
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

app.get("/products", (req, resp) => {

    resp.json(products);
});

app.get("/products/:id", (req, resp) => {

    const productId = req.params.id;
    console.log(productId)
    if (productId) {

        const index = products.findIndex(item => item.id == productId);
        if (index != -1) {
            resp.json(products[index]);
        }
        else {
            resp.status(404).end();
        }
    }
})
app.post("/products", (req, resp) => {

    const product = req.body;
    console.log("product in post", product);
    if (product) {

        //Validation
        const index = products.findIndex(item => item.id === product.id);

        if (index === -1) {
            products.push(product);

            for (const socket of allSockets) {
                socket.emit("productAdded", product);
            }

            resp.status(201).end()
            
        }
        else{
            resp.status(400).end();
        }

    }
    else{
        resp.status(500).end();
    }
});

app.delete("/products/:id", (req, resp) => {

    const id = req.params.id;
    if(id){

        const index = products.findIndex(item => item.id == id);
        if(index !== -1){
            products.splice(index, 1);
            resp.status(200).end();
        }
        else{
            resp.status(404).end();
        }
    }
    else{
        resp.status(500).end()
    }

});


//Listen/ Start the server
const PORT = process.env.PORT || 9010;
server.listen(PORT, () => {
    console.log(`REST API started at port: ${PORT} on process-id: ${process.pid}`)
})