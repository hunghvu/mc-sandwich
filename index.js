const express = require("express");
//Create a new instance of express
const app = express()

/*
 * This (3rd party) middleware function parses the HTTP Request Body into JSON. 
 * When the body exists but does not parse, an error is passed on to the next
 * function. 
 */
app.use(require("body-parser").json());

let path = require("path"); // To form an absolute path.

app.use(express.static("assets")); // Serve static 
app.use(express.static("js"));
app.use(express.static("css"));
// There is no complex interaction as of now (not as webservice), so I don't decompose.
app.get("/", (request, response) => {response.sendFile(path.join(__dirname + "/index.html"))});
app.get("/menu", (request, response) => {response.sendFile(path.join(__dirname + "/menu.html"))});
app.get("/order", (request, response) => {response.sendFile(path.join(__dirname + "/order.html"))});
app.get("/cart", (request, response) => {response.sendFile(path.join(__dirname + "/cart.html"))});



/* 
* Heroku will assign a port you can use via the 'PORT' environment variable
* To access an environment variable, use process.env.<ENV>
* If there isn't an environment variable, process.env.PORT will be null (or undefined)
* If a value is 'falsy', i.e. null or undefined, javascript will evaluate the rest of the 'or'
* In this case, we assign the port to be 5000 if the PORT variable isn't set
* You can consider 'let port = process.env.PORT || 5000' to be equivalent to:
* let port; = process.env.PORT;
* if(port == null) {port = 5000} 
*/ 
app.listen(process.env.PORT || 5000, () => {
    console.log("Server up and running on port: " + (process.env.PORT || 5000));
});