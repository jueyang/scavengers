var express = require('express');
var ig = require('instagram-node').instagram();
var config = require('./config.json');
var token = require('./token.json');

var app = express();

// Instagram setup

ig.use({
	client_id: token.client_id,
	client_secret: token.client_secret
});

// app set up

app.use(express.static(__dirname + '/public'));
app.set('view engine','ejs');

// GET data when visiting url

app.get('/',function(req,res){

	var hdl = function(err, medias, pagination, remaining, limit) {

		// work through pagination weirdness

		// if (pagination.max_tag_id) {
			
		// }

		res.render('pages/index',{grams: medias});
	};

	// use designated instagram tag from config.js
	// and get access to result of said tag

	ig.tag_media_recent(config.tag, hdl);

});

app.listen(process.env.PORT || 8080);

exports.app = app;
