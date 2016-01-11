var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/test');
}

module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('test', { 
			message: req.flash('message'),
			title: 'test' 
		});
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		// successRedirect: '/game',
		successRedirect: '/test/home',
		failureRedirect: '/test',
		failureFlash : true  
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register',{
			message: req.flash('message'),
			title: 'signup'
		});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		// successRedirect: '/game',
		successRedirect: '/test/home',
		failureRedirect: '/test/signup',
		failureFlash : true  
	}));

	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res){
		res.render('home', { user: req.user });
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
}