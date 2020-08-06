const express = require('express');
const app = express();
var hbs  = require('express-handlebars');


app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');

app.get("/", (req, resp) => {
    resp.render("home", {
        message: "Hello HBS"
    });
})

app.get("/about", (req, resp) => {
    resp.render("about");
})


app.listen(9020, () => {
    console.log("Express App running at 9020");
})