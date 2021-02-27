// Load Express
const express = require("express");

// Load Path
const path = require("path");

// Load routes from the routes file
var routes = require("./routes");

// Add express application to the variable app
var app = express();

// Set the variable PORT to tell the web server what port to listen on
app.set("port", process.env.PORT || 3000);
rrrg
// Use views located in views folder
app.set("views", path.join(__dirname, "views"));

// Serve static content such as images, CSS file and JavaScript file from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Set the view engine ejs
app.set("view engine", "ejs");

// Use the endpoints in the routes file
app.use(routes);

// Listen to the port 3000 for requests and a callback function
app.listen(app.get("port"), function(){
	console.log("Server started on port " + app.get("port"));
});



