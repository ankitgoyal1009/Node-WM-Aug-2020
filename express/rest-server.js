const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
//Create the Server
const app = express();

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

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/", (req, resp, next) => {

    console.log(`Request ${req.url} handled by the process: ${process.pid}` );
    next();

});

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
            resp.status(201).end()
            //resp.json(product);
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
const PORT = 9010;
app.listen(PORT, () => {
    console.log(`REST API started at port: ${PORT} on process-id: ${process.pid}`)
})