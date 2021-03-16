const express = require("express");
//Create a new instance of express
const app = express();

/*
 * This (3rd party) middleware function parses the HTTP Request Body into JSON. 
 * When the body exists but does not parse, an error is passed on to the next
 * function. 
 */
app.use(require("body-parser").json());
/*
 * This (3rd party) middleware function parses the HTTP Request Body into JSON. 
 * When the body exists but does not parse, an error is passed on to the next
 * function. 
 */
app.use(require("body-parser").json());
/*
 * This middleware function parses any HTTP Request cookies into JSON
 */
app.use(require('cookie-parser')());


/*
 * This project includes a user made module called middleware. It includes helpful
 * middleware functions. 
 */
const middleware = require('./server/middleware');

/*
 * This middleware function will respond to improperly formed JSON in found in 
 * an HTTP Request BODY.
 */
app.use(middleware.jsonError);


// Backend
app.use('/auth', require('./server/routes/signin.js'));
app.use('/auth', require('./server/routes/register.js'));
app.use('/orders', middleware.checkTokenCookies, require('./server/routes/orders.js'));


app.use(express.static("web/assets")); // Serve static 
app.use(express.static("web/js"));
app.use(express.static("web/css"));
app.use(express.static("web/template"));


/**
 * Form an absolute path.
 */
const path = require("path"); 
app.get("/", (request, response) => { response.sendFile(path.join(__dirname + "/web/index.html")) });
app.get("/menu", (request, response) => { response.sendFile(path.join(__dirname + "/web/menu.html")) });
app.get("/order", (request, response) => { response.sendFile(path.join(__dirname + "/web/order.html")) });
app.get("/cart", (request, response) => { response.sendFile(path.join(__dirname + "/web/cart.html")) });
app.get("/profile", middleware.checkTokenCookies, (request, response) => {
    app.use(express.static("web_restricted/assets"));
    app.use(express.static("web_restricted/js"));
    response.sendFile(path.join(__dirname + "/web_restricted/profile.html"));
});
app.use("/api", express.static('apidoc'));

const favicon = require("serve-favicon")
app.use(favicon(path.join(__dirname, "web", "assets", "image" ,"navbar-icon.svg")));

app.listen(process.env.PORT || 5000, () => {
    console.log("Server up and running on port: " + (process.env.PORT || 5000));
});