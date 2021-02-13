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

app.get("/", (request, response) => {
    response.writeHead(200, {"Content-Type": "text/html" });
    response.write("<h1> Test deployment </h1");
    response.end();
})
// app.use(express.static("css"));
// There is no complex interaction as of now (not as webservice), so I don't decompose.
// app.get("/", (request, response) => { response.sendFile(path.join(__dirname + "/index.html")) });
// app.get("/menu", (request, response) => { response.sendFile(path.join(__dirname + "/menu.html")) });
// app.get("/order", (request, response) => { response.sendFile(path.join(__dirname + "/order.html")) });
// app.get("/cart", (request, response) => { response.sendFile(path.join(__dirname + "/cart.html")) });



app.listen(process.env.PORT || 5000, () => {
    console.log("Server up and running on port: " + (process.env.PORT || 5000));
});