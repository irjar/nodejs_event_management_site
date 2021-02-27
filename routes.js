//Load Express
var express = require("express");

//Store Router in the variable router
var router = express.Router();


// Use res.render to load the ejs view file

// Home page route
router.get('/', function(req, res) {
    res.render("index", {page: "Home", menuId: "index"});
});

// Buy Tickets page route
router.get("/tickets", function(req, res){
res.render("tickets", {page: "Buy Tickets", menuId: "tickets"})
});

// Bands page route
router.get("/bands", function(req, res){
res.render("bands", {page: "Bands", menuId: "bands"})
});

// Vendors page route
router.get("/vendors", function(req, res){
	res.render("vendors", {page: "Vendors", menuId: "vendors"})
});	

// Gallery page route
router.get("/gallery", function(req, res){
	res.render("gallery", {page: "Gallery", menuId: "gallery"})
});	

	// Shop page route
router.get("/shop", function(req, res){
	res.render("shop", {page: "Shop", menuId: "shop"})
});	

	// Connect page route
router.get("/connect", function(req, res){
	res.render("connect", {page: "Connect With Us", menuId: "connect"})
});	

// Register page route
router.get("/register", function(req, res){
	res.render("register", {page: "Register", menuId: "register"})
});	

// About page route
router.get("/about", function(req, res){
	res.render("about", {page: "About", menuId: "about"})
});	

	// Terms and Conditions page route
router.get("/terms", function(req, res){
	res.render("terms", {page: "Terms and Conditions", menuId: "terms"})
});	

// Privacy page route
router.get("/privacy", function(req, res){
	res.render("privacy", {page: "Privacy", menuId: "privacy"})
});	

// Newsletter page route
router.get("/newsletter", function(req, res){
	res.render("newsletter", {page: "Newsletter", menuId: "newsletter"})
});	

// Basket page route
router.get("/basket", function(req, res){
	res.render("basket", {page: "Shopping Basket", menuId: "basket"})
});	


// Basket page route
router.get("/cancel", function(req, res){
	res.render("cancel", {page: "Payment cancelled", menuId: "basket"})
});	

// Reports page route
router.get("/report", function(req, res){
	res.render("report", {page: "Reports", menuId: "report"})
});	

// export the router object
module.exports = router;


