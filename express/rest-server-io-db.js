const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

//MongoDB
const mongoURL = "mongodb://localhost:27017"
const databaseName = "nodedb";
const collectionName = "products";

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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", (req, resp, next) => {

    console.log(`Request ${req.url} handled by the process: ${process.pid}`);
    next();

});

app.get("/", (req, resp) => {

    for (let i = 0; i < 1_000_000_000; i++) {
    }
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

app.get("/products", async (req, resp) => {

    try {

        const client = await MongoClient.connect(mongoURL, { useUnifiedTopology: true });
        const productColl = await client.db(databaseName).collection(collectionName);
        const products = await productColl.find({}).toArray();
        resp.json(products);
        client.close();

    } catch (error) {
        console.log(error);
        resp.status(500).end();
    }

});

app.get("/products/:id", async(req, resp) => {

    const productId = req.params.id;
    console.log(productId)
    try {
        if (productId) {

            const client = await MongoClient.connect(mongoURL, { useUnifiedTopology: true });
            const productColl = await client.db(databaseName).collection(collectionName);
            const result = await productColl.findOne({id: parseInt(productId)});
            if(result !== null){
                resp.json(result);
            }
            else{
                resp.status(404).end();
            }
            
        }
    } catch (error) {
        
        console.log(error);
        resp.status(500).end();
    }
    
})
app.post("/products", async (req, resp) => {

    const product = req.body;
    console.log("product in post", product);
    try {
        if (product) {

            const client = await MongoClient.connect(mongoURL, { useUnifiedTopology: true });
            const productColl = await client.db(databaseName).collection(collectionName);
            const result = await productColl.insertOne(product);
            console.log(result.insertedCount);
            if(result.insertedCount === 1){
                resp.status(201).end()
                for (const socket of allSockets) {
                    socket.emit("productAdded", product);
                }
            }
            else{
                resp.status(400).end()
            }
        }
        else {
            resp.status(400).end();
        }

    } catch (error) {
        console.log(error);
        resp.status(500).end();
    }

});

app.delete("/products/:id", async (req, resp) => {

    const id = req.params.id;
    console.log("Id: ", id);
    try {
        if (id) {

            const client = await MongoClient.connect(mongoURL, { useUnifiedTopology: true });
            const productColl = await client.db(databaseName).collection(collectionName);
            const query = {id: parseInt(id)};
            const result = await productColl.deleteOne(query);
            console.log("Deleted Count: ", result.deletedCount);
            if(result.deletedCount === 1){
                resp.status(200).end();
                for (const socket of allSockets) {
                    socket.emit("productDeleted", product);
                }
            }
            else{
                resp.status(404).end()
            }
        }
        else {
            resp.status(400).end()
        }

    } catch (error) {
        console.log(error);
        resp.status(500).end()
    }
    

});

app.put("/products", async (req, resp) => {

    const product = req.body;
    try {
        if (product) {

            const client = await MongoClient.connect(mongoURL, { useUnifiedTopology: true });
            const productColl = await client.db(databaseName).collection(collectionName);
            const result = await productColl.updateOne({id: parseInt(product.id)}, {$set: product})
            console.log("ModifiedCount: ", result.modifiedCount);
            if(result.matchedCount == 0){
                resp.status(404).end();
                return;
            }
            if(result.modifiedCount === 1){
                resp.status(200).end()
                for (const socket of allSockets) {
                    socket.emit("productUpdated", product);
                }
                return;
            }
            else{
                resp.status(304).end()
                return;
            }
        }
        else {
            resp.status(400).end();
        }

    } catch (error) {
        console.log(error);
        resp.status(500).end();
    }


});


//Listen/ Start the server
const PORT = 9010;
server.listen(PORT, () => {
    console.log(`REST API started at port: ${PORT} on process-id: ${process.pid}`)
})